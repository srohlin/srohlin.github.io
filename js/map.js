window.latitudeMax = 61.517228;
window.latitudeMin = 61.471444;

window.longitudeMax = 16.368347;
window.longitudeMin = 16.130670;

window.positions = {};
window.positions['vallen'] = {
    lat: 61.485061,
    lng: 16.250644
};


function createMap() {

    return new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
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


