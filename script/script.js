const elemWeathercon = document.querySelector(".weathercon");
const elemLocation = document.querySelector(".location");
const elemDate = document.querySelector(".date");
const elemTemp = document.querySelector(".temp");
const elemForm = document.querySelector(".form");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f2902223d3mshf989ffd7ea8cccap190956jsn0dca5fd07b43",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

elemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target[0].value) {
    getData(e.target[0].value);
    elemForm.reset();
  }
});


function getStatus(response) {
  return response.status === 200 ?
    response.json() :
    Promise.reject(new Error(response.status));
}


function getData(queryParameter) {
  fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${queryParameter}`, options)
    .then(getStatus)
    .then(showWeatherData)
    .catch(err => {
      console.error(err);
      showWeatherData();
    });

}


function showWeatherData(data) {
  elemWeathercon.innerHTML = data ? `<img src="${data.current.condition.icon}">` : "";
  elemLocation.innerText = data ? data.location.name : "лажа...  :(";
  elemDate.innerText = data ? data.location.localtime : "";
  elemTemp.innerText = data ? `${data.current.feelslike_c} °C` : "";
}


// start
fetch("https://ipapi.co/json/")
  .then(getStatus)
  .then((r) => getData(r.ip))
  .catch((err) => {
    console.error(err);
    showWeatherData();
  });