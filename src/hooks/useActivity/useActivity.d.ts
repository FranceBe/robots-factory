import { IconProps } from 'components/Icon/icon'
import { ActivityName } from 'utils/common.enum'

export type InfoType = { iconInfo: IconProps | undefined; textInfo: string }

export type ActivityType = ActivityName | undefined

export type UseActivityType = {
  currentActivity?: ActivityName
  currentInfo: InfoType
  startActivity: (activity: ActivityType, futureActivity?: ActivityName) => void
  cleanActivity: () => void
  taskTime: number
  timeLeft: number
}
