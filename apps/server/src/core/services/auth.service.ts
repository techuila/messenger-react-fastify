export interface IAuthStrategy {
  verifyToken(token: string): Promise<boolean>
  getUserInfo(token: string): Promise<Record<string, any>>
}

export class AuthService {
  public auth?: IAuthStrategy
  private err_msg = 'Auth strategy not set. Please call setAuthOption first.'

  setAuthOption(auth: IAuthStrategy) {
    this.auth = auth
  }

  async verifyToken(token: string) {
    if (!this.auth) throw new Error(this.err_msg)

    return this.auth.verifyToken(token)
  }

  async getUserInfo(token: string) {
    if (!this.auth) throw new Error(this.err_msg)

    return this.auth.getUserInfo(token)
  }
}
