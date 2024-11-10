let selectingPickupLocation = false, selectingDropLocation = false, pickupLocation, dropLocation;

const selectPickupLocation = () => {
    selectingPickupLocation = true;
    document.getElementById("selecting-pickup-location").style.display = "flex";
    document.getElementById("location-input").focus();
    //showInputSearch();
    cancelDropLocation();
}

const showInputSearch = () => {
    document.getElementById("location-search").style.height = "unset";
    document.getElementById("location-search").style.border = "2px solid red";
}

const hideInputSearch = () => {
    document.getElementsByClassName("location-search")[0].style.height = "0px";
    document.getElementById("location-search").style.border = "2px solid black";
}
const cancelPickupLocation = event => {
    selectingPickupLocation = false;
    document.getElementById("selecting-pickup-location").style.display = "none";
    //hideInputSearch();
}

const selectDropLocation = () => {
    selectingDropLocation = true;
    document.getElementById("selecting-drop-location").style.display = "flex";
    document.getElementById("location-input").focus();
    //showInputSearch();
    cancelPickupLocation();
}

const cancelDropLocation = event => {
    selectingDropLocation = false;
    document.getElementById("selecting-drop-location").style.display = "none";
    //hideInputSearch();
}

const selectLocation = () => {
    cancelPickupLocation();
    cancelDropLocation();
    marker.closePopup();
}
const handleLocationTextChange = event => {
    if(event.target.value == "") cancelTextSearch();
    //Search for similar locations
    if(event.target.value != "") geocode(event.target.value);
}

const cancelTextSearch = event => {
    /**
     * Clear the available locations
     * Hide the component;
     */
    document.getElementById('locationResults').innerHTML = '';
    document.getElementById('locationResults').style.display = "none";
}

function geocode(location) {
    var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(location);
    var xhr = new XMLHttpRequest();

    document.getElementById('locationResults').style.display = "block";
    document.getElementById('locationResults').innerHTML = "";
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                if (data && data.length > 0) {
                    var resultHtml = '';

                    for (var i = 0; i < data.length; i++) {
                        var place = data[i];
                        resultHtml += '<li onclick="selectPlace(' + place.lat + ', ' + place.lon + '); return false;">' + place.display_name + '</li>';
                    }

                    document.getElementById('locationResults').innerHTML = resultHtml;
                } else {
                    document.getElementById('locationResults').innerHTML = 'Location not found.';
                }
                /**
                 * After updating the results make the component appear;
                 */
                 document.getElementById('locationResults').style.display = "block";
            } else {
                console.error('Error:', xhr.status);
                document.getElementById('result').innerHTML = 'An error occurred. Please try again later.';
            }
        }
    };

    xhr.send();
}

const logisticsEstimate = (distance, rate) => {
    document.getElementById("distance").innerHTML = distance + " m";
    document.getElementById("vehicle-rate").innerHTML = "Ksh. " + rate;
    document.getElementById("estimated-cost").innerHTML = "Ksh. "+ distance*rate;
}