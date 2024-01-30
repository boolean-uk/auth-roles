// Load our .env file
import { config } from 'dotenv'
config()

// Load app
import app from './server.js'

// Set the port
const port = process.env.PORT || 4000

// Start our API server
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`)
})
