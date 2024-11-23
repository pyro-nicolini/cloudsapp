let form = document.getElementById("form-container");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let cityInput = document.getElementById("city");
  let cityName = cityInput.value;
  if (!cityName) {
    alert("Por favor, ingresa una ciudad.");
    return;
  }

  getWeatherData(cityName).then((weatherData) => {
    if (!weatherData || !weatherData.main) {
      alert("No se pudo obtener información climática para esta ciudad.");
      return;
    }


    const weather = document.createElement("strong");
    weather.textContent = `Ciudad: ${weatherData.name}, País: ${weatherData.sys.country}`;

    const temp = document.createElement("p");
    temp.textContent = `Temperatura: ${weatherData.main.temp}°C`;

    const hum = document.createElement("p");
    hum.textContent = `Humedad: ${weatherData.main.humidity}%`;

    const max = document.createElement("p");
    max.textContent = `Temperatura Máxima: ${weatherData.main.temp_max}°C`;

    const min = document.createElement("p");
    min.textContent = `Temperatura Mínima: ${weatherData.main.temp_min}°C`;

    const clouds = document.createElement("p");
    clouds.textContent = `Cantidad de nubes: ${weatherData.clouds.all}`;

    const desc = document.createElement("p");
    desc.textContent = `Cielo: ${weatherData.weather[0].description}`;


    const clima = document.createElement("p");
    let backgroundImage = "";
    switch (weatherData.weather[0].main) {
      case "Clear":
        clima.textContent = "Clima: Es un día perfecto para escalar. ¡Aprovecha el sol!";
        backgroundImage = "url('https://images.unsplash.com/photo-1491550509181-fa5704644766?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        break;
      case "Clouds":
        clima.textContent = "Clima: El día está nublado. Una buena oportunidad para escalar sin tanto calor.";
        backgroundImage = "url('https://plus.unsplash.com/premium_photo-1680742443429-29c93d33138a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        break;
      case "Rain":
        clima.textContent = "Clima: Está lloviendo. Podrías considerar una actividad bajo techo.";
        backgroundImage = "url('https://images.unsplash.com/photo-1508556919487-845f191e5742?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        break;
      case "Drizzle":
        clima.textContent = "Clima: Una llovizna ligera acompaña el día. ¡Escalar bajo las gotas puede ser refrescante!";
        backgroundImage = "url('https://plus.unsplash.com/premium_photo-1687525933572-e5d144fea470?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        break;
      case "Thunderstorm":
        clima.textContent = "Clima: Hay tormenta eléctrica. Es mejor quedarse en un lugar seguro.";
        backgroundImage = "url('https://images.unsplash.com/photo-1584267385289-81fdaa6efe7a?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        break;
      case "Snow":
        clima.textContent = "Clima: Está nevando. Un paisaje espectacular, pero toma precauciones con el frío.";
        backgroundImage = "url('https://plus.unsplash.com/premium_photo-1667579187855-fed841be2ec9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        break;
      default:
        clima.textContent = "Clima: No se pudo determinar el clima exacto. ¡Asegúrate de estar preparado!";
        backgroundImage = "url('https://images.unsplash.com/photo-1532598065077-cf9ee59bf91f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }

    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    const container = document.createElement("div");
    container.className = "ciudad"
    container.appendChild(weather);
    container.appendChild(temp);
    container.appendChild(hum);
    container.appendChild(max);
    container.appendChild(min);
    container.appendChild(clouds);
    container.appendChild(desc);
    container.appendChild(clima);

    form.appendChild(container);
  });
});

function getWeatherData(cityName) {
  const apiKey = "079883a46011aa6a6bb9379b08d21565";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud del clima:", error);
      alert("Error al obtener los datos. Por favor, intenta de nuevo.");
    });
}

const resetButton = document.querySelector(".reset-button"); 

if (resetButton) {
  resetButton.addEventListener("click", function() {
    location.reload(); 
  });
}
