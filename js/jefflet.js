// set up the map
var map = L.map('map').setView([-20.82771, -49.39199], 15);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([-20.82771,-49.39199]).addTo(map);
marker.bindPopup("<b>Olá!</b><br>Esta é nossa casa.").openPopup();

function onEachFeature(feature, layer) {
  var html = "";

  if (feature.properties) {
    if (feature.properties.nome) {
      html += feature.properties.nome + "<br>";
    }
    if (feature.properties.valor) {
      html += "<b>R$ " + feature.properties.valor + "</b><br>";
    }
    if (feature.properties.site) {
      html += "<a href='" + feature.properties.site + "' target='_blank'>Link</a>";
    }
  }

  layer.bindPopup(html);
}

L.geoJson.ajax("imoveis.json", {
  style: function(feature) {
    switch (feature.properties.tipo) {
      case 'Casa': return {color: "#ff0000"};
      case 'Apartamento':   return {color: "#0000ff"};
    }
  },
  filter: function(feature, layer) {
    return feature.properties.valor;
  },
  onEachFeature: onEachFeature
}).addTo(map);
