import { ButtonProps } from 'components/Button/button'
import { IconProps } from 'components/Icon/icon'
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'

export type RobotCardProps = {
  loadingBar: LoadingBarProps
  iconInfo?: IconProps
  textInfo: string
  robotId: number
  fooButton: ButtonProps
  barButton: ButtonProps
  foobarButton: ButtonProps
  robotButton: ButtonProps
}
