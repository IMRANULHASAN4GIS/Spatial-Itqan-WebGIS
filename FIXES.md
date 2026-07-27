# Spatial Itqan WebGIS fixes

## 1.1.0 map startup and precision navigation

- Removed the fixed Al Ain startup extent. First use now opens at a neutral world view.
- The latest center and zoom are saved automatically and restored after a normal reload.
- Device location remains private and opt-in through Locate Me.
- Factory reset clears the session and returns to the neutral world view.
- The map and bundled basemaps now allow digital overzoom to level 28 while preserving
  each tile provider's native maximum resolution.

## Release 1.1.0 — installation, header and complete documentation

- Kept the Install App control visible, readable and aligned across desktop,
  compact desktop, tablet and phone layouts.
- Added breakpoint-specific header compaction and a mobile floating install
  action so installation is never clipped outside the viewport.
- Added an application-wide version identifier and updated the PWA cache.
- Rebuilt the in-app manual as a responsive, searchable documentation center.
- Added curated workflow guidance plus an automatically generated reference for
  every button, selector, input and interface control present in the app.
- Added category navigation and a standalone downloadable HTML manual.
- Kept the documentation control available on small mobile interfaces.
- Changed Manual from an overlaid dialog to a dedicated documentation page with
  a Return to WebGIS action.
- Added an independently scrolling documentation sidebar with visible up/down
  controls.
- Added professional tool tables, operating procedures, prerequisites, worked
  examples, expected results and troubleshooting guidance.
- Added visible dynamic release metadata to the application and manual:
  developer name, copyright year, full current date, Version 1.1.0 and
  “All rights reserved.”
- Added Professional Navy, Survey White, Graphite GIS and Desert Survey while
  retaining the original Graphite, Arctic and Midnight themes.
- Standardized focus outlines, disabled controls, selection, snapping, warning,
  success and error visibility across all seven themes.
- Added theme persistence, project restoration compatibility and theme-matched
  basemap defaults.

## Mobile, device adaptation and installable PWA

- Added phone, tablet and desktop form-factor recognition.
- Added OS-family, touch, screen resolution, viewport and pixel-ratio detection.
- Added responsive safe-area-aware layouts for mobile top bars, GIS ribbons,
  maps, layer panels, attribute drawers and editing dialogs.
- Added mobile orientation and visual-viewport handling, including map resizing.
- Added a web app manifest, install button, Apple mobile metadata and standalone
  display support.
- Added a service worker that caches the local application shell and provides a
  controlled offline fallback.
- Added online/offline status feedback and platform-specific installation help.
- Added `MOBILE_PWA.md` with HTTPS, installation and offline limitations.

Resolved in this package:

- Corrected public OSRM routing profile handling. Walking and cycling now
  direct the user to OpenRouteService instead of sending an invalid demo
  request.
- Made GeoJSON and KML exports standards-compliant WGS84 outputs.
- Updated shapefile ZIP export to support both synchronous and Promise-based
  `shpwrite.zip()` builds and to include matching `.prj` files.
- Added complete ArcGIS REST feature pagination by object ID.
- Added ArcGIS service inspection so only cached MapServers use tile URLs;
  dynamic services prompt for a queryable layer ID.
- Reused one symbol color for ArcGIS geometry, legend, and layer metadata.
- Replaced the invalid empty tile URL used by the Blank QA basemap.
- Added CDN script timeouts with fallback-CDN handling.
- Released object URLs after generated-file downloads.
- Moved the main application logic from `index.html` into `app.js`.

Validation performed:

- `app.js` JavaScript compilation check.
- All remaining inline JavaScript compilation checks.
- Static regression checks for every repaired code pattern.

Interactive browser validation was completed with a real browser engine.
Routing and external ArcGIS/CDN functions still require normal network access
when the application is used.

## Unified professional feature editor

- Removed the standalone Mark Points interface.
- Removed the injected GIS Toolbox card.
- Replaced the standalone drawing controls with one ESRI-style Feature Editor.
- Added target-layer locking and explicit Start Editing, Save Edits, Stop
  Editing, and Discard Session Changes commands.
