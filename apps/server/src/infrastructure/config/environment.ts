export const environment = (() => {
  const DATABASE_URL = process.env.DATABASE_URL
  if (!DATABASE_URL) throw new Error('DATABASE_URL is not set')

  const environment = {
    database: {
      url: DATABASE_URL,
    },
  }

  return environment
})()
