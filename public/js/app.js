console.log("client side js");

// fetch('http://localhost:9000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);

//     })
// })

const weatherForm = document.body.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  if (location) {
    message1.textContent = "Loading....";
    message2.textContent = "";
    fetch("/weather?address=" + location).then(response => {
      response.json().then(data => {
        if (data.error) {
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      });
      //console.log(location);
    });
  } else {
    message1.textContent = "Enter Location";
  }

  console.log("testing");
});
