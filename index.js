const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5000

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Craper API')
})

// Get Product Details
app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${id}`)
    res.json(JSON.parse(response))
  } catch(err) {
    res.json(err)
  }
})

// Get product reviews
app.get('/products/:id/reviews', async (req, res) => {
  const { id } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${id}`)
    res.json(JSON.parse(response))
  } catch(err) {
    res.json(err)
  }
})

// Get product offers
app.get('/products/:id/offers', async (req, res) => {
  const { api_key } = req.query
  const { id } = req.params
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${id}`)
    res.json(JSON.parse(response))
  } catch(err) {
    res.json(err)
  }
})

// GET search query
app.get('/search/:query', async (req, res) => {
  const { query } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${query}`)
    res.json(JSON.parse(response).results)
  } catch(err) {
    res.json(err)
  }
})



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

