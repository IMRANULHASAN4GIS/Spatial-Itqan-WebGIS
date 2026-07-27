(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var ua = navigator.userAgent || '';
  var uaData = navigator.userAgentData;
  var platform = (uaData && uaData.platform) || navigator.platform || '';
  var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var shortest = Math.min(screen.width || innerWidth, screen.height || innerHeight);
  var viewportShortest = Math.min(innerWidth, innerHeight);
  var mobileUA = (uaData && uaData.mobile) || /Android|iPhone|iPod|IEMobile|Opera Mini/i.test(ua);
  var tabletUA = /iPad|Tablet|PlayBook|Silk/i.test(ua) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua));
  var formFactor = tabletUA || (coarse && shortest >= 600) ?
    'tablet' : (mobileUA || coarse || shortest < 600 || viewportShortest < 600 ? 'mobile' : 'desktop');
  var os = /Windows/i.test(platform + ua) ? 'Windows' :
    /Android/i.test(ua) ? 'Android' :
    /iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 'iOS/iPadOS' :
    /Mac/i.test(platform) ? 'macOS' :
    /Linux/i.test(platform) ? 'Linux' : 'Other';
  var standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  body.classList.add('device-' + formFactor);
  if (coarse) body.classList.add('pro-touch');
  if (standalone) body.classList.add('pwa-standalone');
  root.dataset.device = formFactor;
  root.dataset.os = os.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  window.SpatialItqanDevice = {
    version: '1.1.0',
    formFactor: formFactor,
    os: os,
    touch: navigator.maxTouchPoints > 0 || coarse,
    standalone: standalone,
    viewport: { width: innerWidth, height: innerHeight },
    screen: { width: screen.width, height: screen.height, pixelRatio: devicePixelRatio || 1 }
  };

  function syncViewport() {
    var viewport = window.visualViewport;
    var height = viewport ? viewport.height : innerHeight;
    root.style.setProperty('--app-height', Math.round(height) + 'px');
    window.SpatialItqanDevice.viewport = {
      width: Math.round(viewport ? viewport.width : innerWidth),
      height: Math.round(height)
    };
    if (window.map && typeof window.map.invalidateSize === 'function') {
      clearTimeout(syncViewport.mapTimer);
      syncViewport.mapTimer = setTimeout(function () { window.map.invalidateSize(); }, 120);
    }
  }
  syncViewport();
  addEventListener('resize', syncViewport, { passive: true });
  addEventListener('orientationchange', syncViewport, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', syncViewport, { passive: true });

  function addDeviceChip() {
    if (formFactor === 'desktop' || document.querySelector('.pwa-device-chip')) return;
    var chip = document.createElement('div');
    chip.className = 'pwa-device-chip';
    chip.textContent = formFactor.toUpperCase() + ' · ' + os + ' · ' +
      screen.width + '×' + screen.height + ' · ' + (devicePixelRatio || 1) + 'x';
    chip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(chip);
    setTimeout(function () { if (chip.parentNode) chip.remove(); }, 5000);
  }

  function addReleaseStamp() {
    if (document.getElementById('appReleaseStamp')) return;
    var footer = document.querySelector('.pagefoot');
    if (!footer) return;
    var now = new Date();
    var fullDate;
    try {
      fullDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(now);
    } catch (error) {
      void error;
      fullDate = now.toLocaleDateString();
    }
    var stamp = document.createElement('div');
    stamp.id = 'appReleaseStamp';
    stamp.className = 'app-release-stamp';
    stamp.setAttribute('aria-label', 'Software version, developer and current date');
    stamp.innerHTML =
      '<span class="copyright-owner">© ' + now.getFullYear() + ' Imran Ul Hasan</span>' +
      '<span aria-hidden="true">•</span><strong>Version 1.1.0</strong>' +
      '<span aria-hidden="true">•</span><span>' + fullDate + '</span>' +
      '<span aria-hidden="true">•</span><span>All rights reserved</span>';
    footer.appendChild(stamp);
  }

  var deferredInstall = null;
  function installButton() {
    var bar = document.querySelector('.topbar');
    if (!bar || document.getElementById('pwaInstallBtn')) return null;
    var button = document.createElement('button');
    button.id = 'pwaInstallBtn';
    button.className = 'pwa-install-button';
    button.type = 'button';
    button.innerHTML = '<span aria-hidden="true">⬇</span><span class="pwa-install-label">Install App</span>';
    button.title = 'Install Spatial Itqan on this device';
    button.hidden = standalone;
    bar.appendChild(button);
    button.addEventListener('click', async function () {
      if (deferredInstall) {
        deferredInstall.prompt();
        await deferredInstall.userChoice;
        deferredInstall = null;
        button.hidden = true;
        return;
      }
      var isiOS = os === 'iOS/iPadOS';
      var message = isiOS ?
        'To install Spatial Itqan: open the Share menu, then choose “Add to Home Screen”.' :
        'Installation becomes available after this site is served over HTTPS. You can also use your browser menu and choose “Install app” or “Add to Home screen”.';
      if (typeof window.toast === 'function') window.toast(message);
      else alert(message);
    });
    return button;
  }

  var pwaButton = installButton();
  addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstall = event;
    if (!pwaButton) pwaButton = installButton();
    if (pwaButton) pwaButton.hidden = false;
  });
  addEventListener('appinstalled', function () {
    body.classList.add('pwa-standalone');
    if (pwaButton) pwaButton.hidden = true;
  });

  function offlineStatus() {
    var badge = document.querySelector('.pwa-offline-badge');
    if (navigator.onLine) {
      if (badge) badge.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'pwa-offline-badge';
      badge.setAttribute('role', 'status');
      badge.textContent = 'Offline · saved app shell available';
      document.body.appendChild(badge);
    }
  }
  addEventListener('online', offlineStatus);
  addEventListener('offline', offlineStatus);
  offlineStatus();
  addDeviceChip();
  addReleaseStamp();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js').catch(function (error) {
        console.warn('Offline support was not registered:', error);
      });
    });
  }
})();
