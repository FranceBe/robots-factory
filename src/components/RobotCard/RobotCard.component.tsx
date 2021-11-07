// Robot card component
// This component represent a robot's action
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { LoadingBar } from 'components/LoadingBar'
import { RobotCardProps } from 'components/RobotCard/robotCard'
import {
  ButtonsAndLoadingContainer,
  ButtonsContainer,
  CardBackground,
  InfoContainer,
  LoadingAndInfoContainer,
  RobotsContainer,
} from 'components/RobotCard/robotCard.style'
import React from 'react'
import { IconEnum, ThemeType } from 'utils/common.enum'

export const RobotCard: React.FC<RobotCardProps> = ({
  fooButton,
  barButton,
  foobarButton,
  robotButton,
  loadingBar,
  iconInfo,
  textInfo,
  robotId,
}) => {
  return (
    <CardBackground data-testid={'robot-card'}>
      <RobotsContainer>
        <Icon type={IconEnum.robot} size={'3x'} />
        <span>Robot {robotId}</span>
      </RobotsContainer>
      <ButtonsAndLoadingContainer>
        <ButtonsContainer>
          <Button {...fooButton} buttonType={ThemeType.primary}>
            Miner Foo
          </Button>
          <Button {...barButton} buttonType={ThemeType.primary}>
            Miner Bar
          </Button>
          <Button {...foobarButton} buttonType={ThemeType.primary}>
            Assembler Foobar
          </Button>
          <Button {...robotButton} buttonType={ThemeType.secondary}>
            Acheter un robot
          </Button>
        </ButtonsContainer>
        <LoadingAndInfoContainer>
          <LoadingBar {...loadingBar} />
          <InfoContainer>
            {iconInfo && <Icon {...iconInfo} />}
            <span>{textInfo}</span>
          </InfoContainer>
        </LoadingAndInfoContainer>
      </ButtonsAndLoadingContainer>
    </CardBackground>
  )
}

export default RobotCard
