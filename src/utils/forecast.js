const axios = require("axios").default;

const appid = "c503241ab03499e7ade8f349c07477be";
const url = "https://api.openweathermap.org/data/2.5/onecall";

const find = (lat, lon, callback) => {
  const params = { lat, lon, appid, units: "metric" };
  axios
    .get(url, { params })
    .then((res) => {
      const data = res.data;
      console.log(data.current);
      callback(undefined, {
        currentTemp: data.current.temp,
        weather: data.current.weather[0].main,
        weatherDesc: data.current.weather[0].description,
      });
    })
    .catch((err) => {
      console.log(err);
      callback(err.message, undefined);
    });
};

module.exports = { find };
