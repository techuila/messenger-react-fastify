import clx from 'clsx'
import * as style from './index.module.scss'

type Props = {
  children?: React.ReactNode
  primary?: boolean
  secondary?: boolean
  ghost?: boolean
  className?: string
}

function Button({ children, primary, secondary, ghost, className }: Props) {
  const variant = primary ? style.primary : secondary ? style.secondary : ghost ? style.ghost : style.secondary
  return <button className={clx(style.btn, className, variant)}>{children}</button>
}

export default Button
