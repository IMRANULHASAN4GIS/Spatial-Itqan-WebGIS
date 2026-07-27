(function (global) {
  'use strict';
  var WORKSPACES = {
    full: [
      'Data & Layers',
      'Map Navigation',
      'Go to XY',
      'Select & Identify',
      'Editor',
      'Advanced Editing',
    ],
    data: ['Data & Layers', 'Map Navigation', 'Go to XY'],
    edit: ['Data & Layers', 'Select & Identify', 'Editor', 'Advanced Editing'],
    analyze: ['Data & Layers', 'Select & Identify', 'Map Navigation', 'Go to XY'],
    present: ['Map Navigation'],
  };

  function apply(name) {
    if (!WORKSPACES[name]) name = 'full';
    document.body.dataset.workspace = name;
    document.querySelectorAll('#experienceRibbon .xp-group').forEach(function (group) {
      var title = group.getAttribute('data-title') || '';
      group.hidden = WORKSPACES[name].indexOf(title) < 0;
    });
    try {
      localStorage.setItem('SpatialItqanWorkspaceV110', name);
    } catch (error) {
      void error;
    }
    setTimeout(function () {
      if (global.map && typeof global.map.invalidateSize === 'function')
        global.map.invalidateSize();
    }, 80);
  }

  function initialize() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || document.getElementById('workspaceSelect')) return;
    var wrapper = document.createElement('label');
    wrapper.className = 'workspace-picker';
    wrapper.innerHTML =
      '<span>Workspace</span><select id="workspaceSelect" aria-label="Task workspace">' +
      '<option value="full">Full GIS</option><option value="data">Data</option><option value="edit">Edit</option>' +
      '<option value="analyze">Analyze</option><option value="present">Present</option></select>';
    var spacer = topbar.querySelector('.spacer');
    topbar.insertBefore(wrapper, spacer || null);
    var selected = 'full';
    try {
      selected = localStorage.getItem('SpatialItqanWorkspaceV110') || 'full';
    } catch (error) {
      void error;
    }
    wrapper.querySelector('select').value = WORKSPACES[selected] ? selected : 'full';
    wrapper.querySelector('select').addEventListener('change', function (event) {
      apply(event.target.value);
    });
    apply(selected);
  }

  global.SpatialWorkspace = Object.freeze({ apply: apply, initialize: initialize });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})(typeof window !== 'undefined' ? window : globalThis);
