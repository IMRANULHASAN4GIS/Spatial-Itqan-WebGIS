(function (global) {
  'use strict';

  var VERSION = '1.1.0';
  var CHAPTERS = [
    {
      category: 'Start here',
      title: 'Getting started and task workspaces',
      text: 'Choose Data to import and organize layers, Edit for feature construction and geometry changes, Analyze for selection and processing, or Present for a clean map. Add a layer, make it active, inspect its table, select or edit features, run QA, and export a project package.',
    },
    {
      category: 'Start here',
      title: 'Installation and offline use',
      text: 'Select Install App in the header. Chrome, Edge and Android show a native installation prompt when the site is served over HTTPS or localhost. On iPhone and iPad, open Safari Share and choose Add to Home Screen. The application shell can open offline; online maps, routing, weather, search and imagery still require their services.',
    },
    {
      category: 'Data and layers',
      title: 'Supported data',
      text: 'Import GeoJSON, KML, KMZ, GPX, zipped Shapefile components, CSV, Excel, DXF, LAS and supported raster sources. Confirm the source coordinate reference system whenever it cannot be determined reliably. Proprietary DWG, ECW and File Geodatabase content may require conversion before browser use.',
    },
    {
      category: 'Data and layers',
      title: 'Layer management and symbology',
      text: 'Use the layer list to set visibility, active layer, order, opacity and styling. The Symbol Selector supports point symbols and custom images, line patterns, polygon fills, outlines, size, angle and opacity. Legends and saved projects preserve supported styles.',
    },
    {
      category: 'Navigation',
      title: 'Map navigation and coordinates',
      text: 'The first launch uses a neutral world extent. Pan, zoom, search or locate the device and the resulting center and zoom are remembered on this device for the next launch. A normal reload preserves the view; Factory reset session clears it. Return Home opens the neutral world extent. Previous/next extent, zoom to all content and Go to XY remain available. Basemaps permit digital overzoom to level 28; raster detail is limited by each provider?s native tile resolution, while vector and CAD content remain sharp. The active CRS controls coordinate display and supported export operations.',
    },
    {
      category: 'Navigation',
      title: 'Routing and live services',
      text: 'Choose Route, set origin and destination from the map or device location, and request directions. Search, reverse geocoding, routing, weather, flags and online basemaps use external services and are subject to connectivity, CORS and provider limits.',
    },
    {
      category: 'Selection and tables',
      title: 'Identify, select and inspect',
      text: 'Identify reports features at a clicked location. Selection tools support replace, add and toggle behavior, rectangle and attribute selection, switch selection, clear, selected-only display, zoom and export. Selection behavior depends on layer selectability.',
    },
    {
      category: 'Selection and tables',
      title: 'Attribute table and field calculator',
      text: 'Open the table for the active layer to filter, sort, select and edit values. Add, rename or remove fields, copy and paste attributes, replace values and calculate fields. Expressions use a restricted calculator with field references, arithmetic and approved functions; JavaScript execution is not allowed.',
    },
    {
      category: 'Editing',
      title: 'Edit sessions and feature construction',
      text: 'Select a compatible target layer, start editing, then create points, lines, polygons or rectangles. Construction can continue until Esc. Save commits the browser project checkpoint; Stop ends the session; Discard restores the session baseline.',
    },
    {
      category: 'Editing',
      title: 'Geometry and advanced editing',
      text: 'Edit vertices and attributes, move, copy, paste, split, merge, rotate, scale, explode multipart features, trace, trim overshoots, extend undershoots, calculate geometry, delete selected features, and use undo or redo. Commands enable only when geometry and selection requirements are satisfied.',
    },
    {
      category: 'Professional suite',
      title: 'Snapping and precision construction',
      text: 'Configure endpoint, vertex, midpoint, edge and intersection snapping; choose screen-pixel or map-unit tolerance; and control participating layers. Precision methods include coordinates, direction-distance, parallel, perpendicular, arcs, circles, freehand and trace.',
    },
    {
      category: 'Professional suite',
      title: 'Schema, domains and validation',
      text: 'Define field aliases, type, length, precision, scale, nullability, uniqueness, defaults and coded domains. Validate schemas before save or export and review field-level issues in the QA results.',
    },
    {
      category: 'Professional suite',
      title: 'Geometry QA and topology',
      text: 'Run checks for missing geometry, invalid coordinates and rings, duplicates, multipart features, self-intersections, spikes, slivers, overlaps and schema violations. Repair, planarize, remove overlaps and eliminate small gaps only after reviewing a backup.',
    },
    {
      category: 'Analysis',
      title: 'Spatial analysis and cartography',
      text: 'Available tools include buffers, field calculation, definition filters, proportional symbols, legend generation, blending, swipe comparison and layer-derived visualization. Large feature summaries and coordinate validation can run in a background worker.',
    },
    {
      category: 'CAD, raster and point cloud',
      title: 'CAD, raster and LAS workflows',
      text: 'DXF import exposes drawing layers, entity classes and CRS assignment. Raster tools support display and georeferenced export where the browser and source permit it. LAS input is visualized as sampled points; very large datasets should be prepared and tiled with specialist desktop or server software.',
    },
    {
      category: 'Output',
      title: 'Layer and project export',
      text: 'Export supported vector layers as WGS84 GeoJSON, KML or Shapefile ZIP with projection information. Save a restorable project file or a complete package containing project state, vector data, schemas, manifest and instructions.',
    },
    {
      category: 'Output',
      title: 'Map layout and imagery export',
      text: 'Create PNG, JPEG or PDF map layouts with title, legend, north arrow, scale and CRS. The layout designer supports repositioning and resizing. Advanced AOI imagery export writes projected tiles, georeferencing files, manifests, logs and partial results after cancellation.',
    },
    {
      category: 'Projects and collaboration',
      title: 'Browser, folder and server persistence',
      text: 'IndexedDB stores larger browser projects and autosaves, with localStorage used for small preferences and fallback. Folder saving requires a supporting browser. Enterprise deployments can use the authenticated API and PostGIS database with project ownership, roles and optimistic version checks.',
    },
    {
      category: 'Accessibility and mobile',
      title: 'Mobile, touch and accessibility',
      text: 'The interface adapts to phone, tablet and desktop resolution, safe areas, orientation and virtual-keyboard viewport changes. Touch targets and editing handles enlarge on coarse pointers. High contrast, large handles, keyboard shortcuts and reduced-motion preferences are supported.',
    },
    {
      category: 'Security and privacy',
      title: 'Security and data handling',
      text: 'Local files are normally processed in the browser. Online services receive the requests necessary for their function. Enterprise API passwords are hashed, tokens expire, inputs are validated and requests are rate-limited. Use HTTPS, strong secrets, private database networking and organizationally approved service providers.',
    },
  ];

  var WORKFLOWS = [
    {
      category: 'Worked examples',
      title: 'Example 1 ? Import a CSV of survey points',
      text: 'Load a coordinate table, verify its CRS, inspect the attributes and save it as a GIS layer.',
      requires: 'A CSV containing Easting and Northing, or Longitude and Latitude columns.',
      steps: [
        'Choose Full GIS or Data from Workspace and select Add Layer.',
        'Select the CSV. In the import panel, confirm the detected X and Y fields.',
        'Choose the source CRS. For an Al Ain survey in WGS 1984 UTM Zone 40N, use EPSG:32640 rather than WGS84 latitude/longitude.',
        'Preview the coordinates and reject the import if points appear near 0,0 or in the wrong country.',
        'Add the layer, make it active, open Table, and verify several records.',
        'Use Full Extent to confirm the complete survey area, then export a project package.',
      ],
      example:
        'Point_ID=BM-001, Easting=363245.18, Northing=2674120.44, Elevation=291.63; source CRS EPSG:32640.',
      expected:
        'A point layer appears at the correct survey location with Point_ID and Elevation available in the attribute table.',
      troubleshooting:
        'If the points are in the ocean or another continent, remove the layer and import again with the correct X/Y fields, axis order and source CRS.',
    },
    {
      category: 'Worked examples',
      title: 'Example 2 ? Select assets by attribute and export them',
      text: 'Find a subset of features using field criteria and produce a separate deliverable.',
      requires: 'An active vector layer with attributes such as Status, Type or Inspection_Date.',
      steps: [
        'Open the attribute table and select Select by Attribute.',
        'Choose the field Status, operator equals, and value Critical.',
        'Run the selection and review the selected count on the map and table.',
        'Choose Selected Only to inspect the result, then Zoom to Selection.',
        'Use Export Selection and choose GeoJSON, KML or Shapefile as required.',
        'Clear the selection before starting a different query.',
      ],
      example: 'Status = Critical AND Asset_Type = Valve.',
      expected: 'Only matching critical valves are highlighted and included in the exported file.',
      troubleshooting:
        'Text comparisons can be case-sensitive depending on the command. Use the unique-values list and confirm that numeric fields are queried with numeric values.',
    },
    {
      category: 'Worked examples',
      title: 'Example 3 ? Create and edit a road centerline',
      text: 'Create a typed line layer, digitize a road, snap it to existing data and correct its vertices.',
      requires: 'A visible reference layer and an appropriate projected CRS for engineering work.',
      steps: [
        'Switch to Full GIS or Edit and open the Feature Editor.',
        'Create a new Line layer named Road Centerline with Road_ID, Name and Surface fields.',
        'Enable snapping for the reference and target layers and set a suitable tolerance.',
        'Start Editing, select the Line template, click each vertex and double-click to finish.',
        'Enter the attributes, select the new road and open Vertices to correct coordinates.',
        'Run geometry QA, Save Edits, Stop Editing and export a project package.',
      ],
      example: 'Road_ID=RD-1042, Name=Service Road A, Surface=Asphalt.',
      expected:
        'A valid LineString is stored in the target layer, aligned to the reference geometry and carrying the required attributes.',
      troubleshooting:
        'If Create is disabled, set an active editable line layer and start an edit session. If snapping is absent, verify per-layer snapping and tolerance units.',
    },
    {
      category: 'Worked examples',
      title: 'Example 4 ? Calculate area and classify parcels',
      text: 'Calculate geometry-derived values with the restricted expression engine and symbolize the result.',
      requires: 'A polygon layer in a suitable projected CRS.',
      steps: [
        'Open the parcel table and add a Double field named Area_m2.',
        'Open Field Calculator and calculate Area_m2 using AREA.',
        'Add a Text field named Size_Class.',
        'Calculate Size_Class with a supported conditional workflow or select ranges and populate Small, Medium and Large.',
        'Open the Symbol Selector or categorized styling and classify by Size_Class.',
        'Review outliers and run polygon geometry QA before export.',
      ],
      example: 'Area_m2 = ROUND(AREA, 2). A 1,250.456 m? parcel becomes 1250.46.',
      expected:
        'Every valid parcel receives an area value and can be displayed by its size category.',
      troubleshooting:
        'Area from geographic coordinates can be unsuitable for engineering decisions. Use a locally appropriate projected CRS and inspect null geometry results.',
    },
    {
      category: 'Worked examples',
      title: 'Example 5 ? QA/QC a contractor submission',
      text: 'Review geometry and schema problems before accepting a delivered dataset.',
      requires: 'The submission layer, its required field specification and valid domain values.',
      steps: [
        'Import the submission and save an untouched project package as a baseline.',
        'Open Professional Editing Suite ? Schema and define required field types, nullability, uniqueness and coded domains.',
        'Run extended QA for empty geometry, invalid coordinates, duplicates, multipart features, intersections, spikes, slivers and overlaps.',
        'Filter the QA list by issue type and zoom to each affected feature.',
        'Repair only issues with an understood correction; record activity in the audit history.',
        'Run QA again and export the clean layer, QA report and project package.',
      ],
      example:
        'Asset_ID must be unique and non-null; Status must be one of Existing, Proposed or Removed.',
      expected:
        'The final QA run reports no blocking schema or geometry errors, with reviewed warnings documented.',
      troubleshooting:
        'Automated repair can change geometry. Compare feature count, total length or area, and spot-check edits against the baseline.',
    },
    {
      category: 'Worked examples',
      title: 'Example 6 ? Produce a presentation map',
      text: 'Prepare a clean map with a title, legend, north arrow, scale and export-ready layout.',
      requires: 'Styled visible layers and the intended map extent.',
      steps: [
        'Choose Present workspace, set the final extent and hide unnecessary layers.',
        'Apply readable symbols and labels with appropriate scale ranges.',
        'Enable title, legend, north arrow, scale and CRS stamp.',
        'Open Output and choose page size, orientation, resolution and visual style.',
        'Use Design Layout to position and resize map elements.',
        'Export PNG for reports or PDF for printing and inspect the result at full size.',
      ],
      example:
        'A3 landscape, 2? resolution, title ?Critical Water Assets ? July 2026?, legend at lower right.',
      expected:
        'The exported map has no editing panels, clipped labels or overlapping marginal elements.',
      troubleshooting:
        'If online basemap tiles are blank, wait for tiles to finish loading, confirm CORS access and reopen the layout snapshot.',
    },
    {
      category: 'Worked examples',
      title: 'Example 7 ? Export a georeferenced imagery grid',
      text: 'Create projected raster tiles for an area of interest with sidecar files and a manifest.',
      requires:
        'A visible imagery source, defined AOI, output CRS and a browser supporting folder access.',
      steps: [
        'Select one polygon AOI or draw an AOI rectangle.',
        'Open Advanced Imagery Export and choose the imagery source.',
        'Set the target CRS, tile size, resolution and 0% overlap for an edge-to-edge mosaic.',
        'Choose GeoTIFF, or PNG/JPEG with world and PRJ files.',
        'Choose the destination folder and start the job.',
        'Review failed-tile counts, manifest, tile index, README and export log.',
      ],
      example: 'EPSG:32640, 2048-pixel GeoTIFF tiles, 0% overlap.',
      expected:
        'Adjacent output bounds share the same grid and the manifest lists every completed or failed tile.',
      troubleshooting:
        'Absolute accuracy is limited by the source imagery. Do not interpret display imagery as survey-grade data without independent control.',
    },
    {
      category: 'Worked examples',
      title: 'Example 8 ? Save, recover and share a project',
      text: 'Use browser recovery during work and create durable deliverables for another user.',
      requires: 'At least one imported or created layer.',
      steps: [
        'Save regularly; IndexedDB stores the current project and autosave checkpoints.',
        'Create a named version before major editing or repair.',
        'Export a .svproject file for a compact restorable copy.',
        'Export Complete Project Package to include vector layers, schemas, manifest and README.',
        'Transfer the ZIP through an approved channel and ask the recipient to restore the project.',
        'For shared enterprise work, sign in to the API-backed deployment and verify project permissions.',
      ],
      example: 'Project package: AlAin_Road_QA_2026-07-28.zip.',
      expected:
        'The recipient can restore the view, layers, attributes, schemas and supported symbology without relying on your browser storage.',
      troubleshooting:
        'Browser data can be cleared by users or device policies. Treat exported packages or server projects as the durable record.',
    },
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function cleanText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function categoryFor(element) {
    var group = element.closest('.xp-group');
    if (group) return group.getAttribute('data-title') || 'Ribbon tools';
    var professional = element.closest('[data-pro-pane]');
    if (professional)
      return 'Professional suite ? ' + (professional.getAttribute('data-pro-pane') || 'Tools');
    var pane = element.closest('.pane');
    if (pane) {
      var paneName = pane.getAttribute('data-pane') || pane.id || 'Panel';
      return 'Panel ? ' + paneName.replace(/^pane/i, '');
    }
    var modal = element.closest('.modal,.pro-suite-overlay,.sv-symbol-modal,.sba-tool-window');
    if (modal) {
      var heading = modal.querySelector(
        '.modal-head b,.pro-suite-head strong,[role="heading"],h2,h3'
      );
      return cleanText(heading && heading.textContent) || 'Dialog ? ' + (modal.id || 'Tools');
    }
    if (element.closest('.attrdrawer')) return 'Attribute table';
    if (element.closest('.topbar')) return 'Header and global controls';
    if (element.closest('.pagefoot')) return 'Status and footer';
    return 'Other tools';
  }

  function nameFor(element) {
    var labelled = element.getAttribute('aria-label') || element.getAttribute('title');
    var label = element.id && document.querySelector('label[for="' + CSS.escape(element.id) + '"]');
    return cleanText(
      labelled ||
        (label && label.textContent) ||
        element.textContent ||
        element.getAttribute('placeholder') ||
        element.getAttribute('name') ||
        element.id ||
        element.tagName
    );
  }

  function descriptionFor(element, name) {
    var title = cleanText(
      element.getAttribute('title') || element.getAttribute('aria-description')
    );
    if (title && title.toLowerCase() !== name.toLowerCase()) return title;
    if (element.tagName === 'SELECT') {
      var options = Array.from(element.options || [])
        .slice(0, 12)
        .map(function (option) {
          return cleanText(option.textContent);
        })
        .filter(Boolean);
      return (
        'Choose one of: ' + options.join(', ') + (element.options.length > 12 ? ', and more.' : '.')
      );
    }
    if (element.matches('input,textarea')) {
      var type = element.getAttribute('type') || element.tagName.toLowerCase();
      return 'Enter or choose the ' + name + ' value (' + type + ').';
    }
    return (
      'Opens or runs ' +
      name +
      '. Availability can depend on the active layer, selection, edit session, geometry type or browser capability.'
    );
  }

  function buildToolCatalog() {
    var seen = {};
    return Array.from(
      document.querySelectorAll('button,select,input:not([type="hidden"]),textarea,[role="button"]')
    )
      .map(function (element) {
        var name = nameFor(element);
        if (!name || name.length > 120) return null;
        var category = categoryFor(element);
        var key = category + '|' + name;
        if (seen[key]) return null;
        seen[key] = true;
        return {
          category: category,
          title: name,
          text: descriptionFor(element, name),
          controlId: element.id || '',
          kind: (element.getAttribute('role') || element.tagName).toLowerCase(),
        };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      });
  }

  function entrySearchText(entry) {
    return [
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
      .toLowerCase();
  }

  function entryDetails(entry) {
    var html = '<p>' + escapeHtml(entry.text) + '</p>';
    if (entry.requires) {
      html +=
        '<div class="docs-callout"><strong>Before you start</strong><span>' +
        escapeHtml(entry.requires) +
        '</span></div>';
    }
    if (entry.steps && entry.steps.length) {
      html +=
        '<h3>Procedure</h3><ol class="docs-steps">' +
        entry.steps
          .map(function (step) {
            return '<li>' + escapeHtml(step) + '</li>';
          })
          .join('') +
        '</ol>';
    }
    if (entry.example) {
      html +=
        '<div class="docs-example"><strong>Example</strong><span>' +
        escapeHtml(entry.example) +
        '</span></div>';
    }
    if (entry.expected) {
      html +=
        '<div class="docs-result"><strong>Expected result</strong><span>' +
        escapeHtml(entry.expected) +
        '</span></div>';
    }
    if (entry.troubleshooting) {
      html +=
        '<div class="docs-trouble"><strong>Troubleshooting</strong><span>' +
        escapeHtml(entry.troubleshooting) +
        '</span></div>';
    }
    return html;
  }

  function render(query, activeCategory) {
    var body = document.getElementById('helpBody');
    if (!body) return;
    var tools = buildToolCatalog();
    var guideEntries = CHAPTERS.concat(WORKFLOWS);
    var entries = guideEntries.concat(tools);
    var normalized = cleanText(query).toLowerCase();
    var categories = Array.from(
      new Set(
        guideEntries.map(function (entry) {
          return entry.category;
        })
      )
    );
    var visible = entries.filter(function (entry) {
      var isTool = !!entry.controlId;
      var categoryMatch = !activeCategory || activeCategory === 'All';
      if (activeCategory === 'Tool reference') categoryMatch = isTool;
      else if (activeCategory && activeCategory !== 'All') {
        categoryMatch = !isTool && entry.category === activeCategory;
      }
      var textMatch = !normalized || entrySearchText(entry).indexOf(normalized) >= 0;
      return categoryMatch && textMatch;
    });
    body.innerHTML =
      '<div class="docs-shell">' +
      '<aside class="docs-nav" aria-label="Manual chapters">' +
      '<button class="docs-nav-item' +
      (!activeCategory || activeCategory === 'All' ? ' active' : '') +
      '" data-doc-category="All">All documentation</button>' +
      '<div class="docs-nav-heading">User guide</div>' +
      categories
        .map(function (category) {
          return (
            '<button class="docs-nav-item' +
            (category === activeCategory ? ' active' : '') +
            '" data-doc-category="' +
            escapeHtml(category) +
            '">' +
            escapeHtml(category) +
            '</button>'
          );
        })
        .join('') +
      '<div class="docs-nav-heading">Reference</div>' +
      '<button class="docs-nav-item' +
      (activeCategory === 'Tool reference' ? ' active' : '') +
      '" data-doc-category="Tool reference">Complete tool reference <span class="docs-nav-count">' +
      tools.length +
      '</span></button>' +
      '</aside><main class="docs-content">' +
      '<section class="docs-hero"><div><span class="docs-version">Version ' +
      VERSION +
      '</span><h1>Spatial Itqan complete user manual</h1><p>Searchable guidance plus an automatically generated reference for every interface control currently available in the application.</p></div>' +
      '<div class="docs-count"><strong>' +
      tools.length +
      '</strong><span>documented controls</span></div></section>' +
      (visible.length
        ? visible
            .map(function (entry) {
              return (
                '<article class="docs-card" data-doc-search="' +
                escapeHtml((entry.category + ' ' + entry.title + ' ' + entry.text).toLowerCase()) +
                '">' +
                '<span class="docs-category">' +
                escapeHtml(entry.category) +
                '</span>' +
                '<h2>' +
                escapeHtml(entry.title) +
                '</h2>' +
                entryDetails(entry) +
                (entry.controlId ? '<code>#' + escapeHtml(entry.controlId) + '</code>' : '') +
                '</article>'
              );
            })
            .join('')
        : '<div class="help-noresult">No documentation matches this search.</div>') +
      '</main></div>';
    body.querySelectorAll('[data-doc-category]').forEach(function (button) {
      button.addEventListener('click', function () {
        global.__spatialDocsCategory = button.getAttribute('data-doc-category');
        render(document.getElementById('helpSearch').value, global.__spatialDocsCategory);
      });
    });
  }

  function downloadableManual() {
    var tools = buildToolCatalog();
    var cards = CHAPTERS.concat(WORKFLOWS, tools)
      .map(function (entry) {
        return (
          '<section><small>' +
          escapeHtml(entry.category) +
          '</small><h2>' +
          escapeHtml(entry.title) +
          '</h2>' +
          entryDetails(entry) +
          '</section>'
        );
      })
      .join('');
    return (
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">' +
      '<title>Spatial Itqan ' +
      VERSION +
      ' Manual</title><style>body{font:15px/1.6 system-ui;margin:0 auto;max-width:980px;padding:40px;color:#172033}' +
      'header{border-bottom:4px solid #0ea5e9;margin-bottom:30px}section{break-inside:avoid;border-bottom:1px solid #ddd;padding:14px 0}' +
      'small{color:#0284c7;font-weight:700;text-transform:uppercase}h1,h2{line-height:1.2}h2{font-size:19px}</style></head>' +
      '<body><header><h1>Spatial Itqan complete user manual</h1><p>Version ' +
      VERSION +
      ' ? ' +
      tools.length +
      ' interface controls documented</p></header>' +
      cards +
      '</body></html>'
    );
  }

  function downloadManual() {
    var blob = new Blob([downloadableManual()], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'Spatial-Itqan-User-Manual-v' + VERSION + '.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function open() {
    global.location.href = 'documentation.html';
  }

  function initialize() {
    var modal = document.getElementById('helpModal');
    var openButton = document.getElementById('helpBtn');
    var closeButton = document.getElementById('helpClose');
    var search = document.getElementById('helpSearch');
    var download = document.getElementById('helpPdf');
    if (!modal || !openButton) return;
    var title = modal.querySelector('.modal-head b');
    if (title) title.textContent = 'Spatial Itqan 1.1.0 ? Complete Documentation';
    openButton.style.display = '';
    openButton.setAttribute('aria-label', 'Open complete user documentation');
    openButton.title = 'Complete searchable user manual';
    openButton.onclick = open;
    if (!openButton.dataset.completeDocsWired) {
      openButton.dataset.completeDocsWired = '1';
      openButton.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          open();
        },
        true
      );
    }
    if (closeButton)
      closeButton.onclick = function () {
        modal.classList.remove('open');
      };
    if (search) {
      search.placeholder = 'Search every interface, tool and workflow?';
      search.oninput = function () {
        render(search.value, global.__spatialDocsCategory || 'All');
      };
      if (!search.dataset.completeDocsWired) {
        search.dataset.completeDocsWired = '1';
        search.addEventListener(
          'input',
          function (event) {
            event.stopImmediatePropagation();
            render(search.value, global.__spatialDocsCategory || 'All');
          },
          true
        );
      }
    }
    if (download) {
      download.textContent = '? Download Manual';
      download.title = 'Download the complete manual as a standalone HTML document';
      download.onclick = downloadManual;
      if (!download.dataset.completeDocsWired) {
        download.dataset.completeDocsWired = '1';
        download.addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            downloadManual();
          },
          true
        );
      }
    }
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.classList.remove('open');
    });
    render('', 'All');
  }

  global.SpatialDocumentation = Object.freeze({
    open: open,
    render: render,
    buildToolCatalog: buildToolCatalog,
    guide: CHAPTERS.concat(WORKFLOWS),
    version: VERSION,
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})(typeof window !== 'undefined' ? window : globalThis);
