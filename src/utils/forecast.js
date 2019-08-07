const request = require("request");

const forecast = (lat, long, callback) => {
  const url = "https://api.darksky.net/forecast/c4c126bf13e203b2d34e1ef47edbf358/" + encodeURIComponent(lat) + "," + encodeURIComponent(long);

  request(
    {
      url,
      json: true
    },
    (error, {body}) => {
      if (error) {
        callback("unable to connect to internet", undefined);
      } else if (body.error) {
        callback("unable to find location", undefined);
      } else {
        callback(undefined, `temp is ${body.currently.temperature} and presi chance is ${body.currently.precipProbability}`);
      }
    }
  );
};

module.exports = forecast;
