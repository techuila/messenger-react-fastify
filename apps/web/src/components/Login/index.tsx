import Button from '../ui/Button'
import * as style from './index.module.scss'
import GoogleLogo from '~/assets/google.svg'
import GithubLogo from '~/assets/github.svg'

function Login() {
  const handleSignIn = (url: string) => {
    return () => (window.location.href = url)
  }

  return (
    <div className={style.container}>
      <img className={style.logo} />
      <h1>Welcome to Messenger</h1>
      <h5 className={style.subtitle}>The simple way to text, call and video chat directly from you desktop.</h5>

      <div className={style.loginActions}>
        <Button className={style.googleBtn} onClick={handleSignIn(import.meta.env.VITE_GOOGLE_AUTH_URL)}>
          <img src={GoogleLogo} alt="Google Logo" /> Login with Google
        </Button>
        <Button className={style.githubBtn} onClick={handleSignIn(import.meta.env.VITE_GITHUB_AUTH_URL)}>
          <img src={GithubLogo} alt="Github Logo" /> Login with Github
        </Button>
      </div>
    </div>
  )
}

export default Login