- Added a visible Create Features template gallery for Point, Line, Polygon,
  and Rectangle construction. Templates select a compatible layer or create one
  when none exists, while preserving the target layer's attribute schema.
- Added continuous construction as the default: users can create repeated
  points, lines, polygons, or rectangles until pressing Esc, without being
  interrupted by the attribute table. Attribute entry remains optional.
- Lines and polygons complete with the standard double-click action, then
  immediately return to construction when continuous creation is enabled.
- Added visible magnet snapping feedback for both vertices and edges. The map
  shows the snap target, source layer, and distance, applies the snapped
  coordinate to constructed geometry, and supports vertex-handle snapping.
- Added an editing arrow that activates with the edit session. Click selects a
  feature; double-click opens visible vertex handles and a Vertex Editor panel.
- Added persistent Point, Line, and Polygon template targets. New geometry keeps
  going to the same geometry-compatible target until the user creates or selects
  another layer for that geometry type.
- Added a visible New Feature Layer designer. Users enter the layer name,
  choose Point, Line, or Polygon geometry, and add any number of fields using
  Text, Integer, Double, Date, or Boolean data types. Fields initialize blank
  and remain typed in saved projects.
- Added “Add Fields to Target” using the same visible typed-field designer, so
  existing layers can receive new fields without hidden text prompts.
- Added a visible Output & Package section in the Feature Editor. The current
  target layer can be exported as Shapefile ZIP (including PRJ), KML, or
  standards-compliant WGS84 GeoJSON, using all or selected features.
- Added Project (.svproject) and Complete Project Package (.zip) commands. The
  ZIP contains the restorable project, every vector layer as GeoJSON, each
  layer's typed schema, a manifest, and a README.
- Expanded edit sessions to support switching among editable target layers,
  with multi-layer save and discard baselines.
- Added automatic vertex snapping for newly constructed features.
- Added selected-feature vertex and attribute editing.
- Added professional advanced editing commands: move by reference/destination,
  copy, paste, split at a clicked location, merge, rotate, scale, explode
  multipart, trace, snap, undo, redo, geometry calculation, and geometry QA.
- Added edit-session baselines, save/discard handling, selected-feature deletion,
  and geometry compatibility checks.
- Added creation of new empty point, line, or polygon feature layers.
- Consolidated the same editing commands into the top application ribbon.
- Positioned Editor and Advanced Editing first in the ribbon so Merge and other
  essential commands remain immediately visible.

## Editing and export reliability repair

- Bundled the working `@mapbox/shp-write` 0.4.3 browser build locally, with its
  license, so Shapefile export no longer depends on the unavailable CDN path.
- Verified a complete line-layer workflow produces a downloadable Shapefile ZIP.
- Reconnected Finish, Cancel, and Undo Vertex to the current construction
  handler, added clear error feedback, and prevented map events from swallowing
  toolbar clicks.
- Raised the floating construction bar above map controls and made unavailable
  actions visibly disabled.
- Enforced unique internal feature IDs and stopped selection-box drag handling
  from starting on a clicked feature. A single click now selects only the
  intended feature unless Shift/Ctrl selection is requested.
- Added Trim Overshoot and Extend Undershoot for selected LineString features.
  Both operations use the editor tolerance and other visible lines as targets.
- Added a Pan button, hold-C temporary pan during construction, and Full Extent
  with the Z shortcut.

Browser checks completed without page errors:

- Finish, Cancel, and Undo Vertex each invoked exactly once.
- Double-click completed a continuous line feature.
- Two-line selection test highlighted exactly one clicked feature.
- Trim Overshoot and Extend Undershoot completed against visible target lines.
- Shapefile export downloaded `Road_Centerline_Test_WGS_1984_UTM_Zone_40N.zip`.

## Robust AOI streaming imagery export

- Added two AOI sources: draw a new AOI rectangle or use exactly one selected
  polygon/multipolygon feature from any vector layer.
