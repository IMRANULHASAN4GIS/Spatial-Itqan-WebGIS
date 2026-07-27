(function (global) {
  'use strict';
  var DB_NAME = 'spatial-itqan';
  var DB_VERSION = 1;
  var PROJECTS = 'projects';
  var SETTINGS = 'settings';

  function open() {
    return new Promise(function (resolve, reject) {
      if (!global.indexedDB) {
        reject(new Error('IndexedDB is unavailable'));
        return;
      }
      var request = global.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = function () {
        var db = request.result;
        if (!db.objectStoreNames.contains(PROJECTS)) {
          var projects = db.createObjectStore(PROJECTS, { keyPath: 'id' });
          projects.createIndex('updatedAt', 'updatedAt');
        }
        if (!db.objectStoreNames.contains(SETTINGS)) db.createObjectStore(SETTINGS);
      };
      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error || new Error('Could not open IndexedDB'));
      };
    });
  }

  function transaction(store, mode, operation) {
    return open().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, mode);
        var request = operation(tx.objectStore(store));
        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error);
        };
        tx.oncomplete = function () {
          db.close();
        };
        tx.onerror = function () {
          reject(tx.error);
          db.close();
        };
      });
    });
  }

  function saveProject(id, project) {
    var record = {
      id: id || 'default',
      updatedAt: new Date().toISOString(),
      byteLength: new Blob([JSON.stringify(project)]).size,
      project: project,
    };
    return transaction(PROJECTS, 'readwrite', function (store) {
      return store.put(record);
    }).then(function () {
      return record;
    });
  }

  function loadProject(id) {
    return transaction(PROJECTS, 'readonly', function (store) {
      return store.get(id || 'default');
    }).then(function (record) {
      return record ? record.project : null;
    });
  }

  function removeProject(id) {
    return transaction(PROJECTS, 'readwrite', function (store) {
      return store.delete(id || 'default');
    });
  }

  function listProjects() {
    return transaction(PROJECTS, 'readonly', function (store) {
      return store.getAll();
    }).then(function (records) {
      return records
        .map(function (record) {
          return { id: record.id, updatedAt: record.updatedAt, byteLength: record.byteLength };
        })
        .sort(function (a, b) {
          return b.updatedAt.localeCompare(a.updatedAt);
        });
    });
  }

  global.SpatialStorage = Object.freeze({
    saveProject: saveProject,
    loadProject: loadProject,
    removeProject: removeProject,
    listProjects: listProjects,
  });
})(typeof window !== 'undefined' ? window : globalThis);
