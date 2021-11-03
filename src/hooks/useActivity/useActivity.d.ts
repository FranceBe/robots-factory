import { IconProps } from 'components/Icon/icon'
import { ResourceType } from 'contexts/robotsContext/robotContext'

export type ActivityType = keyof ResourceType | 'moving' | undefined

export type InfoType = { iconInfo: IconProps | undefined; textInfo: string }