- Added user-defined output tile sizes of 1024, 2048, and 4096 pixels, with
  configurable edge overlap and a grid clipped to the AOI.
- Replaced the large-area in-memory mosaic workflow for tiled output with a
  sequential direct-to-folder exporter. Only one output tile is rendered and
  written at a time, so the full AOI is never kept as one browser canvas.
- Removed the former 900-source-tile restriction from the new tiled workflow.
  Provider availability, disk capacity, browser uptime, and service request
  policies remain the practical limits.
- Added a destination-folder picker and a standard export folder and tile naming
  convention containing AOI/job name, source, zoom, EPSG code, row, and column.
- Added GeoTIFF, PNG plus world/PRJ, and JPEG plus world/PRJ tile output.
- Added a live job panel with percent complete, completed/failed/total counts,
  elapsed time, estimated remaining time, current source-tile activity, and a
  timestamped scrolling log.
- Added retry handling, bounded source-request concurrency, checkpoint manifests
  every five output tiles, per-tile failure continuation, and safe cancellation.
- Cancellation or failure retains all completed tiles and writes a partial
  manifest, tile index, job JSON, README, and export log.

Browser validation completed without page errors:

- Drawn AOI PNG export: 1 of 1 tile, georeferencing sidecars and reports written.
- Selected polygon AOI: 4 of 4 same-size tiles and reports written.
- GeoTIFF AOI export: valid TIFF output and reports written.
- Cancellation: partial files and job reports retained as designed.

## Seamless projected raster-grid correction

- Corrected the tile-shift defect caused by drawing Web Mercator pixels and
  assigning them an axis-aligned UTM world file without actually reprojecting
  the raster.
- The exporter now calculates one snapped, north-up raster grid in the active
  output CRS before any tile is rendered.
- Every output tile inherits the same grid origin, square pixel size, row
  direction, and column direction.
- Added per-tile WebGL reprojection from the XYZ/Web Mercator source mosaic onto
  the shared output-CRS grid using a dense 16-pixel transformation mesh.
- PNG/JPEG world files and GeoTIFF ModelPixelScale/ModelTiepoint metadata are
  now calculated directly from the shared grid rather than independent
  geographic bounding boxes.
- Changed the default overlap to 0%. At 0%, adjacent output bounds meet with a
  coordinate gap of exactly zero. Nonzero overlap is retained only as an
  intentional duplicate buffer for blending or cutline workflows.
- The manifest, job JSON, README, and live log now record the common grid
  origin, pixel resolution, target CRS, and reprojection method.
- Added an explicit accuracy statement: the exporter removes its own grid and
  projection shift, while absolute ground accuracy remains dependent on the
  source imagery provider.

Validation results:

- EPSG:32640 test grid: horizontal and vertical adjacent-tile gaps were both
  exactly `0`.
- A 32-pixel overlap strip rendered independently in two neighboring UTM tiles
  matched exactly across all `32,768` compared color channels.
- World-file test: adjacent origins advanced by exactly one tile width, with
  identical northing, pixel size, and zero rotation after raster reprojection.
- GeoTIFF test: adjacent files contained identical pixel-scale tags and
  tiepoints separated by exactly one tile width.
- Real satellite test in EPSG:32640 rendered two adjacent tiles without the
  former stepped displacement and produced no page errors.

## ESRI-style construction cursor and Symbol Selector

- Removed the Leaflet blue map-pin preview from point feature construction.
  Point digitizing now uses a small precision crosshair and center-square cursor
  without the “place marker” pin or tooltip.
- Added a dedicated Symbol Selector dialog for point, line, and polygon feature
  layers with searchable symbol galleries and a current-symbol preview.
- Added point symbols including circle, square, diamond, triangle, cross, X,
  star, asterisk, check, flag, airport, hospital, information, question, and
  bolt.
- Added line styles including solid, dashed, dotted, dash-dot, long dash,
  proposed road, railroad, administrative boundary, and contour.
