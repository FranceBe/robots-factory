import { ContextType } from 'hooks/types/globalContext'
import { IconProps } from 'components/Icon/types/icon'

export type ActivityType = keyof ContextType

export type InfoType = { iconInfo: IconProps | undefined; textInfo: string }

export type RobotManagerProps = { robotId: number | string }

type StringBoolean = 'true' | 'false'

export type StyledContainerProps = {
  foobarfoo: StringBoolean
  foobarbar: StringBoolean
  robotfoo: StringBoolean
  robotfoobar: StringBoolean
}
