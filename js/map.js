var map, infoWindow, currentLocation, suggestedLocation;

var positionVallen = {
    lat: 61.485061,
    lng: 16.250644
};

function removeSuggestedLocation() {
    $('.remove-suggested-location-button').hide()
    suggestedLocation.setMap(null);
}

function initMap() {
    // Try HTML5 geolocation.
    infoWindow = new google.maps.InfoWindow;

    suggestedLocation = new google.maps.Marker({
        title: 'Föreslagen ny plats',
        icon: 'images/font-awesome_4-7-0_map-signs_32.png',
        draggable:true
    });

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: 'satellite',
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    map.setCenter(positionVallen);

    map.addListener('click', function(event) {
        suggestedLocation.setMap(map);
        suggestedLocation.setPosition(event.latLng);
        $('.remove-suggested-location-button').show()
    });

    var legend = document.getElementById('legend');
    legend.style.display = 'block';
    var div = document.createElement('div');
    div.innerHTML = '<img src="images/font-awesome_4-7-0_map-marker_32.png"> Aktuell plats';
    legend.appendChild(div);
    div = document.createElement('div');
    div.innerHTML = '<img src="images/font-awesome_4-7-0_map-signs_32.png"> Föreslagen ny plats';
    legend.appendChild(div);
    div = document.createElement('div');
    div.className = "remove-suggested-location-button";
    div.innerHTML = '<input onclick="removeSuggestedLocation();" type=button value="Ta bort föreslagen plats">';
    legend.appendChild(div);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);

            // currentLocation.setPosition(pos)
            currentLocation = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: pos,
                map: map,
                title: 'Aktuell plats',
                icon: 'images/font-awesome_4-7-0_map-marker_32.png',
                draggable:true
            });

            infoWindow.setPosition(pos);
//                infoWindow.setContent('Location found.');
//                infoWindow.open(map);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        }, options);
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
