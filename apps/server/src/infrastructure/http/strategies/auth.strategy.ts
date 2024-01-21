import { OAuth2Client } from 'google-auth-library'
import { IAuthStrategy } from '~/core/services/auth.service'
import { env } from '~/infrastructure/config/environment'

export class GoogleAuthStrategy implements IAuthStrategy {
  private googleAuth2Client: OAuth2Client

  constructor() {
    this.googleAuth2Client = new OAuth2Client()
  }

  async verifyToken(idToken: string) {
    try {
      const ticket = await this.googleAuth2Client.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID,
      })

      return !!ticket.getUserId()
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async getUserInfo(access_token: string) {
    try {
      const token_info = await this.googleAuth2Client.getTokenInfo(access_token)

      return token_info
    } catch (err) {
      console.error(err)
      throw new Error('Failed to fetch user info from Google')
    }
  }
}

export class GithubAuthStrategy implements IAuthStrategy {
  async verifyToken(access_token: string) {
    try {
      const res = await fetch(`https://api.github.com/applications/${env.GITHUB_CLIENT_ID}/token`, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Basic ${btoa(`${env.GITHUB_CLIENT_ID}:${env.GITHUB_CLIENT_SECRET}`)}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ access_token }),
      })

      if (res.status === 200) return true

      return false
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async getUserInfo(access_token: string) {
    try {
      const res = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${access_token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })

      if (!res.ok) throw Error('Failed to fetch user info from Github')

      return res.json() as Record<string, any>
    } catch (err) {
      console.error(err)
      throw new Error('Failed to fetch user info from Github')
    }
  }
}
