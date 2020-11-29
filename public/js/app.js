console.log("Client side javascript file is loaded");

const getWeather = (location, callback) => {
  fetch(
    "http://localhost:3000/api/weather?location=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      console.log(data);
      callback(data);
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  getWeather(location, (data) => {
    if (data.weatherDesc) {
      messageOne.textContent = data.location;
      messageTwo.textContent =
        "Current temperature is " +
        data.currentTemp +
        " deg C and current weather condition is " +
        data.weatherDesc;
    } else {
      messageOne.textContent = "Failed to get weather: " + data.error;
    }
  });
});
