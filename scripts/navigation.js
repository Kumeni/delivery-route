let selectedVehicle;
const slideTo = index => {
    if(index == 0){
        swiper.slideTo(index);

        if(swiper2.activeIndex == 0){
            document.getElementById("step").innerHTML = "Step 1:";
        document.getElementById("step-title").innerHTML = "Uploading Packages";
        } else if (swiper2.activeIndex == 1){
            document.getElementById("step").innerHTML = "Step 1:";
            document.getElementById("step-title").innerHTML = "Selecting Transport Vehicle";
        }
    } else if(index == 1 && selectedVehicle != undefined){
        swiper.slideTo(index);

        document.getElementById("step").innerHTML = "Step 2:";
        document.getElementById("step-title").innerHTML = "Selecting Pickup and Drop Locations";
    } else if(index == 2 && distance !== undefined){
        swiper.slideTo(index);

        document.getElementById("step").innerHTML = "Step 3:";
        document.getElementById("step-title").innerHTML = "Logistics estimations";
    }

    updateCircles(index);
}

const uploadingPackages = () => {
    swiper2.slideTo(0);

    if(packages.length == 0){
        selectedVehicle = undefined;
    } else {
        getTransportVehicle(packages);
    }

    /**
     * Show the active button
     */
    document.getElementById("select-vehicle-button").classList.remove("active");
    document.getElementById("upload-package-button").classList.add("active");

    document.getElementById("step").innerHTML = "Step 1:";
    document.getElementById("step-title").innerHTML = "Uploading Packages";
}

const selectingVehicles = () => {
    swiper2.slideTo(1);
    selectedVehicle = transportVehicles[swiper3.activeIndex];
    
    /**
     * Show the active button
     */
    document.getElementById("select-vehicle-button").classList.add("active");
    document.getElementById("upload-package-button").classList.remove("active");

    document.getElementById("step").innerHTML = "Step 1:";
    document.getElementById("step-title").innerHTML = "Selecting Transport Vehicle";
}

const updateCircles = (index)=> {
    let circles = document.getElementsByClassName("progress")[0].getElementsByClassName("circle"), i;

    for(i=0; i<circles.length; i++){
        if(i <= index){
            circles[i].style.backgroundColor = "green";
        } else {
            circles[i].style.backgroundColor = "white";
        }
    }
}

const nextVehicle = index => {
    swiper3.slideNext();
}

const prevVehicle = index => {
    swiper3.slidePrev();
}

const nextImage = (index) => {
    swiper4[index].slideNext();
}

const prevImage = (index) => {
    swiper4[index].slidePrev();
}


const updateVehicleDetails = vehicle => {

    selectedVehicle = vehicle;

    document.getElementById("number-plate").innerHTML = vehicle.number_plate;
    document.getElementById("description").innerHTML = vehicle.description;
    document.getElementById("length").innerHTML = vehicle.storage_length + " m";
    document.getElementById("width").innerHTML = vehicle.storage_width + " m";
    document.getElementById("height").innerHTML = vehicle.storage_height + " m";
    document.getElementById("weight").innerHTML = vehicle.maximum_weight+ " kg";
    document.getElementById("rate-per-km").innerHTML = "Ksh. " +vehicle.rate_per_km;
}