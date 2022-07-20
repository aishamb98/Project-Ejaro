window.addEventListener('load', () => { // Here we read all the indexes of cars and know them
    const params = (new URL(document.location)).searchParams;
    const ID = params.get('ID');
    det(ID)
})

// --------------------------------------------------
// Here is a code from the internet for the distance law
function distance(lat1, lon1) {
    const lat2 = 21.713637
    const lon2 = 39.101741
 
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
 
        return dist;
    }
 } // the end of the law
 
 
 function rou(dis){ // Function to be after the decimal number two digits
    let rounded = dis.toFixed(2);
    return rounded;
 }
 

function det(ID) {
    let http = new XMLHttpRequest();
    http.open('get', 'products.json', true);
    http.send();
    http.onload = function(){
    let products = JSON.parse(this.responseText); // I read the data from json file
    let output = ""; // Store all the data inside the "output" variable
    var dis = distance(products[ID].Latitude, products[ID].Longitude) // Calling the Latitude and Longitude for each car and calculating them in the dis function
    
    // Below, all car information is read according to the index 
    // in #61 Here you will only call the first image and make it as the main image
    // in #64-70 All images are read and displayed on small images below the main image
    // in #75-79 Here we have called the main address, the name of the car, its model and all the data
    // in #77 Call the decimal function to shorten the number after the comma
    // in #81-82 Here at idCars, it calculates the index for each specific car, 
    // so that each car has a page dedicated to it

    output += `
        <div class="product">
            <div class="single-pro-img">
                  <img src="${products[ID].ImgUrl[0]}" alt="${products[ID].ImgUrl}"  id="MainImg">
                <div class="single-pro-group">
                    `
                    products[ID].ImgUrl.forEach((element, indexID) => {
                    output += `
                    <div class="single-pro-col">
                        <img src="${element}" + alt="${products[ID].ImgUrl[indexID]}"  class="smallImg" onclick="clickSmall()"></img>
                    </div>
                    `
                    });
                    output += `
                </div>
            </div>
                <div class="single-pro-details">
                  <p class="title">${products[ID].Make} - ${products[ID].Model}</p>
                  <p class="description">KM Traveled : ${products[ID].KM}</p>
                  <p class="description">Distance : ${rou(dis)}</p>
                  <p class="description">Description : ${products[ID].description}</p>
                  <p class="description">Color : ${products[ID].color}</p>
                  <form id="btnToCarDetails" action="booking.html">
                     <input type="hidden" value=${ID} name="ID">
                     <input class="btn" type="submit" value="احجز الان">
                  </form>
                </div>
        </div>
            `;
        document.querySelector(".products").innerHTML = output;
    }
}

// ------------------------------------------

function clickSmall(){ // At first, you have to double click on the first image to show it
    console.log("asd")
let col = document.getElementsByClassName("smallImg"); // It calls small pictures

    for(var i=0 ; i < col.length; i++){ // Here it calculates the index for all its images and shows them
        col[i].addEventListener('click', function(){
            if(col.length > 0){
                col[0].classList.remove('smallImg')
            }
            this.classList.add('smallImg')
            document.getElementById('MainImg').src = this.src
        })
    }
}