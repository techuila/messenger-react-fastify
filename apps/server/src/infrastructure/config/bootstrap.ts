import { migrate } from '../database'

export const bootstrap = {
  async init() {
    migrate.sync()
  },
}
