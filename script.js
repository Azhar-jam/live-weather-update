console.log("Weather app loaded!");
const apiKey = "9e46b955a0f706096ceb2a74c477d3db";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage"); // Add this div in HTML


searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (city === "") return;

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const response = await fetch(apiURL);
  const data = await response.json();

  if (response.ok) {
    // Hide error message if previously shown
    errorMessage.textContent = "";
    
    // Update UI with weather info
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
  } else {
    // Display error message inside the page
    errorMessage.textContent = "City not found. Please try again.";
  }
});

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formatted = now.toLocaleString('en-US', options);
  document.getElementById('datetime').textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formatted = now.toLocaleString('en-US', options);
  document.getElementById('datetime').textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call
const voiceBtn = document.getElementById("voiceBtn");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceBtn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    const spokenCity = event.results[0][0].transcript;
    cityInput.value = spokenCity;
    searchBtn.click(); // trigger the search
  });

  recognition.addEventListener("error", (event) => {
    console.error("Speech recognition error:", event.error);
  });
} else {
  voiceBtn.disabled = true;
  voiceBtn.textContent = "🎤 Not Supported";
}
