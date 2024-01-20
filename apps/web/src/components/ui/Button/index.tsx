import clx from 'clsx'
import * as style from './index.module.scss'

type Props = {
  children?: React.ReactNode
  primary?: boolean
  secondary?: boolean
  ghost?: boolean
  className?: string
  onClick?: () => void
}

function Button({ children, primary, secondary, ghost, className, onClick }: Props) {
  const variant = primary ? style.primary : secondary ? style.secondary : ghost ? style.ghost : style.secondary
  return (
    <button className={clx(style.btn, className, variant)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
