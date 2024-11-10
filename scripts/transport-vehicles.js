let transportVehicles = [];
const getTransportVehicles = () => {
    /**
     * Fetch transport vehicles from the server;
     */
    const API_ENDPOINT = "../server/transport-vehicles.php";
    const request = new XMLHttpRequest();

    request.open("GET", API_ENDPOINT, true);
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            //console.log(request.response);
            //console.log(JSON.parse(request.response));
            
            transportVehicles = JSON.parse(request.response);
            console.log(transportVehicles);
            updateTransportVehicles(transportVehicles);
        }
    }
    request.send();
}
getTransportVehicles();

const getTransportVehicle = packages => {
    if(packages.length == 0) return;

    let formData = new FormData();

    formData.append("packages", JSON.stringify(packages));

    const API_ENDPOINT = "../server/transport-vehicle.php";
    const request = new XMLHttpRequest();

    request.open("POST", API_ENDPOINT, true);
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            console.log(request.response);
            selectedVehicle = JSON.parse(request.response);
        }
    }
    request.send(formData);
}

const updateTransportVehicles = vehicles => {
    let vehiclesContainer = document.getElementById("vehiclesContainer");

    /**
     * To add slides, use swiper methods;
     */
    let innerHTML = ``;
    swiper3.removeAllSlides();

    vehicles.forEach((vehicle, index) => {
        innerHTML = `
        <div class="swiper-slide">
                <div class="swiper4">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->`;
                        vehicle.images.forEach((image, index2) => {
                            innerHTML += `
                                <div class="swiper-slide">
                                    <div class="vehicle-image">
                                        <div title="Next image" class="navigate-right" onclick="nextImage(${index})"><div></div></div>
                                        <div title="Previous vehicle" class="navigate-top" onclick="prevVehicle()"><div></div></div>
                                        <div title="Next vehicle" class="navigate-bottom" onclick="nextVehicle()"><div></div></div>
                                        <div title="Previous image" class="navigate-left" onclick="prevImage(${index})"><div></div></div>
                                        <img src="..${image.path}" />
                                    </div>
                                </div>`;
                        })
                    innerHTML += `
                    </div>
                <!-- If we need pagination -->
                <!-- <div class="swiper-pagination"></div> -->
                
                <!-- If we need navigation buttons -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div> -->
                
                <!-- If we need scrollbar -->
                <!-- <div class="swiper-scrollbar"></div> -->
            </div>
        </div>`;
        swiper3.appendSlide(innerHTML);
    });

    /**
     * initialize swiper;
     */
    swiper4 = new Swiper('.swiper4', {
        // Optional parameters
        speed:600,
        spaceBetween:10,
        slidesPerView:1,
        direction: 'horizontal',
        loop: true,
        // If we need pagination
        //allowTouchMove:false,
        pagination: {
        el: '.swiper-pagination',
        clickable:true,
        },
    
        // Navigation arrows
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
    
        // And if we need scrollbar
        scrollbar: {
        el: '.swiper-scrollbar',
        },
    
    });
}

