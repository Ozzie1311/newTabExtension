const unsplashApiKey = 'kUxuRMOJiLsZhi3xUYAm-_MSxhhhCPXvU7Zxjzy-D54'
const baseURL = 'https://api.unsplash.com/'
const endpoint = 'photos/random'

const unsplashURL = `${baseURL}${endpoint}?client_id=${unsplashApiKey}&orientation=landscape&query=nature`

async function fetchBackgroundImage() {
  try {
    const response = await fetch(unsplashURL)

    if (!response.ok) {
      throw Error(
        `Error fetching background Image. ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    renderBackgroundImage(data)
  } catch (err) {
    console.error('Error fetching background Image', err)
  }
}

function renderBackgroundImage(data) {
  document.querySelector(
    'body'
  ).style.backgroundImage = `url(${data.urls.full})`
  document.querySelector('#author').textContent = `Photo by: ${data.user.name}`
}

fetchBackgroundImage()

//Currency

const urlCoinGecko = 'https://api.coingecko.com/api/v3/coins/bitcoin'

async function fetchCurrency() {
  try {
    const response = await fetch(urlCoinGecko)

    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    renderCurrency(data)
  } catch (err) {
    console.error(`Error fetching currency`, err)
  }
}

function renderCurrency(data) {
  document.querySelector('.crypto').innerHTML = `
         <div class="crypto-head">
           <img src="${data.image.small}" alt="Image of ${data.name}">
             <p id="crypto-title" class="crypto-title">${data.name}</p>
         </div>
         <div class="crypto-information">
             <p>🎯:<span>$${data.market_data.current_price.usd}</span></p>
             <p>👆:<span>$${data.market_data.high_24h.usd}</span></p>
             <p>👇:<span>$${data.market_data.low_24h.usd}</span></p>
         </div>
    `
}

fetchCurrency()
//Time and Date

function getCurrentTime() {
  const date = new Date()
  document.getElementById('time').textContent = `${date.toLocaleTimeString(
    'en-US'
  )}`
  document.getElementById('date').textContent = `${date.toLocaleDateString()}`
}

setInterval(getCurrentTime, 1000)

async function fetchWeatherConditions(position) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c67a42588def43b47f205d2a72dd6868&units=metric`
    )

    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    renderWeather(data)
  } catch (err) {
    console.error(`Error fetching weather`, err)
  }
}

function renderWeather(data) {
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  document.querySelector('.weather').innerHTML = `
         <img src="${iconURL}" alt="Icon of ${data.weather[0].description}">
        <p class="temperature">${data.main.temp.toFixed(1)}°C</p>
        <p class="city">${data.name}</p>
    
    `
}

navigator.geolocation.getCurrentPosition(async (position) => {
  await fetchWeatherConditions(position)
})
