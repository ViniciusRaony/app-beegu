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

// Campo 'Digite o endereço de início' irá puxar localização atual do usuário
function getGeolocation() {
  if (navigator.geolocation) {
    // Verifica se a permissão já foi concedida
    navigator.permissions.query({name:'geolocation'}).then(function(permissionStatus) {
      if (permissionStatus.state === 'granted') {
        navigator.geolocation.getCurrentPosition(function(position) {
          // Código para obter o endereço a partir da posição atual
          const geocoder = new google.maps.Geocoder();
          const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          geocoder.geocode({ 'location': latLng }, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                const address = results[0].formatted_address;
                // faça algo com o endereço, como exibir na tela ou enviar para o servidor
              } else {
                alert('Não foi encontrado nenhum resultado para as coordenadas informadas.');
              }
            } else {
              alert('Não foi possível converter as coordenadas em um endereço legível.');
            }
          });
        }, function() {
          alert('Não foi possível obter a sua localização atual.');
        });
      } else if (permissionStatus.state === 'prompt') {
        // Ainda não foi concedida permissão, exibe uma mensagem pedindo para que o usuário habilite a localização
        alert('Por favor, habilite a sua localização para usar esta funcionalidade.');
      } else {
        // A permissão foi negada, exibe um campo para que o usuário insira manualmente o endereço de início
        document.getElementById('start').disabled = false;
      }
    });
  } else {    
    alert('O seu navegador não suporta a API Geolocation.');
  }
}

// Chama a função getGeolocation() quando a página é carregada
window.onload = function() {
  getGeolocation();
};



