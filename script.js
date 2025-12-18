const unsplashApiKey = 'kUxuRMOJiLsZhi3xUYAm-_MSxhhhCPXvU7Zxjzy-D54'
const baseURL = 'https://api.unsplash.com/'
const endpoint = 'photos/random'

const unsplashURL = `${baseURL}${endpoint}?client_id=${unsplashApiKey}&orientation=landscape&query=nature`

fetch(unsplashURL)
  .then((response) => {
    if (!response.ok) {
      throw Error('Error fetching background Image')
    }
    return response.json()
  })
  .then((data) => {
    console.log(data.urls.regular)
    // document.querySelector('#main').style.background = `url("${data.urls.regular}")`
  })
  .catch((error) => console.log(error))

const urlCoinGecko = 'https://api.coingecko.com/api/v3/coins/bitcoin'

fetch(urlCoinGecko)
  .then((response) => {
    if (!response.ok) {
      throw Error('Error fetching bitcoin information')
    }
    return response.json()
  })
  .then((data) => {
    console.log(data)
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
  })
  .catch((error) => console.log(error))

function getCurrentTime() {
  const date = new Date()
  document.getElementById('time').textContent = `${date.toLocaleTimeString('en-US')}`
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c67a42588def43b47f205d2a72dd6868&units=imperial`,
  )
    .then((response) => {
      if (!response.ok) {
        throw Error('Error fetching the weather conditions')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
})
