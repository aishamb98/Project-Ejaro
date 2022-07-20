window.addEventListener('load', () => { // Here we read all the indexes of cars and know them
    const params = (new URL(document.location)).searchParams;
    const ID = params.get('ID');
    det(ID)
})


// SEND BOOK
function valueSender() {
    let Name = document.forms["myForm"]["name"].value;
    let Emil = document.forms["myForm"]["email"].value;
    let In = document.forms["myForm"]["checkin"].value;
    let Out = document.forms["myForm"]["checkout"].value;

    // Error message when leaving any space empty
    if (Name == "") {
        alert("Name must be filled out");
        return false;
    } if (Emil == "") {
        alert("Emil must be filled out");
        return false;
    } if (In == "") {
        alert("checkin must be filled out");
        return false;
    } if (Out == "") {
        alert("checkout must be filled out");
        return false;
    }

    // Here below, a thank you message appears upon completion of the reservation
    var a = 0;
    localStorage.setItem("myValue", a)
    window.location.href = "thank-you.html";     // Here you go to the thank you page when you're done
    document.getElementById("bookGo").disabled = true;
}


function det(ID) {
    // Here we will calculate the initial and final reservation dates
    var currentDateTime = new Date(); // Calculates the current day's date
    date = currentDateTime.getDate();
    console.log(currentDateTime.getDate())
    month = currentDateTime.getMonth()+1; // I increased the number 1 because the index of the month starts with zero

    // Below I made an IF condition to add a zero number to the date format. It is correct
    if (date < 10) {
        date = '0' + date;
    }
    if (month < 10) {
        month = '0' + month;
    }

    // We created the correct date format below for the current day's date
    var dateTomorrow = currentDateTime.getFullYear() + "-" + month + "-" + date;

    // Here we enter the starting and ending number to book each car
    var checkinElem = document.querySelector("#checkin-date");
    var checkoutElem = document.querySelector("#checkout-date");

    let http = new XMLHttpRequest();
    http.open('get', 'products.json', true);
    http.send();
    http.onload = function () {
        let products = JSON.parse(this.responseText); // I read the data from json file
        // It saves the available start date for each car
        var fromDate = new Date(products[ID].Available_From);

        // IF condition for calculating if the start time is before the current day, 
        // then he will close it so that the person does not book it, 
        // and make the remaining days of it available
        if(fromDate.getTime() <= currentDateTime.getTime()) {
            checkinElem.setAttribute("min", dateTomorrow);
        } else if(fromDate.getTime() > currentDateTime.getTime()) {
            checkinElem.setAttribute("min", products[ID].Available_From);
        }

        // Here is the final time available for the car
        checkinElem.setAttribute("max", products[ID].Available_Until);
        checkoutElem.setAttribute("max", products[ID].Available_Until);


        checkinElem.onchange = function () {
            // Here it saves the start date that the person chooses and saves it in checkoutElem
            checkoutElem.setAttribute("min", this.value); 

            document.getElementById("bookGo").disabled = false;
        }
    }
}











