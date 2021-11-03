import { StyledContainerProps } from 'containers/RobotManager/robotManager'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { palette } from 'styles/variables'

export const RobotManagerContainer = styled((props: PropsWithChildren<StyledContainerProps>) => (
  <div {...props} />
))`
  .foobar-foo {
    color: ${(props) => (props.foobarfoo === 'true' ? palette.green_primary : palette.red_primary)};
  }
  .foobar-bar {
    color: ${(props) => (props.foobarbar === 'true' ? palette.green_primary : palette.red_primary)};
  }
  .robot-foobar {
    color: ${(props) =>
      props.robotfoobar === 'true' ? palette.green_primary : palette.red_primary};
  }
  .robot-foo {
    color: ${(props) => (props.robotfoo === 'true' ? palette.green_primary : palette.red_primary)};
  }
`
