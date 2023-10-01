// ---- STYLING FUNCTIONS ----
// Style of the polygon
function style(feature) {
    return {
        fillColor: '#e97676',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}

// ---- INTERACTION FUNCTIONS ----
// Highlight a polygon when targetted by the mouse
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

    layer.bringToFront();
}

// Reset the layer style to its default state
function resetHighlight(e) {
    // geojson.resetStyle(e.target);
    // Do not use reset style if the polygon must change color
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    })
}


// Quiz function
function quiz(e) {
    var countryName = prompt("Nom du pays ?");
    var layer = e.target;
    layer.bringToFront();
    var trueAnswer = layer.feature.properties.name_fr.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    === countryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    if (trueAnswer) {
        layer.setStyle({
            fillColor: '#36a429',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 1
        });
        info.update(count);
    }

    else{
        alert("Faux, c'était " + layer.feature.properties.name_fr)
        layer.setStyle({
            fillColor: '#ff0000',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 1
        });
    }
}

// Now we’ll use the onEachFeature option to add the listeners on our state layers:
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name_fr) {
        // layer.bindPopup(feature.properties.name_fr + "<br>" + feature.properties.name);
        // uncomment if you need a popup
    }
    // layer.bindTooltip(feature.properties.name_fr.toString(), {noHide: true});
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: quiz
    });
}
