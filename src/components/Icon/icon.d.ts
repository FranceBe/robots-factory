import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type IconProps = Partial<FontAwesomeIconProps> & {
  type: IconType
}

export type IconType = 'robot' | 'spinner' | 'failure' | 'success' | 'moving'
