(function (global) {
  'use strict';
  var sequence = 0;
  var pending = new Map();
  var worker = null;

  function ensureWorker() {
    if (!global.Worker) return null;
    if (!worker) {
      worker = new Worker('./workers/geo-worker.js');
      worker.onmessage = function (event) {
        var task = pending.get(event.data.id);
        if (!task) return;
        pending.delete(event.data.id);
        if (event.data.error) task.reject(new Error(event.data.error));
        else task.resolve(event.data.result);
      };
      worker.onerror = function (event) {
        pending.forEach(function (task) {
          task.reject(new Error(event.message || 'Worker failed'));
        });
        pending.clear();
        worker = null;
      };
    }
    return worker;
  }

  function run(type, payload) {
    var active = ensureWorker();
    if (!active) return Promise.reject(new Error('Web Workers are unavailable'));
    var id = ++sequence;
    return new Promise(function (resolve, reject) {
      pending.set(id, { resolve: resolve, reject: reject });
      active.postMessage({ id: id, type: type, payload: payload });
    });
  }

  global.SpatialWorker = Object.freeze({
    summarize: function (featureCollection) {
      return run('summarize', featureCollection);
    },
    validateCoordinates: function (featureCollection) {
      return run('validateCoordinates', featureCollection);
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
