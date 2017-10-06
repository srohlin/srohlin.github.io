var currentLocation, suggestedLocation, mousedown;

function removeSuggestedLocation() {
    $('.remove-suggested-location-button').hide();
    $('.add-suggested-location-button').show();
    suggestedLocation.setMap(null);
}

function addSuggestedLocation() {
    $('.add-suggested-location-button').hide();
    $('.remove-suggested-location-button').show();
    suggestedLocation.setPosition(window.map.getCenter());
    suggestedLocation.setMap(window.map);
}


// Try HTML5 geolocation.
function initMap() {
    var currentPosition = window.positions['vallen'];

    var infoWindow = new google.maps.InfoWindow;
    window.map = createMap();
    window.map.setCenter(currentPosition);
    window.map.controls[google.maps.ControlPosition.TOP_CENTER].push(createControl());
    window.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(createLegend());

    currentLocation = new google.maps.Marker({
        title: 'Aktuell plats',
        position: currentPosition,
        map: window.map,
        icon: 'images/red-dot.png',
        animation: google.maps.Animation.DROP,
        draggable:true
    });

    suggestedLocation = new google.maps.Marker({
        title: 'Föreslagen ny plats',
        icon: 'images/yellow-dot.png',
        draggable:true
    });


    window.map.setCenter(window.positions['vallen']);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            window.map.setCenter(pos);
            currentLocation.setPosition(pos);
            infoWindow.setPosition(pos);
        }, function() {
            handleLocationError(true, infoWindow, window.map.getCenter());
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, window.map.getCenter());
    }
}

function createControl() {
    var control = document.getElementById('map-control');
    control.style.display = 'block';
    var html = '<div class="btn-group" role="group">'
    html += '<a class="btn btn-default btn-sm add-suggested-location-button" onclick="addSuggestedLocation();" href="#" role="button">' +
        '<span class="glyphicon glyphicon-move"></span>' +
        '&nbsp;Föreslå ny plats</a>';
    html += '<a class="btn btn-default btn-sm remove-suggested-location-button" onclick="removeSuggestedLocation();" href="#" role="button">' +
        '<span class="glyphicon glyphicon-trash"></span>' +
        '&nbsp;Ta bort föreslagen plats</a>';
    html += '</div>'
    control.innerHTML = html;
    return control;
}

function createLegend() {
    var legend = document.getElementById('legend');
    legend.style.display = 'block';
    var html = '<div><img src="images/red-dot.png"> Aktuell plats</div>';
    html += '<div><img src="images/yellow-dot.png"> Föreslagen ny plats</div>';
    legend.innerHTML = html;
    return legend;
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Fel: Lyckades inte läsa in din plats.' :
        'Fel: Din webbläsare vill inte dela med sig av din plats.');
    infoWindow.open(window.map);
}
