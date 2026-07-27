(function (global) {
  'use strict';

  var TOOL_AREAS = [
    {
      title: 'Header, installation and workspaces',
      tools: [
        [
          'Search',
          'Find a place, address or latitude/longitude pair and move the map.',
          'Search ?Al Ain Oasis? or enter 24.2075, 55.7447.',
        ],
        [
          'Workspace ? Full GIS',
          'Shows every ribbon group and is the recommended default for experienced users.',
          'Use Full GIS when editing and QA tools must remain immediately available.',
        ],
        [
          'Workspace ? Data / Edit / Analyze / Present',
          'Reduces visible commands to the selected task without deleting or disabling tools.',
          'Switch back to Full GIS whenever a command appears missing.',
        ],
        [
          'Theme',
          'Cycles all seven professional themes while preserving semantic colors, disabled-state readability and focus visibility.',
          'Professional Navy is the recommended default; use Survey White for daylight and Graphite GIS for imagery.',
        ],
        [
          'Professional Navy',
          'Recommended blue/teal operational theme for engineering, government and daily GIS work.',
          'Use for normal editing, QA and project management.',
        ],
        [
          'Survey White',
          'High-legibility light theme for daylight offices, documentation and map review.',
          'Use when a bright interface or light presentation environment is required.',
        ],
        [
          'Graphite GIS',
          'Neutral low-light theme optimized for satellite imagery, CAD and raster comparison.',
          'Yellow selections and cyan snapping remain visible over dark imagery.',
        ],
        [
          'Desert Survey',
          'Optional UAE-inspired sand, teal and sky-blue field theme.',
          'Use for branded field demonstrations without changing GIS semantics.',
        ],
        [
          'Graphite / Arctic / Midnight',
          'Original themes retained for compatibility with saved projects and user preference.',
          'Existing projects reopen with their saved legacy theme.',
        ],
        [
          'Tools',
          'Collapses or restores the complete ribbon.',
          'Hide the ribbon temporarily when inspecting a large map.',
        ],
        [
          'Focus',
          'Hides interface chrome for presentation.',
          'Press Esc or use Focus again to restore controls.',
        ],
        [
          'CRS',
          'Controls coordinate readout and supported export coordinate operations.',
          'Use Auto UTM for local metric work and WGS84 for global exchange.',
        ],
        [
          'Install App',
          'Installs the PWA when HTTPS or localhost requirements are met.',
          'On iOS use Safari Share ? Add to Home Screen.',
        ],
        [
          'Settings and Manual',
          'Opens interface settings or this dedicated documentation page.',
          'Use the manual search to find a command by label.',
        ],
      ],
    },
    {
      title: 'Data import and layer management',
      tools: [
        [
          'Add Layer',
          'Imports supported vector, table, CAD, raster and point-cloud content.',
          'Zip SHP, SHX, DBF and PRJ together before importing a Shapefile.',
        ],
        [
          'CSV / Excel import',
          'Detects or maps coordinate columns and source CRS.',
          'Map Easting to X and Northing to Y for UTM survey data.',
        ],
        [
          'GeoJSON / KML / KMZ / GPX',
          'Loads standard interchange and GPS formats.',
          'Confirm WGS84 coordinates before exchange.',
        ],
        [
          'Shapefile ZIP',
          'Reads zipped Shapefile components and projection information.',
          'Reject a package that lacks required SHP, SHX or DBF files.',
        ],
        [
          'DXF / CAD dialog',
          'Chooses entity classes, drawing layers and source CRS.',
          'Select only road and boundary layers to reduce clutter.',
        ],
        [
          'LAS',
          'Displays a browser-manageable point sample from LAS content.',
          'Pre-tile very large point clouds outside the browser.',
        ],
        [
          'Active layer',
          'Sets the target used by table, selection, editing and analysis commands.',
          'Choose Parcels before running Select by Attribute.',
        ],
        [
          'Layer visibility and order',
          'Controls map drawing and presentation priority.',
          'Place reference boundaries below inspection results.',
        ],
        [
          'Symbol Selector',
          'Configures point, line and polygon appearance.',
          'Use a red triangle for critical point assets.',
        ],
        [
          'Labels and legend',
          'Creates feature labels and map explanation.',
          'Set label zoom ranges to avoid overlapping text.',
        ],
      ],
    },
    {
      title: 'Navigation, identify and selection',
      tools: [
        [
          'Previous / Next extent',
          'Moves through map navigation history.',
          'Return to a parcel after inspecting a distant feature.',
        ],
        [
          'Full extent / Home',
          'Fits visible data or returns to the configured home view.',
          'Use Full extent after importing a new layer.',
        ],
        [
          'Locate',
          'Requests the device position when browser permission and HTTPS allow it.',
          'Use location during field inspection only after checking GPS accuracy.',
        ],
        [
          'North',
          'Shows or hides the north arrow.',
          'Enable it for presentation and exported layouts.',
        ],
        [
          'Route',
          'Calculates available road routes between origin and destination.',
          'Pick two map points and compare route distance and time.',
        ],
        [
          'Go to XY',
          'Moves to exact coordinates in the selected CRS.',
          'Enter Easting/Northing after selecting a projected CRS.',
        ],
        [
          'Identify',
          'Reports features at a clicked location and available address context.',
          'Identify overlapping utilities before editing.',
        ],
        [
          'Select',
          'Selects features spatially in participating layers.',
          'Drag a rectangle around inspection assets.',
        ],
        [
          'Switch / Selected / Clear',
          'Inverts, filters to, or clears the current selection.',
          'Switch selection to find all parcels outside an AOI.',
        ],
      ],
    },
    {
      title: 'Attribute table and field operations',
      tools: [
        [
          'Table',
          'Opens records for the active layer.',
          'Sort inspections by date and filter by status.',
        ],
        [
          'Filter rows',
          'Limits visible rows without necessarily changing the map selection.',
          'Search for Asset_ID VALVE-104.',
        ],
        [
          'Select by Attribute',
          'Builds field/operator/value queries.',
          'Select Status = Critical.',
        ],
        [
          'Field Calculator',
          'Calculates values with the restricted expression engine.',
          'ROUND(AREA, 2) calculates polygon area to two decimals.',
        ],
        [
          'Add / Edit / Remove Field',
          'Changes the layer attribute schema.',
          'Add Inspection_Date as a Date field.',
        ],
        ['Replace', 'Replaces matching values in a field.', 'Replace ?Maint.? with ?Maintenance?.'],
        [
          'Duplicate / Copy / Paste Attributes',
          'Copies records or field values according to the command context.',
          'Copy common attributes to newly created assets.',
        ],
        [
          'Repair and History',
          'Repairs supported attribute issues and reviews changes.',
          'Inspect history before accepting a bulk replacement.',
        ],
        [
          'CSV / XLSX export',
          'Exports table records for reporting.',
          'Export selected inspection records to XLSX.',
        ],
      ],
    },
    {
      title: 'Feature editing and advanced geometry',
      tools: [
        [
          'Start / Save / Stop editing',
          'Controls the edit-session lifecycle and baseline.',
          'Start, create features, Save, then Stop.',
        ],
        [
          'Create',
          'Constructs Point, Line, Polygon or Rectangle features in a compatible target.',
          'Double-click to finish a new line.',
        ],
        [
          'Vertices',
          'Edits individual coordinates of the selected geometry.',
          'Correct a road vertex using known survey coordinates.',
        ],
        [
          'Move',
          'Moves selected geometry by interactive or reference displacement.',
          'Move a misplaced asset to a surveyed location.',
        ],
        [
          'Attributes',
          'Edits fields for selected features.',
          'Populate Asset_ID and Status after construction.',
        ],
        [
          'Delete',
          'Removes selected features inside an edit session.',
          'Export a backup before bulk deletion.',
        ],
        [
          'Copy / Paste',
          'Duplicates selected geometry and attributes.',
          'Copy a standard chamber footprint.',
        ],
        [
          'Split / Merge',
          'Separates or combines compatible geometry.',
          'Split a road at a junction or merge adjacent parcels.',
        ],
        [
          'Rotate / Scale',
          'Transforms selected geometry around a defined center.',
          'Rotate a building footprint to match imagery.',
        ],
        [
          'Explode',
          'Converts multipart geometry into separate features.',
          'Explode disconnected multipolygon sites.',
        ],
        [
          'Trace',
          'Creates geometry following an existing feature.',
          'Trace a new easement along a road boundary.',
        ],
        [
          'Snap',
          'Aligns coordinates to enabled vertices, edges or intersections.',
          'Snap a service line endpoint to the main network.',
        ],
        [
          'Undo / Redo',
          'Moves backward or forward through supported edit operations.',
          'Undo immediately after an incorrect merge.',
        ],
        [
          'Trim / Extend',
          'Corrects line overshoots and undershoots.',
          'Trim a service line crossing beyond its target main.',
        ],
      ],
    },
    {
      title: 'Professional Editing Suite',
      tools: [
        [
          'Editing',
          'Configures selection, snapping, templates and precision construction.',
          'Set a 10-pixel snapping tolerance for screen digitizing.',
        ],
        [
          'Schema',
          'Defines aliases, types, length, precision, defaults, nullability, uniqueness and coded domains.',
          'Restrict Status to Existing, Proposed and Removed.',
        ],
        [
          'QA',
          'Runs geometry and schema validation.',
          'Check duplicates, invalid rings, overlaps and required fields.',
        ],
        [
          'Labels',
          'Configures expressions, placement, rotation and zoom visibility.',
          'Label roads by Name above the line from zoom 14.',
        ],
        [
          'Project',
          'Controls autosave, versions, workspace folders and recovery.',
          'Create a named version before topology repair.',
        ],
        [
          'Activity',
          'Shows progress and audit history.',
          'Export the audit log with a QA submission.',
        ],
        [
          'Help and diagnostics',
          'Configures shortcuts, high contrast, large handles and diagnostics.',
          'Enable large handles on a tablet.',
        ],
        [
          'Vertex table',
          'Edits exact coordinate values and segments.',
          'Replace a polygon corner with approved Easting/Northing.',
        ],
        [
          'Topology operations',
          'Planarizes, repairs and resolves supported overlaps or small gaps.',
          'Review before/after area totals after overlap removal.',
        ],
      ],
    },
    {
      title: 'Analysis, cartography and comparison',
      tools: [
        [
          'Buffer',
          'Creates distance zones around supported geometry.',
          'Buffer wells by 100 metres in a projected CRS.',
        ],
        [
          'Definition query',
          'Restricts displayed features by attribute criteria.',
          'Display only active construction permits.',
        ],
        [
          'Proportional symbols',
          'Sizes symbols from numeric values.',
          'Scale demand points by population.',
        ],
        [
          'Categorized styling',
          'Assigns symbols by unique or classified values.',
          'Color assets by condition.',
        ],
        [
          'Blend mode',
          'Changes visual interaction between map layers.',
          'Use Multiply when comparing shaded relief and imagery.',
        ],
        [
          'Swipe',
          'Interactively compares two layers.',
          'Swipe between current and historical imagery.',
        ],
        [
          'Legend generation',
          'Builds a legend from active styling.',
          'Verify categories before map export.',
        ],
        [
          'Worker summary and validation',
          'Runs supported large-data summaries away from the main UI thread.',
          'Validate coordinates without freezing map interaction.',
        ],
      ],
    },
    {
      title: 'Output, layouts and project packaging',
      tools: [
        [
          'GeoJSON / KML / Shapefile',
          'Exports complete or selected vector content.',
          'Export selected parcels as Shapefile ZIP with PRJ.',
        ],
        [
          'Project file',
          'Saves restorable application state.',
          'Create a .svproject checkpoint after editing.',
        ],
        [
          'Complete Project Package',
          'Packages project, layers, schemas, manifest and README.',
          'Use for handover to another Spatial Itqan user.',
        ],
        [
          'Map PNG / JPEG / PDF',
          'Produces a composed map with marginal elements.',
          'Export A3 landscape PDF at 2? resolution.',
        ],
        [
          'Layout Designer',
          'Positions and resizes title, map, legend, north arrow, scale and CRS.',
          'Keep the legend outside the primary AOI.',
        ],
        [
          'Advanced Imagery Export',
          'Writes projected AOI tiles and supporting metadata.',
          'Export EPSG:32640 GeoTIFF tiles with 0% overlap.',
        ],
        [
          'Job progress and cancellation',
          'Reports tile status and retains partial outputs.',
          'Review failed tiles in the manifest after cancellation.',
        ],
      ],
    },
    {
      title: 'Persistence, enterprise service and security',
      tools: [
        [
          'IndexedDB save',
          'Stores larger browser projects and autosaves.',
          'Recover the last browser session after an unexpected close.',
        ],
        [
          'Folder workspace',
          'Writes durable project files where browser support permits.',
          'Choose a controlled project directory in Edge or Chrome.',
        ],
        [
          'Authenticated API',
          'Provides signed sessions and project persistence.',
          'Sign in to an organization-hosted deployment.',
        ],
        [
          'Roles and ownership',
          'Restricts project viewing and editing.',
          'Assign Viewer access for review-only users.',
        ],
        [
          'PostGIS storage',
          'Stores project JSON and indexed spatial geometry.',
          'Use server deployment for shared multi-user projects.',
        ],
        [
          'Security controls',
          'Includes validation, rate limits, password hashing and headers.',
          'Deploy only behind HTTPS with strong environment secrets.',
        ],
      ],
    },
  ];

  function slug(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function guide() {
    return (global.SpatialDocumentation && global.SpatialDocumentation.guide) || [];
  }

  function guideHtml(entry, index) {
    var id = 'guide-' + index + '-' + slug(entry.title);
    var detail = '<p>' + escapeHtml(entry.text) + '</p>';
    if (entry.requires)
      detail +=
        '<div class="info"><strong>Before you start</strong>' +
        escapeHtml(entry.requires) +
        '</div>';
    if (entry.steps && entry.steps.length) {
      detail +=
        '<h3>Procedure</h3><ol class="steps">' +
        entry.steps
          .map(function (step) {
            return '<li>' + escapeHtml(step) + '</li>';
          })
          .join('') +
        '</ol>';
    }
    var info = [];
    if (entry.example)
      info.push(
        '<div class="info"><strong>Worked example</strong>' + escapeHtml(entry.example) + '</div>'
      );
    if (entry.expected)
      info.push(
        '<div class="info"><strong>Expected result</strong>' + escapeHtml(entry.expected) + '</div>'
      );
    if (entry.troubleshooting)
      info.push(
        '<div class="info warn"><strong>Troubleshooting</strong>' +
          escapeHtml(entry.troubleshooting) +
          '</div>'
      );
    if (info.length) detail += '<div class="info-grid">' + info.join('') + '</div>';
    return (
      '<section class="doc-section" id="' +
      id +
      '" data-search="' +
      escapeHtml(
        [
          entry.category,
          entry.title,
          entry.text,
          entry.requires,
          (entry.steps || []).join(' '),
          entry.example,
          entry.expected,
          entry.troubleshooting,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
      ) +
      '"><span class="eyebrow">' +
      escapeHtml(entry.category) +
      '</span><h2>' +
      escapeHtml(entry.title) +
      '</h2>' +
      detail +
      '</section>'
    );
  }

  function toolHtml(area, index) {
    var id = 'tools-' + index + '-' + slug(area.title);
    return (
      '<section class="doc-section tool-area" id="' +
      id +
      '" data-search="' +
      escapeHtml((area.title + ' ' + area.tools.flat().join(' ')).toLowerCase()) +
      '"><span class="eyebrow">Complete tool reference</span><h2>' +
      escapeHtml(area.title) +
      '</h2><div class="tool-table-wrap"><table class="tool-table"><thead><tr><th>Tool or interface</th><th>Professional purpose</th><th>Example</th></tr></thead><tbody>' +
      area.tools
        .map(function (tool) {
          return (
            '<tr><td>' +
            escapeHtml(tool[0]) +
            '</td><td>' +
            escapeHtml(tool[1]) +
            '</td><td>' +
            escapeHtml(tool[2]) +
            '</td></tr>'
          );
        })
        .join('') +
      '</tbody></table></div></section>'
    );
  }

  function render() {
    var entries = guide();
    document.getElementById('manualSections').innerHTML =
      entries.map(guideHtml).join('') + TOOL_AREAS.map(toolHtml).join('');
    var nav = document.getElementById('manualNav');
    var categories = Array.from(
      new Set(
        entries.map(function (entry) {
          return entry.category;
        })
      )
    );
    var html = '<div class="side-heading">Operating guide and examples</div>';
    categories.forEach(function (category) {
      var first = entries.findIndex(function (entry) {
        return entry.category === category;
      });
      html +=
        '<button class="side-link" data-target="' +
        'guide-' +
        first +
        '-' +
        slug(entries[first].title) +
        '">' +
        escapeHtml(category) +
        '</button>';
    });
    html += '<div class="side-heading">Complete tool reference</div>';
    TOOL_AREAS.forEach(function (area, index) {
      html +=
        '<button class="side-link" data-target="tools-' +
        index +
        '-' +
        slug(area.title) +
        '">' +
        escapeHtml(area.title) +
        '</button>';
    });
    nav.innerHTML = html;
    nav.querySelectorAll('[data-target]').forEach(function (button) {
      button.addEventListener('click', function () {
        var target = document.getElementById(button.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initialize() {
    render();
    var now = new Date();
    var date = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(now);
    document.getElementById('sideDate').textContent = 'Current date: ' + date;
    document.getElementById('heroDate').textContent = 'Updated dynamically ? ' + date;
    document.getElementById('manualFooter').textContent =
      '? ' +
      now.getFullYear() +
      ' Imran Ul Hasan. All rights reserved. ? Spatial Itqan Version 1.1.0 ? ' +
      date;
    var nav = document.getElementById('manualNav');
    document.getElementById('navUp').onclick = function () {
      nav.scrollBy({ top: -280, behavior: 'smooth' });
    };
    document.getElementById('navDown').onclick = function () {
      nav.scrollBy({ top: 280, behavior: 'smooth' });
    };
    document.getElementById('printManual').onclick = function () {
      global.print();
    };
    document.getElementById('manualSearch').addEventListener('input', function (event) {
      var query = event.target.value.trim().toLowerCase();
      var shown = 0;
      document.querySelectorAll('.doc-section').forEach(function (section) {
        var match = !query || section.dataset.search.indexOf(query) >= 0;
        section.hidden = !match;
        if (match) shown++;
      });
      document.getElementById('noResults').style.display = shown ? 'none' : 'block';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})(window);
