let packages = [];
let description, length, width, height, weight, units, activePackage;

const editPackage = package => {
    //First show the popup
    //Just that;
    let popup = document.getElementsByClassName("popup")[0];
    if(package == undefined){
        //Close the popup
        document.getElementsByClassName("package-form")[0].reset();
        activePackage = undefined;
        popup.style.visibility = "hidden";
        popup.style.zIndex = "-10";
    } else {
        //If it editing the 
        activePackage = package;

        /** Fill the form */
        if(package !== true){
            document.getElementById("description-input").value = packages[activePackage].description;
            document.getElementById("package-length-input").value = packages[activePackage].length;
            document.getElementById("package-width-input").value = packages[activePackage].width;
            document.getElementById("package-height-input").value = packages[activePackage].height;
            document.getElementById("package-weight-input").value = packages[activePackage].weight;
            document.getElementById("package-units-input").value = packages[activePackage].units;
    
            description = packages[activePackage].description;
            length = packages[activePackage].length;
            width = packages[activePackage].width;
            height = packages[activePackage].height;
            weight = packages[activePackage].weight;
            units = packages[activePackage].units;
        }

        popup.style.visibility = "visible";
        popup.style.zIndex = "10";
    }
}

const handleDescriptionChange = event => {
    description = event.target.value;
    document.getElementById("description-error").innerHTML = "";
}

const handleLengthChange = event => {
    length = event.target.value;
    document.getElementById("length-error").innerHTML = "";
}

const handleWidthChange = event => {
    width = event.target.value;
    document.getElementById("width-error").innerHTML = "";
}

const handleHeightChange = event => {
    height = event.target.value;
    document.getElementById("height-error").innerHTML = "";
}

const handleWeightChange = event => {
    weight = event.target.value;
    document.getElementById("weight-error").innerHTML = "";
}

const handleUnitsChange = event => {
    units = event.target.value;
    document.getElementById("units-error").innerHTML = "";
}

const handlePackageUpload = event => {
    event.preventDefault();
    let canAddPackage = true;
    //Only signedin users can upload vehicles
    //if(credentials == null || credentials == undefined) return;

    //Category is required
    //If it editing the 
    if(description == undefined || description == ""){
        canAddPackage = false;
        document.getElementById("description-error").innerHTML = "Description is required!";
    }

    if(length == undefined || length == ""){
        canAddPackage = false;
        document.getElementById("length-error").innerHTML = "Length is required!";
    }
    
    if(width == undefined || width == ""){
        canAddPackage = false;
        document.getElementById("width-error").innerHTML = "Width is required!";
    }
    
    if(height == undefined || height == ""){
        canAddPackage = false;
        document.getElementById("height-error").innerHTML = "Height is required!";
    }
    
    if(weight == undefined || weight == ""){
        canAddPackage = false;
        document.getElementById("weight-error").innerHTML = "Weight is required!";
    }
    
    if(units == undefined || units == ""){
        canAddPackage = false;
        document.getElementById("units-error").innerHTML = "Units are required!";
    }

    if(canAddPackage){
        if(activePackage !== true && activePackage !== undefined){
            packages[activePackage] = {
                description,
                length,
                width,
                height,
                weight,
                units
            }
        } else 
        packages = packages.concat({
            description,
            length,
            width,
            height,
            weight,
            units
        });

        //console.log(packages);
        getTransportVehicle(packages);
        updatePackages(packages);
        editPackage();
    }
}


const deletePackage = index => {
    packages.splice(index, 1);
    updatePackages(packages);
    console.log(packages);
}

const updatePackages = packages => {

    let innerHTML = `
        <thead></thead>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Description</th>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Units</th>
                </tr>`;

    packages.forEach((package, index) => {
        innerHTML += `
            <tr>
                <th>${index+1}</th>
                <td>${package.description}</td>
                <td>${package.length}</td>
                <td>${package.width}</td>
                <td>${package.height}</td>
                <td>${package.weight}</td>
                <td>${package.units}</td>
                <td><button class="edit-button" onclick="editPackage(${index})">Edit</button></td>
                <td><button class="delete-button" onclick="deletePackage(${index})">Delete</button></td>
            </tr>
        `;
    });

    innerHTML += `
     </tbody>
    `;


    document.getElementById("packages-table").innerHTML = innerHTML;
}