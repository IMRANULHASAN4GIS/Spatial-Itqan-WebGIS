CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS app_user (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'editor' CHECK (role IN ('viewer','editor','admin')),
  disabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS app_user_email_unique ON app_user(lower(email));

CREATE TABLE IF NOT EXISTS project (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES app_user(id),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 160),
  document jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS project_owner_updated_idx ON project(owner_id,updated_at DESC);

CREATE TABLE IF NOT EXISTS project_member (
  project_id uuid NOT NULL REFERENCES project(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  permission text NOT NULL CHECK (permission IN ('view','edit')),
  PRIMARY KEY(project_id,user_id)
);

CREATE TABLE IF NOT EXISTS spatial_layer (
  id uuid PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES project(id) ON DELETE CASCADE,
  name text NOT NULL,
  features geometry(Geometry,4326),
  geojson jsonb NOT NULL DEFAULT '{"type":"FeatureCollection","features":[]}'::jsonb,
  updated_by uuid NOT NULL REFERENCES app_user(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS spatial_layer_project_idx ON spatial_layer(project_id);
CREATE INDEX IF NOT EXISTS spatial_layer_features_gix ON spatial_layer USING gist(features);
