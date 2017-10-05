
var map;
var markers = [];

var positionVallen = {
    lat: 61.485061,
    lng: 16.250644
};

// Try HTML5 geolocation.
function initMap() {

    var infoWindow = new google.maps.InfoWindow;
    map = new google.maps.Map(document.getElementById('map'), {
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

    map.setCenter(positionVallen);
    addMarkers();
}

function addMarkers() {
    $.get('https://script.google.com/macros/s/AKfycbwOX05ZOSZ_ruANDraXpLGUtb-YyZsHnthkucmIJauGXk6sMgI/exec', function( data ) {
        for (var i = 0; i < data.length; i++) {
            var markerItem = data[i];
            addMarkerWithTimeout(markerItem, i * 200)
        }
        // var markers = data.map(function(markerItem, i) {
        //     return new google.maps.Marker({
        //         position: {
        //             lat: markerItem.latitude,
        //             lng: markerItem.longitude
        //         },
        //         title: '' + markerItem.number,
        //         // icon: 'images/font-awesome_4-7-0_map-marker_32.png',
        //         // map: map,
        //     });
        // });
        //
        // console.log(markers);
        // var markerCluster = new MarkerClusterer(map, markers,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    });
}

function addMarkerWithTimeout(markerItem, timeout) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: {
                lat: markerItem.latitude,
                lng: markerItem.longitude
            },
            title: '' + markerItem.number,
            icon: 'images/font-awesome_4-7-0_map-marker_32.png',
            map: map,
            animation: google.maps.Animation.DROP
        }));
    }, timeout);
}
