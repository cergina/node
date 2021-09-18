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

    
    var img=new Image();
    img.src=data.current.weather_icons[0];

    img.onload = function(){
        var ctx=iconCanvas.getContext("2d");
        var wrh = img.width / img.height;
        var newWidth = iconCanvas.width;
        var newHeight = newWidth / wrh;

        if (newHeight > iconCanvas.height) {
            newHeight = iconCanvas.height;
            newWidth = newHeight * wrh;
        }

        var xOffset = newWidth < iconCanvas.width ? ((iconCanvas.width - newWidth) / 2) : 0;
        var yOffset = newHeight < iconCanvas.height ? ((iconCanvas.height - newHeight) / 2) : 0;

        ctx.drawImage(img,xOffset,yOffset, newWidth, newHeight);
    };
    
}