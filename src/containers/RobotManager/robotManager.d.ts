import { IconProps } from 'components/Icon/icon'

export type InfoType = { iconInfo: IconProps | undefined; textInfo: string }

export type RobotManagerProps = { robotId: number; shouldStop?: boolean }

type StringBoolean = 'true' | 'false'

export type StyledContainerProps = {
  foobarfoo: StringBoolean
  foobarbar: StringBoolean
  robotfoo: StringBoolean
  robotfoobar: StringBoolean
}
