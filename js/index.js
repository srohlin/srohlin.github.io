var currentLocation, suggestedLocation, mousedown;

function moveCurrentLocation() {
    currentLocation.setPosition(window.map.getCenter());
}

function addSuggestedLocation() {
    // $('.add-suggested-location-button').hide();
    // $('.remove-suggested-location-button').show();
    var suggestedPosition = {
        lat: window.map.getCenter().lat() - 0.0003,
        lng: window.map.getCenter().lng() - 0.0003,

    }
    suggestedLocation.setPosition(suggestedPosition);
    suggestedLocation.setMap(window.map);
}

function removeSuggestedLocation() {
    // $('.remove-suggested-location-button').hide();
    // $('.add-suggested-location-button').show();
    suggestedLocation.setMap(null);
}

// Try HTML5 geolocation.
function initMap() {

    initBaseMap(true);
    if (window.map.getCenter().lat().toFixed(6) == window.positions['vallen'].lat.toFixed(6) &&
        window.map.getCenter().lng().toFixed(6) == window.positions['vallen'].lng.toFixed(6)) {
        window.map.setZoom(16);
    }
    window.map.controls[google.maps.ControlPosition.TOP_CENTER].push(createControl());
    window.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(createLegend());

    currentLocation = new google.maps.Marker({
        title: 'Nuvarande passplacering',
        map: window.map,
        position: window.map.getCenter(),
        icon: 'images/red-dot.png',
        animation: google.maps.Animation.DROP,
        draggable:true
    });

    suggestedLocation = new google.maps.Marker({
        title: 'Föreslagen ny passplacering',
        icon: 'images/yellow-dot.png',
        draggable:true
    });

}
function onGetCurrentPosition(position) {
    window.map.setCenter(position);
    currentLocation.setPosition(position);
}

function createControl() {
    var control = document.getElementById('map-control');
    control.style.display = 'block';
    var html = '<div class="btn-group" role="group">'
    html += '<a class="btn btn-default btn-sm" onclick="moveCurrentLocation();" role="button">' +
        '<span class="glyphicon glyphicon-screenshot"></span>' +
        '&nbsp;Centrera nuvarande passplacering</a>';
    // html += '<a class="btn btn-default btn-sm add-suggested-location-button" onclick="addSuggestedLocation();" role="button">' +
    //     '<span class="glyphicon glyphicon-move"></span>' +
    //     '&nbsp;Föreslå ny plats</a>';
    // html += '<a class="btn btn-default btn-sm remove-suggested-location-button" onclick="removeSuggestedLocation();" role="button">' +
    //     '<span class="glyphicon glyphicon-trash"></span>' +
    //     '&nbsp;Ta bort föreslagen plats</a>';
    html += '</div>'
    control.innerHTML = html;
    return control;
}

function createLegend() {
    var legend = document.getElementById('map-legend');
    legend.style.display = 'block';
    var html = '<div><img src="images/red-dot.png">&nbsp;Nuvarande passplacering</div>';
    html += '<div><img src="images/yellow-dot.png">&nbsp;Ny föreslagen passplacering</div>';
    legend.innerHTML = html;
    return legend;
}

$(function() {
    $('#name').val(docCookies.getItem("reporter-name"));
    $('[data-toggle]').focus(function() {
        $(this).parent().addClass('toggle-focus'); //.find('.toggle-on')
    });
    $('[data-toggle]').blur(function() {
        $(this).parent().removeClass('toggle-focus');
    });
    $('#move').change(function(event) {
        if(this.checked) {
            $('.move-help-text').show();
            addSuggestedLocation();
        } else {
            $('.move-help-text').hide();
            removeSuggestedLocation();
        }
    })
});
