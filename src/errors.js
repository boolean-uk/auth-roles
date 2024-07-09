
// Just trying to understand the purpose of doing this. For future error handling and mapping through to send client proper error message. Not implemented. 

const errorMessages = {
    "Cannot convert undefined or null to object": 'Invalid Credentials',
    "PrismaClientKnownRequestError": 'Prisma issue'
}

const testTokens = {
  admin: 'eyJhbGciOiJIUzI1NiJ9.MTE.JdMzPFnQKkW96wmlOO3OoLMTAS9qEZ3c4vEyy2RIvZs',
  user: 'eyJhbGciOiJIUzI1NiJ9.MTI.WM5pw4RXq39qDh9xuOsp7KktHr58KR4nqUx3OD-rYuQ'
}

module.exports = errorMessages