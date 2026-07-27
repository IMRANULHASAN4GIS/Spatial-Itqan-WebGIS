(function (global) {
  'use strict';
  var token = null;
  var baseUrl = './api';

  function configure(options) {
    if (options && options.baseUrl) baseUrl = String(options.baseUrl).replace(/\/$/, '');
  }

  async function request(path, options) {
    var settings = options || {};
    var headers = Object.assign({ Accept: 'application/json' }, settings.headers || {});
    if (settings.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = 'Bearer ' + token;
    var response = await fetch(baseUrl + path, Object.assign({}, settings, { headers: headers }));
    var payload = await response.json().catch(function () {
      return {};
    });
    if (!response.ok)
      throw new Error(payload.error || 'Request failed with HTTP ' + response.status);
    return payload;
  }

  async function login(email, password) {
    var result = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    });
    token = result.token;
    return result.user;
  }

  function logout() {
    token = null;
  }

  global.SpatialApi = Object.freeze({
    configure: configure,
    login: login,
    logout: logout,
    me: function () {
      return request('/auth/me');
    },
    listProjects: function () {
      return request('/projects');
    },
    getProject: function (id) {
      return request('/projects/' + encodeURIComponent(id));
    },
    createProject: function (name, document) {
      return request('/projects', {
        method: 'POST',
        body: JSON.stringify({ name: name, document: document }),
      });
    },
    updateProject: function (id, name, document, expectedVersion) {
      return request('/projects/' + encodeURIComponent(id), {
        method: 'PUT',
        body: JSON.stringify({ name: name, document: document, expectedVersion: expectedVersion }),
      });
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
