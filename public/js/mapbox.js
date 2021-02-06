const locations =JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken= 'pk.eyJ1Ijoicm91YmVydCIsImEiOiJja2t0Mndib3MxN2JyMm9xa3ZsY2V4aXVjIn0.uGP33Z9CbmnL5Y7tksgCNQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roubert/ckkt65czh1urn17pkyzwxrdje',
 
});

const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds,{
    padding:{
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });