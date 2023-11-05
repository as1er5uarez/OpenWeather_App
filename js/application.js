$(document).ready(function() {
    const temperatureElement = $('#temperature');
    const iconElement = $('#icon');
    const countryElement = $('#pais');
    const cityElement = $('#ciudad');
    const descriptionElement = $('#description');
    const minElement = $('#min');
    const maxElement = $('#max');
    $('#buscarLugar').on('click', function(){
        var lugar = $('#lugar').val();
        var apiKey = '35343fbf54f2103285b2b1ff035969b0'
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&appid=${apiKey}&units=metric`;
        $.ajax({
            url: apiUrl,
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
                        description = "Nubes dispersas"
                        break;
                    case "03n":
                        iconPrint = "fas fa-cloud"
                        description = "Nubes dispersas"
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
                cityElement.text(lugar)
                descriptionElement.text(description)
                minElement.text("Min. " + minTemperature)
                maxElement.text("Max. " + maxTemperature)
                countryElement.text(country)
            },
            error: function(error) {
                console.error("Ups, parece que ha habido un error");
            }
        });
    });

    $("#obtenerUbicacion").click(function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var fecha = new Date();
                var fechaActual = fecha.toLocaleTimeString('es-ES');
                var apiKey = '35343fbf54f2103285b2b1ff035969b0'
                const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
                $.ajax({
                    url: apiUrl,
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
                                description = "Nubes dispersas"
                                break;
                            case "03n":
                                iconPrint = "fas fa-cloud"
                                description = "Nubes dispersas"
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
                        cityElement.text(lugar)
                        descriptionElement.text(description)
                        minElement.text("Min. " + minTemperature)
                        maxElement.text("Max. " + maxTemperature)
                        countryElement.text(country)
                    },
                    error: function(error) {
                        console.error("Ups, parece que ha habido un error");
                    }
                });
            });
        }
    });
});
