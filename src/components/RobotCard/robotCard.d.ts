import { ButtonProps } from 'components/Button/button'
import { IconProps } from 'components/Icon/icon'
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'

export type RobotCardProps = {
  buttons: ButtonProps[]
  loadingBar: LoadingBarProps
  iconInfo?: IconProps
  textInfo: string
  robotId: string
}
