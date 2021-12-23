let lat = document.querySelector(".lat");
let long = document.querySelector(".long");
let month = document.querySelector(".month");
let year = document.querySelector(".year");
let btn = document.querySelector(".btn1");
let wrapper = document.querySelector(".wrapper");


btn.addEventListener("click", function () {
    if (lat.value == "" || long.value == "" || month.value == "" || year.value == "") {
        alert("fill the blanks!")
    }


    createTable();
    // for (let i = 1; i < 32; i++) {


    // }

    console.log(lat.value);

})


function createTable() {
    let table = document.getElementsByClassName("table");
    let tbody = document.createElement("tbody");

    for (let i = 0; i < 31; i++) {
        let th = document.createElement("th");
        th.innerText = i;
        let tr = document.createElement("tr");
        tr.append(th);
 
        for (let index = 1; index < 7; index++) {

            let td = document.createElement("td");
            td.innerText = JSON.parse(request.responseText).data[i].timings.Fajr;
            tr.append(td);

        }

    }

    tbody.append(tr);
    table.append(tbody)

}


let request = new XMLHttpRequest();

request.onload = () => {

let pray=JSON.parse(request.responseText);
    if (request.status == 200) {
        console.log(pray);
        console.log(pray.data[0].timings.Fajr)

    }
    else {
        console.log(`error  ${request.status} ${request.statusText}`);
    }
}


request.open("GET", "http://api.aladhan.com/v1/calendar?latitude="+lat.value+"&longitude="+long.value+"&method=2&month=4&year=2021");
request.send();

//api.aladhan.com/v1/calendar?latitude=51.508515&longitude=-0.1254872&method=2&month=4&year=2021
// 51.508515
//-0.1254872