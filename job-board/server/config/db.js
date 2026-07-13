import dns from 'dns'
import mongoose from 'mongoose'

// Some networks (college/campus WiFi, certain ISPs) block the DNS "SRV"
// lookups that mongodb+srv:// connection strings depend on, which shows up
// as "querySrv ECONNREFUSED". Forcing Node to use public DNS servers works
// around that without changing the connection string itself.
dns.setServers(['8.8.8.8', '8.8.4.4'])

async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.error(
      'MONGODB_URI is missing. Add it to your server/.env file before starting the server.',
    )
    process.exit(1)
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
    console.log(`MongoDB connected: ${mongoose.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDB