import { ButtonProps } from 'components/Button/types/button'
import { LoadingBarProps } from 'components/LoadingBar/types/loadingBar'
import { IconProps } from 'components/Icon/types/icon'

export type RobotCardProps = {
  buttons: ButtonProps[]
  loadingBar: LoadingBarProps
  iconInfo: IconProps
  textInfo: string
  robotId: string | number
}
