const weatherForm = document.querySelector('.weatherForm') as HTMLFormElement;
const cityInput = document.querySelector('.cityInput') as HTMLInputElement;
const card = document.querySelector('.card') as HTMLElement;
const apiKey = "0f738e438fbe9baabb92ebe3325a5fcd";

weatherForm.addEventListener('submit', async event => {
  event.preventDefault();

  const city: string = cityInput.value;

  if(city){
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherData(weatherData);
    }
    catch(error: any){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please input a city")
  }


});

async function getWeatherData(city: string){
  const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response: Response = await fetch(apiUrl);

  if(!response.ok){
    displayError(`Could not get the data of '${city}'`)
  }
  // console.log(response.json());
  
  return response.json();

};

function displayError(message: string){
  alert(message);

  card.textContent = "";
  card.style.display = "flex";

  const errMsg = document.createElement("p");
  errMsg.textContent = message;
  card.appendChild(errMsg);
  card.classList.add("errorDisplay");
};

function displayWeatherData(data: any){
  card.textContent = "";
  card.style.display = "flex";
  
  const {name: city,
          main: {temp, humidity},
          weather: [{id, description}]} = data;

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add('cityDisplay');
  tempDisplay.classList.add('tempDisplay');
  humidityDisplay.classList.add('humidityDisplay');
  descDisplay.classList.add('descDisplay');
  weatherEmoji.classList.add('weatherEmoji');

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);

};

function getWeatherEmoji(weatherId: number): any{
  switch(true){
      case (weatherId >= 200 && weatherId < 300):
          return "⛈️";
      case (weatherId >= 300 && weatherId < 400):
          return "🌦️";
      case (weatherId >= 500 && weatherId < 600):
          return "🌧️";
      case (weatherId >= 600 && weatherId < 700):
          return "❄️";
      case (weatherId >= 700 && weatherId < 800):
          return "💨";
      case (weatherId === 800):
          return "☀️";
      case (weatherId >= 801 && weatherId < 810):
          return "☁️";
      default:
          return "⁉️";
      };
}