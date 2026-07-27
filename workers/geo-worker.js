'use strict';

function visitCoordinates(coordinates, callback) {
  if (!Array.isArray(coordinates)) return;
  if (coordinates.length >= 2 && typeof coordinates[0] === 'number') {
    callback(coordinates);
    return;
  }
  coordinates.forEach(function (child) { visitCoordinates(child, callback); });
}

self.onmessage = function (event) {
  var message = event.data || {};
  try {
    var collection = message.payload || { features: [] };
    var features = Array.isArray(collection.features) ? collection.features : [];
    if (message.type === 'summarize') {
      var geometryTypes = {};
      var propertyNames = {};
      features.forEach(function (feature) {
        var type = feature.geometry && feature.geometry.type || 'Null';
        geometryTypes[type] = (geometryTypes[type] || 0) + 1;
        Object.keys(feature.properties || {}).forEach(function (name) { propertyNames[name] = true; });
      });
      self.postMessage({
        id: message.id,
        result: { featureCount: features.length, geometryTypes: geometryTypes, fields: Object.keys(propertyNames) }
      });
      return;
    }
    if (message.type === 'validateCoordinates') {
      var issues = [];
      features.forEach(function (feature, featureIndex) {
        if (!feature.geometry) { issues.push({ featureIndex: featureIndex, issue: 'Missing geometry' }); return; }
        visitCoordinates(feature.geometry.coordinates, function (coordinate) {
          if (!Number.isFinite(coordinate[0]) || !Number.isFinite(coordinate[1])) {
            issues.push({ featureIndex: featureIndex, issue: 'Non-finite coordinate' });
          }
        });
      });
      self.postMessage({ id: message.id, result: { valid: issues.length === 0, issues: issues } });
      return;
    }
    throw new Error('Unsupported worker operation');
  } catch (error) {
    self.postMessage({ id: message.id, error: error.message || String(error) });
  }
};
