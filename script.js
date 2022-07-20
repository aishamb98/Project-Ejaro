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


let http = new XMLHttpRequest();
http.open('get', 'products.json', true); 
http.send();
http.onload = function(){
      let products = JSON.parse(this.responseText); // I read the data from json file
      let output = ""; // Store all the data inside the "output" variable

      // For Loop, it reads the data inside a JSON file, 
      // so that item reads all the items for each car, and idCars calculates all the indexes for each car.
      products.forEach((item, idCars) => { 
        var dis = distance(item.Latitude, item.Longitude)

         // in #54 Here you will only call the first image and make it as the main image
         // in #55, 56, 57 Here we have called the main address, the name of the car, its model and all the data
         // in #57 Call the decimal function to shorten the number after the comma
         // in #59, 60 Here at idCars, it calculates the index for each specific car, 
         // so that each car has a page dedicated to it

      // if(dis < 50) { 

      // Above the "IF" condition when you open the comment, 
      // your requirement #1 (all cars within 50 KM from a fixed point (this can be hardcoded) can be viewed.)
            output += `
               <div class="product">
                  <img src="${item.ImgUrl[0]}" alt="${item.ImgUrl}">
                  <p class="title">${item.Make} - ${item.Model}</p>
                  <p class="description">KM Traveled : ${item.KM}</p>
                  <p class="description">Distance : ${rou(dis)}</p> 
                  <form action="details.html">
                     <input type="hidden" value=${idCars} name="ID">
                     <input class="btn" type="submit" value="تفاصيل السيارة">
                  </form>
               </div>
            `;
      //  }
      })
      document.querySelector(".products").innerHTML = output;
   
}

// --------------------------
