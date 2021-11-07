// Icon component
// I am using Font Awesome to display all the icons we need
// By providing the prop "type" I can chose which Font Awesome icon to display
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faRobot, faRoute, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProps } from 'components/Icon/icon'
import React from 'react'
import { IconEnum } from 'utils/common.enum'

export const FAIconByIconProps: Record<IconEnum, IconProp> = {
  [IconEnum.failure]: faTimes,
  [IconEnum.moving]: faRoute,
  [IconEnum.robot]: faRobot,
  [IconEnum.spinner]: faSpinner,
  [IconEnum.success]: faCheck,
}

export const Icon: React.FC<IconProps> = ({ type = IconEnum.robot, ...rest }) => {
  return <FontAwesomeIcon {...rest} icon={FAIconByIconProps[type]} />
}

export default Icon
