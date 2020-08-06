console.log("Client Side JS File Loaded!")

const weatherFomr = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const fetchButton = document.querySelector('#fetchLocation');

const fetchMe = () => {

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    
    navigator.geolocation.getCurrentPosition(
        position => callme(position.coords.longitude, position.coords.latitude),
        err => messageOne.textContent = err.message + "! please add a location Manually or give permission for the location to be fetched!"
    );
}

const callme = (long, lat) => {
    fetch('/weather?coords=' + long + ',' + lat).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = "In " + data.location + ":";
                messageTwo.textContent = "It will be " + data.forecast;
            }
        })
    })
}

fetchButton.addEventListener('click', fetchMe);

weatherFomr.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = "In " + data.location + ":";
                messageTwo.textContent = "It will be " + data.forecast;
            }
        })
    })
})
