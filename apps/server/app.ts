import { createServer, options } from '~/infrastructure/http/server'

const app = createServer()

export default app
export { app, options }
