let lat = document.querySelector(".lat");
let long = document.querySelector(".long");
let month = document.querySelector(".month");
let year = document.querySelector(".year");
let btn = document.querySelector(".btn1");
let wrapper = document.querySelector(".wrapper");
let p = document.querySelector(".city");

let request = new XMLHttpRequest();

btn.addEventListener("click", function () {
  if (
    lat.value == "" ||
    long.value == "" ||
    month.value == "" ||
    year.value == ""
  ) {
    alert("fill the blanks please!");
    return;
  } else if (isNaN(lat.value) || isNaN(lat.value)) {
    alert("can't add text,only number!");
    return;
  }

  let newMonth = month.value.split("-");
  let newYear = year.value.split("-");

  if (newMonth[0] <= 2010 || newYear[0] <= 2010) {
    alert("add date above 2010");
    return;
  } else if (newMonth[1] != newYear[1]) {
    alert("choose same month please!");
    return;
  }

  request.open(
    "GET",
    "http://api.aladhan.com/v1/calendar?latitude=" +
      lat.value +
      "&longitude=" +
      long.value +
      "&method=2&month=" +
      newMonth[1] +
      "&year=" +
      newYear[0] +
      ""
  );
  request.send();

  request.onload = () => {
    let pray = JSON.parse(request.responseText);
    if (request.status == 200) {
      console.log(pray);

      let rqst1 = JSON.parse(request.responseText).data;
      p.innerText =
        rqst1[0].meta.timezone + " city" + " " + newMonth[1] + " month";
      for (let i = 0; i < rqst1.length; i++) {
        createTable(i);
      }

      console.log(newMonth[1]);
      console.log(newYear);
    } else {
      console.log(`error  ${request.status} ${request.statusText}`);
    }
  };

  lat.value == "";
  long.value == "";
  month.value == "";
  year.value == "";
});

function createTable(count) {
  let rqst = JSON.parse(request.responseText).data;
  let table = document.querySelector(".table");
  let tbody = document.createElement("tbody");
  let tr;

  let th = document.createElement("th");
  th.innerText = count + 1;
  tr = document.createElement("tr");
  tr.append(th);

  let td1 = document.createElement("td");
  td1.innerText = rqst[count].timings.Fajr;
  tr.append(td1);
  let td2 = document.createElement("td");
  td2.innerText = rqst[count].timings.Sunrise;
  tr.append(td2);
  let td3 = document.createElement("td");
  td3.innerText = rqst[count].timings.Dhuhr;
  tr.append(td3);
  let td4 = document.createElement("td");
  td4.innerText = rqst[count].timings.Asr;
  tr.append(td4);
  let td5 = document.createElement("td");
  td5.innerText = rqst[count].timings.Maghrib;
  tr.append(td5);
  let td6 = document.createElement("td");
  td6.innerText = rqst[count].timings.Sunset;
  tr.append(td6);
  let td7 = document.createElement("td");
  td7.innerText = rqst[count].timings.Isha;
  tr.append(td7);

  tbody.append(tr);
  table.append(tbody);
}

//api.aladhan.com/v1/calendar?latitude=51.508515&longitude=-0.1254872&method=2&month=4&year=2021
// 51.508515
//-0.1254872
