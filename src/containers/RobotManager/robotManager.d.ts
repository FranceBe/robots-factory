import { IconProps } from 'components/Icon/icon'
import { ResourceType } from 'contexts/robotsContext/robotContext'

export type ActivityType = keyof ResourceType

export type InfoType = { iconInfo: IconProps | undefined; textInfo: string }

export type RobotManagerProps = { robotId: string }

type StringBoolean = 'true' | 'false'

export type StyledContainerProps = {
  foobarfoo: StringBoolean
  foobarbar: StringBoolean
  robotfoo: StringBoolean
  robotfoobar: StringBoolean
}
