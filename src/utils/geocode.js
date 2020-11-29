const axios = require("axios").default;

const access_token =
  "pk.eyJ1IjoidGVqYXNvbWluYSIsImEiOiJja2NtN2ZnZHkwZG5yMnhwaGoycWZ5Zm0yIn0.STWd4VnUbZdlCV0tvE4OOA";

const find = (query, callback) => {
  const searchText = query.location;
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(searchText) +
    ".json";
  const params = { access_token };

  axios
    .get(url, { params })
    .then((res) => {
      const data = res.data.features[0];
      console.log(data);
      if (data) {
        callback(undefined, {
          longitude: data.center[0],
          latitude: data.center[1],
          location: data.place_name,
        });
      } else {
        callback({ error: "No geocoding data found" }, undefined);
      }
    })
    .catch((err) => {
      console.log(err);
      callback({ error: err.message }, undefined);
    });
};

module.exports = { find };
