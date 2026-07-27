import { Router } from 'express';
import { z } from 'zod';

const idSchema = z.string().uuid();
const projectSchema = z.object({
  name: z.string().trim().min(1).max(160),
  document: z.record(z.string(), z.unknown()),
  expectedVersion: z.number().int().nonnegative().optional(),
});
const layerSchema = z.object({
  name: z.string().trim().min(1).max(160),
  geojson: z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(z.unknown()).max(250000),
  }),
});

export function projectRoutes({ db, auth }) {
  const router = Router();
  router.use(auth.requireUser);

  router.get('/', async (req, res, next) => {
    try {
      const result = await db.query(
        `SELECT id,name,version,created_at,updated_at
         FROM project WHERE owner_id=$1 OR EXISTS (
           SELECT 1 FROM project_member WHERE project_id=project.id AND user_id=$1
         ) ORDER BY updated_at DESC`,
        [req.user.sub]
      );
      res.json({ projects: result.rows });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const id = idSchema.parse(req.params.id);
      const result = await db.query(
        `SELECT id,name,document,version,created_at,updated_at FROM project
         WHERE id=$1 AND (owner_id=$2 OR EXISTS (
           SELECT 1 FROM project_member WHERE project_id=$1 AND user_id=$2
         ))`,
        [id, req.user.sub]
      );
      if (!result.rows[0]) return res.status(404).json({ error: 'Project not found' });
      return res.json({ project: result.rows[0] });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const input = projectSchema.omit({ expectedVersion: true }).parse(req.body);
      const result = await db.query(
        'INSERT INTO project(owner_id,name,document) VALUES($1,$2,$3) RETURNING id,name,version,created_at,updated_at',
        [req.user.sub, input.name, input.document]
      );
      res.status(201).json({ project: result.rows[0] });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const id = idSchema.parse(req.params.id);
      const input = projectSchema.parse(req.body);
      const result = await db.query(
        `UPDATE project SET name=$1,document=$2,version=version+1,updated_at=now()
         WHERE id=$3 AND owner_id=$4 AND version=$5
         RETURNING id,name,version,updated_at`,
        [input.name, input.document, id, req.user.sub, input.expectedVersion ?? 0]
      );
      if (!result.rows[0])
        return res.status(409).json({ error: 'Project was changed or is not writable' });
      return res.json({ project: result.rows[0] });
    } catch (error) {
      return next(error);
    }
  });

  router.put('/:id/layers/:layerId', async (req, res, next) => {
    try {
      const projectId = idSchema.parse(req.params.id);
      const layerId = idSchema.parse(req.params.layerId);
      const input = layerSchema.parse(req.body);
      const result = await db.query(
        `WITH collected AS (
           SELECT ST_Collect(
             ST_SetSRID(ST_GeomFromGeoJSON(feature->'geometry'),4326)
           ) AS geometry
           FROM jsonb_array_elements(($4::jsonb)->'features') AS feature
           WHERE feature->'geometry' IS NOT NULL
         )
         INSERT INTO spatial_layer(id,project_id,name,features,geojson,updated_by)
         SELECT $1,$2,$3,collected.geometry,$4::jsonb,$5 FROM collected
         WHERE EXISTS(SELECT 1 FROM project WHERE id=$2 AND owner_id=$5)
         ON CONFLICT(id) DO UPDATE SET name=excluded.name,features=excluded.features,
           geojson=excluded.geojson,updated_by=excluded.updated_by,updated_at=now()
         RETURNING id,name,updated_at`,
        [layerId, projectId, input.name, JSON.stringify(input.geojson), req.user.sub]
      );
      if (!result.rows[0]) return res.status(403).json({ error: 'Project is not writable' });
      return res.json({ layer: result.rows[0] });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
