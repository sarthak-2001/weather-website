const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FydGhhay1icmFobWEiLCJhIjoiY2p5bjY1emZzMG9oMDNtbm9pZHE0NXRnZSJ9.8beeRpCWueDS5_eD9cCN0w&limit=1";

  request(
    {
      url,
      json: true
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect", undefined);
      } else if (body.features.length === 0) {
        callback("Invalid Location", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].geometry.coordinates[1],
          longitude: body.features[0].geometry.coordinates[0],
          location: body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;
