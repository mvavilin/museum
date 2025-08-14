// Интерактивная карта в секции Contacts
export function initInteractiveMap() {
  const mapEl = document.getElementById('map');
  const mapErr = 'Не удалось загрузить карту';
  if (!L) {
    mapEl.outerHTML = mapErr;
    return
  };
  const markersCoords = [
    { lat: 48.86091, lng: 2.3364, active: true },
    { lat: 48.8602, lng: 2.3333, active: false },
    { lat: 48.8607, lng: 2.3397, active: false },
    { lat: 48.8619, lng: 2.3330, active: false },
    { lat: 48.8625, lng: 2.3365, active: false },
  ];
  const defaultCoords = markersCoords[0];
  let defaultZoom = 17;
  const maxZoom = 20;
  const map = L.map('map');
  map.setView([defaultCoords.lat, defaultCoords.lng], defaultZoom);
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: maxZoom,
    }
  ).addTo(map);
  const getIcon = (isActive) => L.icon({
    iconUrl: isActive
      ? 'assets/svg/map/marker-active.svg'
      : 'assets/svg/map/marker.svg',
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [0, -41],
  });
  markersCoords.forEach(markerCoords => {
    const customIcon = getIcon(markerCoords.active);
    L.marker([markerCoords.lat, markerCoords.lng], { icon: customIcon }).addTo(map);
  });
  const link = document.querySelector('a[href="https://leafletjs.com"]');
  if (link) { link.before('© '); link.textContent = link.textContent.trim() };
  const sourceElement = document.querySelector('.leaflet-top.leaflet-left');
  const targetElement = document.querySelector('.leaflet-top.leaflet-right');
  if (sourceElement && targetElement) {
    targetElement.innerHTML = sourceElement.innerHTML;
    sourceElement.innerHTML = '';
  }
}