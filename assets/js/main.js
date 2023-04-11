var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: -8.0539, lng: -34.8811}
    });
}

function buscarRotas() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
  
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map);
      } else {
        if (status === "ZERO_RESULTS") {
          alert("Não foi possível encontrar uma rota entre esses pontos.");
        } else if (status === "INVALID_REQUEST") {
          alert("Solicitação de rota inválida.");
        } else if (status === "OVER_QUERY_LIMIT") {
          alert("A cota de uso da API foi excedida.");
        } else if (status === "REQUEST_DENIED") {
          alert("A solicitação foi negada. Verifique a chave da API.");
        } else if (status === "UNKNOWN_ERROR") {
          alert("Ocorreu um erro desconhecido.");
        } else {
          alert("Ocorreu um erro ao buscar as rotas.");
        }
      }
    });
}

// INSTALADO O DOTENV npm install dotenv
// require('dotenv').config();

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDk85nEstYPj-JBpd748eoIynqlCre-8hQ&callback=initMap`;
script.async = true;
script.defer = true;

document.head.appendChild(script);









