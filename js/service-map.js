// Paragon Premiere — real interactive service-area map
// Uses Leaflet + CartoDB Positron tiles (free, no API key) and Turf.js to
// merge four approximate county outlines into one shaded territory.

document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('serviceMap');
  if (!el || typeof L === 'undefined') return;

  var map = L.map('serviceMap', {
    scrollWheelZoom: false,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // Approximate county outlines (not survey-accurate — stylized for a clean
  // territory graphic, GeoJSON [lng, lat] winding order).
  var counties = [
    { name: 'Salt Lake County', coords: [[-112.20,40.85],[-111.87,40.85],[-111.63,40.68],[-111.65,40.47],[-111.95,40.40],[-112.20,40.52],[-112.20,40.85]] },
    { name: 'Utah County', coords: [[-111.65,40.47],[-111.44,40.40],[-111.45,40.00],[-111.75,39.93],[-111.95,40.10],[-111.95,40.30],[-111.85,40.47],[-111.65,40.47]] },
    { name: 'Summit County', coords: [[-111.65,41.00],[-110.90,41.00],[-110.85,40.65],[-111.10,40.55],[-111.50,40.60],[-111.63,40.68],[-111.65,41.00]] },
    { name: 'Wasatch County', coords: [[-111.50,40.60],[-111.10,40.55],[-111.05,40.20],[-111.20,40.05],[-111.50,40.15],[-111.55,40.40],[-111.50,40.60]] },
  ];

  var polygons = counties.map(function (c) {
    return turf.polygon([c.coords]);
  });

  // Turf 6.5.0's union() takes two Polygon/MultiPolygon features directly
  // (this signature changed in Turf 7, which instead expects a single
  // FeatureCollection argument — do not "upgrade" this call without also
  // bumping the CDN version above).
  var territory = polygons[0];
  try {
    for (var i = 1; i < polygons.length; i++) {
      territory = turf.union(territory, polygons[i]);
    }
  } catch (e) {
    territory = turf.featureCollection(polygons);
  }

  var territoryLayer = L.geoJSON(territory, {
    style: {
      color: '#8A8C79',
      weight: 2,
      opacity: 0.9,
      fillColor: '#8A8C79',
      fillOpacity: 0.16,
    },
  }).addTo(map);

  function pinIcon(hq) {
    var color = hq ? '#F4D185' : '#303030';
    var stroke = hq ? '#303030' : 'none';
    var svg = '<svg width="26" height="34" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9zm0 12.5A3.5 3.5 0 1112 5.5a3.5 3.5 0 010 7z" ' +
      'fill="' + color + '" stroke="' + stroke + '" stroke-width="0.6" fill-rule="evenodd"/></svg>';
    return L.divIcon({
      className: 'leaflet-pin-icon' + (hq ? ' leaflet-pin-hq' : ''),
      html: svg,
      iconSize: [26, 34],
      iconAnchor: [13, 32],
      popupAnchor: [0, -30],
    });
  }

  var cities = [
    { name: 'Salt Lake City', lat: 40.7608, lng: -111.8910, hq: true },
    { name: 'Holladay', lat: 40.6663, lng: -111.8241 },
    { name: 'Millcreek', lat: 40.6885, lng: -111.8280 },
    { name: 'Cottonwood Heights', lat: 40.6197, lng: -111.8016 },
    { name: 'Sandy', lat: 40.5649, lng: -111.8389 },
    { name: 'Draper', lat: 40.5246, lng: -111.8638 },
    { name: 'Bountiful', lat: 40.8893, lng: -111.8808 },
    { name: 'Park City', lat: 40.6461, lng: -111.4980 },
    { name: 'Deer Valley', lat: 40.6374, lng: -111.4783 },
    { name: 'Jeremy Ranch', lat: 40.7376, lng: -111.5486 },
    { name: 'Kamas', lat: 40.6427, lng: -111.2833 },
    { name: 'Heber City', lat: 40.5069, lng: -111.4133 },
    { name: 'Midway', lat: 40.5135, lng: -111.4766 },
    { name: 'Alpine', lat: 40.4535, lng: -111.7716 },
    { name: 'Highland', lat: 40.4227, lng: -111.7958 },
    { name: 'Lehi', lat: 40.3916, lng: -111.8508 },
    { name: 'American Fork', lat: 40.3769, lng: -111.7958 },
    { name: 'Provo', lat: 40.2338, lng: -111.6585 },
  ];

  cities.forEach(function (c) {
    L.marker([c.lat, c.lng], { icon: pinIcon(!!c.hq) })
      .addTo(map)
      .bindPopup(c.hq ? '<strong>' + c.name + '</strong><br>Home base' : c.name);
  });

  map.fitBounds(territoryLayer.getBounds(), { padding: [24, 24] });

  // Re-enable scroll zoom only once the person interacts with the map,
  // so page-scroll isn't hijacked while browsing.
  map.once('focus', function () { map.scrollWheelZoom.enable(); });
  el.addEventListener('click', function () { map.scrollWheelZoom.enable(); });
});
