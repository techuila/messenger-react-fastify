import * as moduleAlias from 'module-alias'
moduleAlias.addAlias('~', __dirname + '/src')

import { createServer, options } from '~/infrastructure/http/server'
import { bootstrap } from '~/infrastructure/config/bootstrap'

const app = createServer(() => {
  bootstrap.init()
})

export default app
export { app, options }
