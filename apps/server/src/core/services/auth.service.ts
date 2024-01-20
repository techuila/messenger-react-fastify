import { OAuth2Client } from 'google-auth-library'
import { env } from '~/infrastructure/config/environment'

interface IAuthService {
  fetchUserInfoFromGithub(access_token: string): Promise<Record<string, any>>
  verifyGoogleIdToken(idToken: string): Promise<boolean>
  verifyGithubAccessToken(access_token: string): Promise<boolean>
}

const googleAuth2Client = new OAuth2Client()

export class AuthService implements IAuthService {
  async verifyGoogleIdToken(idToken: string) {
    const ticket = await googleAuth2Client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    })

    return !!ticket.getUserId()
  }

  async fetchUserInfoFromGithub(access_token: string) {
    return (await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${access_token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })) as Record<string, any>
  }

  async verifyGithubAccessToken(access_token: string) {
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
  }
}
