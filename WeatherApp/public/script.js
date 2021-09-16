const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null)
        return

    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: place.formatted_address
        })
    }).then(res => res.json()).then(data => {
        console.log(data) // toto bolo dobre
        setWeatherData(data, place.formatted_address)
    })
})

const iconCanvas = document.getElementById('icon')
const statusElement = document.querySelector('[data-status]')
const locationElement = document.querySelector('[data-location]')
const windElement = document.querySelector('[data-wind]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.current.weather_descriptions[0]
    windElement.textContent = data.current.wind_speed
    temperatureElement.textContent = data.current.temperature
    precipitationElement.textContent = `${data.current.precip * 100}%`

    var ctx=iconCanvas.getContext("2d");
    var img=new Image();
    img.onload = function(){
          ctx.drawImage(img,0,0);
    };
    img.src=data.current.weather_icons[0];
}