- Added polygon styles including solid, hollow, diagonal hatch, crosshatch,
  stipple, horizontal/vertical hatch, water, and wetlands patterns.
- Added color, outline color, size/width, angle, and opacity controls, plus
  Reset and Save As/My Styles.
- Added a Symbol Selector command to the Feature Editor.
- Double-clicking a vector layer’s symbol or name in the TOC now opens its
  Symbol Selector. Double-clicking its on-map legend entry does the same.
- Applied symbols are reflected in the map, TOC, categorized legend entries,
  and normal legend entries.
- Symbol properties are retained when duplicating layers, saving/restoring
  projects, building complete packages, and using edit-session undo/redo.
- Continuous feature creation remains uninterrupted; symbology is changed at
  the target-layer level whenever the user chooses.

## Professional Editing Suite (v9)

- Added one Professional Editing Suite covering Editing, Schema, QA, Labels,
  Project, Activity and Help.
- Snapping now supports endpoint, vertex, midpoint, edge and intersection
  targets, screen-pixel or map-meter tolerance, per-layer participation and
  visible snap feedback.
- Selection now supports configurable replace/add/toggle modes, per-layer
  selectability and adjustable path hit tolerance.
- Added coordinate, direction-distance, parallel, perpendicular, circular arc,
  circle, freehand and trace construction, plus reusable feature templates
  with default attributes.
- Added a coordinate-based vertex table, vertex insert/delete and
  replacement-shape construction.
- Added planarize, remove polygon overlaps, eliminate small interior gaps,
  safe geometry repair, trim overshoot and extend undershoot operations.
- Field schemas now support alias, type, length, precision, scale, nullable,
  unique, default and coded-domain rules, with validation before save/export.
- Extended QA uses a background worker and checks empty/null geometry,
  duplicates, multipart features, invalid rings/coordinates,
  self-intersections, spikes, slivers, overlaps and schema violations.
- Added custom SVG/PNG/JPEG/WebP point symbols, more catalog symbols and
  rule-based feature coloring.
- Added label expressions, placement, zoom ranges, rotation fields and
  collision avoidance.
- Added named versions, autosave checkpoints, direct project-folder saves
  where supported, recycle restoration and per-operation audit logging.
- Added shared progress, elapsed and remaining-time reporting for extended QA
  and streamed imagery export.
- Added configurable shortcuts, a guided editing tutorial, built-in
  diagnostics, high contrast, large vertex handles, focus trapping and
  touch-sized controls.

## ESRI-like interactive editing behavior (v10)

- Replaced prompt-only Move, Rotate and Scale operations with a shared,
  non-destructive edit controller and live cyan geometry preview.
- Move now supports reference-point/destination placement, press-drag
  placement, coordinate delta entry, snapping feedback, one-pixel arrow-key
  nudging, Shift+Arrow ten-pixel nudging, Enter/Finish and Esc/Cancel.
- Rotate and Scale now transform all selected features around one common
  anchor. The anchor can be placed on the map or entered in the active CRS.
- Split now previews the exact line cut point and the resulting parts before
  modifying the selected single-part line.
- Merge now requires an explicit target feature for retained attributes,
  dissolves polygon geometry where possible, merges connected linework, and
  reports the source-feature count.
- Paste no longer applies a hidden fixed offset. Copied geometry follows the
  pointer with a live preview and is created only after placement is finished.
- Trace now follows an existing visible line or polygon boundary between two
  user-defined points and reports the traced length.
- Reshape no longer replaces the complete feature without review. A sketch
  must cross the selected line or polygon boundary, the result is previewed,
  and polygon users can choose which side is retained.
- Active transform tools temporarily suspend feature selection so a geometry
  click cannot unexpectedly select other features. The previous selection
  mode is restored after Finish or Cancel.
- The existing `C` temporary-pan shortcut remains available during interactive
  edits, and map editing events pause while temporary pan is active.
- Every operation snapshots Undo state before mutation, marks the edit session
  dirty, rebuilds selection/symbology, and writes an audit entry.
