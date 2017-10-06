window.latitudeMax = 61.517228;
window.latitudeMin = 61.471444;

window.longitudeMax = 16.368347;
window.longitudeMin = 16.130670;

window.positions = {};
window.positions['vallen'] = {
    lat: 61.485061,
    lng: 16.250644
};


function initBaseMap(centerOnLocation) {
    window.map = createMap();
    var infoWindow = new google.maps.InfoWindow;
    infoWindow.setPosition(window.map.getCenter());

    window.map.setCenter(window.positions['vallen']);

    if (!centerOnLocation) {
        return;
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            if (position.coords.latitude > window.latitudeMin &&
                position.coords.latitude > window.latitudeMax &&
                position.coords.longitude > window.longitudeMin &&
                position.coords.longitude < window.longitudeMax) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                onGetCurrentPosition(pos)
            } else {
                handleLocationError('Du är just nu utanför området, centrerar kartan på Vallen', infoWindow, window.map.getCenter());
            }
        }, function() {
            handleLocationError('Fel: Lyckades inte läsa in din plats.', infoWindow, window.map.getCenter());
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError('Fel: Din webbläsare vill inte dela med sig av din plats.', infoWindow, window.map.getCenter());
    }
}

function createMap() {

    return new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
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

}

function handleLocationError(content, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(content);
    infoWindow.open(window.map);
}

