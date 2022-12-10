const elemSpinner = document.querySelector(".spinner-wrap");
const elemWeathercon = document.querySelector(".weathercon");
const elemLocation = document.querySelector(".location");
const elemDate = document.querySelector(".date");
const elemTemp = document.querySelector(".temp");
const elemForm = document.querySelector(".form");
const apiKey = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f2902223d3mshf989ffd7ea8cccap190956jsn0dca5fd07b43",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

elemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target[0].value) {
    getWeatherData(e.target[0].value);
    elemForm.reset();
  }
});


const showWeatherData = (data) => {
  elemWeathercon.innerHTML = data ? `<img src="${data.current.condition.icon}">` : "";
  elemLocation.innerText = data ? data.location.name : "лажа...  :(";
  elemDate.innerText = data ? data.location.localtime : "";
  elemTemp.innerText = data ? `${data.current.feelslike_c} °C` : "";
  elemSpinner.classList.remove("js-show-spinner");
};


const sendHTTPRequest = async (url, options) => {
  elemSpinner.classList.add("js-show-spinner");
  try {
    const response = await fetch(url, options);
    if (response.status === 200) return await response.json();
    throw new Error(response.status);
  } catch (error) {
    showWeatherData();
    console.error(error);
  }
};


function getWeatherData(queryParameter) {
  sendHTTPRequest(`https://weatherapi-com.p.rapidapi.com/current.json?q=${queryParameter}`, apiKey)
    .then(showWeatherData)
    .catch(console.error);
}


// start
sendHTTPRequest("https://ipapi.co/json/")
  .then((r) => getWeatherData(r.ip))
  .catch(console.error);