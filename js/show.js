// Try HTML5 geolocation.

var markers = [];
var dotColors = {
    1: 'blue',
    2: 'purple',
    3: 'pink',
    4: 'red',
    5: 'yellow',
    6: 'green'
}

function initMap() {
    initBaseMap(false);
    window.map.setZoom(12);
    addMarkers(window.map);
}

function onGetCurrentPosition(position) {
    window.map.setCenter(position);
}

function addMarkers(map) {
    $.get('https://script.google.com/macros/s/AKfycbwOX05ZOSZ_ruANDraXpLGUtb-YyZsHnthkucmIJauGXk6sMgI/exec', function( data ) {
        for (var i = 0; i < data.length; i++) {
            console.log
            var markerItem = data[i];
            addMarkerWithTimeout(markerItem, i * 200, map)
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

function addMarkerWithTimeout(markerItem, timeout, map) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: {
                lat: markerItem.latitude,
                lng: markerItem.longitude
            },
            title: '' + markerItem.number,
            icon: 'images/' + dotColors[markerItem.area] + '-dot.png',
            map: map,
            animation: google.maps.Animation.DROP
        }));
    }, timeout);
}
