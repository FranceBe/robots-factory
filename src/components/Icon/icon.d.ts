import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconEnum } from 'utils/common.enum'

export type IconProps = Partial<FontAwesomeIconProps> & {
  type?: IconEnum
}
