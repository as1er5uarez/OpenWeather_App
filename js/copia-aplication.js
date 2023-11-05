$(document).ready(function() {
    const temperatureElement = $('#temperature');
    const iconElement = $('#icon');
    const countryElement = $('#pais');
    const cityElement = $('#ciudad');
    const descriptionElement = $('#description');
    const minElement = $('#min');
    const maxElement = $('#max');
    const apiKey = '35343fbf54f2103285b2b1ff035969b0'
    
    //Muestra el tiempo de la ciudad indicada
    function searchWeather(city) {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                const temperature = Math.floor(data.main.temp);
                const minTemperature = Math.floor(data.main.temp_min);
                const maxTemperature = Math.floor(data.main.temp_max);
                const iconData = data.weather[0].icon;
                const country = data.sys.country;
                let iconPrint = "";
                let description = "";
                switch (iconData) {
                    case "01d":
                        iconPrint = "fas fa-sun";
                        description = "Soleado"
                        break;
                    case "01n":
                        iconPrint = "fas fa-sun";
                        description = "Soleado"
                        break;
                    case "02d":
                        iconPrint = "fas fa-cloud-sun"
                        description = "Parcialmente nublado"
                        break;
                    case "02n":
                        iconPrint = "fas fa-cloud-sun"
                        description = "Parcialmente nublado"
                        break;
                    case "03d":
                        iconPrint = "fas fa-cloud"
                        description = "Mayorm. nublado"
                        break;
                    case "03n":
                        iconPrint = "fas fa-cloud"
                        description = "Mayorm. nublado"
                        break;
                    case "04d":
                        iconPrint = "fas fa-cloud"
                        description = "Nublado"
                        break;
                    case "04n":
                        iconPrint = "fas fa-cloud"
                        description = "Nublado"
                    case "09d":
                        iconPrint = "fas fa-cloud-rain"
                        description = "Lluvias fuertes"
                        break;
                    case "10d":
                        iconPrint = "fas fa-cloud-sun-rain"
                        description = "Lluvia"
                        break;
                    case "11d":
                        iconPrint = "fas fa-cloud-bolt"
                        description = "Tormenta"
                        break;
                    case "13d":
                        iconPrint = "fas fa-cloud-meatball"
                        description = "Nieve"
                        break;
                    case "50d":
                        iconPrint = "fas fa-bars"
                        description = "Niebla"
                        break;
                }
                temperatureElement.text(temperature + 'ºC');
                iconElement.html('<i class="' + iconPrint + '"></i>');
                cityElement.text(city)
                descriptionElement.text(description)
                minElement.text("Min. " + minTemperature)
                maxElement.text("Max. " + maxTemperature)
                countryElement.text(country)
            },
            error: function(error) {
                console.error("Ups, parece que ha habido un error");
            }
        });
    }

    $('#buscarLugar').on('click', function(){
        var lugar = $('#lugar').val();
        searchWeather(lugar);
        search4Weather(lugar);
    });

    $("#obtenerUbicacion").click(function() {
        var lugar = $('#lugar').val();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                async function handleLocation() {
                    try {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
                        console.log("apiUrl:", apiUrl);  // Agrega este log para verificar la URL.
                        const response = await fetch(apiUrl);
                        if (!response.ok) {
                            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                        }
                        const data = await response.json();
                        console.log("Data:", data);
                        // const city = data.address.city || data.address.town;
                        const city = "Pamplona" //Hago esto para simular que funciona porque mi ubicacion no funciona
                        console.log("City:", city);
                        const region = data.address.state || data.address.region;
                        const country = data.address.country;

                      // Mostrar la información en la card
                        searchWeather(city);
                    } catch (error) {
                        console.error("Error al obtener la información de ubicación:", error);
                    }
                }

                    handleLocation();
                });
        }
    });

    function search4Weather(city){
        console.log("Hola");
        $.ajax({
            url: `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                
                let iconPrint = "";
                let description = "";
                const today = new Date().getDate();
                const forecasts = data.list.filter(item => {
                    const itemDate = new Date(item.dt_txt);
                    return itemDate.getDate() !== today;
                });
                var i = 1;
                forecasts.forEach(forecast => {
                    i += 1;
                    const date = new Date(forecast.dt_txt);
                    const temperature = Math.floor(forecast.main.temp);
                    const minTemperature = Math.floor(forecast.main.temp_min);
                    const maxTemperature = Math.floor(forecast.main.temp_max);
                    const iconData = forecast.weather[0].icon;
                    switch (iconData) {
                        case "01d":
                            iconPrint = "fas fa-sun";
                            description = "Soleado"
                            break;
                        case "01n":
                            iconPrint = "fas fa-sun";
                            description = "Soleado"
                            break;
                        case "02d":
                            iconPrint = "fas fa-cloud-sun"
                            description = "Parcialmente nublado"
                            break;
                        case "02n":
                            iconPrint = "fas fa-cloud-sun"
                            description = "Parcialmente nublado"
                            break;
                        case "03d":
                            iconPrint = "fas fa-cloud"
                            description = "Mayorm. nublado"
                            break;
                        case "03n":
                            iconPrint = "fas fa-cloud"
                            description = "Mayorm. nublado"
                            break;
                        case "04d":
                            iconPrint = "fas fa-cloud"
                            description = "Nublado"
                            break;
                        case "04n":
                            iconPrint = "fas fa-cloud"
                            description = "Nublado"
                        case "09d":
                            iconPrint = "fas fa-cloud-rain"
                            description = "Lluvias fuertes"
                            break;
                        case "10d":
                            iconPrint = "fas fa-cloud-sun-rain"
                            description = "Lluvia"
                            break;
                        case "11d":
                            iconPrint = "fas fa-cloud-bolt"
                            description = "Tormenta"
                            break;
                        case "13d":
                            iconPrint = "fas fa-cloud-meatball"
                            description = "Nieve"
                            break;
                        case "50d":
                            iconPrint = "fas fa-bars"
                            description = "Niebla"
                            break;
                    }
                    const cardElement = $('#scrollspyHeading' + i)
                    const temperatureElementCard = cardElement.find('#temperature')
                    const iconElementCard = cardElement.find('#icon')
                    const descriptionElementCard = cardElement.find('#description')
                    const minElementCard = cardElement.find('#min')
                    const maxElementCard = cardElement.find('#max')
                    const dateElementCard = cardElement.find('#date')

                    // TODO: Por el index accederemos a las cards.index y le printaremos los datos de la api
                    temperatureElementCard.text(temperature + 'ºC');
                    iconElementCard.html('<i class="' + iconPrint + '"></i>');
                    // cityElement.text(city)
                    descriptionElementCard.text(description)
                    minElementCard.text("Min. " + minTemperature)
                    maxElementCard.text("Max. " + maxTemperature)
                    dateElementCard.text(date)
                // countryElement.text(country)
                })
            },
            error: function(error) {
                console.error("Ups, parece que ha habido un error");
            }
        });
    }
});

