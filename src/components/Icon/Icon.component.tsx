// We are using Font Awesome to display all the icons we need.
// By using the prop "type" we can chose which font awesome icon to display
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faRobot, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProps, IconType } from 'components/Icon/types/icon'
import React from 'react'

export const Icon: React.FC<IconProps> = ({ type = 'robot', ...rest }) => {
  const FAIconByIconProps: Record<IconType, IconProp> = {
    failure: faTimes,
    robot: faRobot,
    spinner: faSpinner,
    success: faCheck,
  }

  return <FontAwesomeIcon {...rest} icon={FAIconByIconProps[type]} />
}

export default Icon
