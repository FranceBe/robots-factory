import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { LoadingBar } from 'components/LoadingBar'
import {
  ButtonsAndLoadingContainer,
  ButtonsContainer,
  CardBackground,
  InfoContainer,
  LoadingAndInfoContainer,
  RobotsContainer,
} from 'components/RobotCard/robotCard.style'
import { RobotCardProps } from 'components/RobotCard/types/robotCard'
import React from 'react'

export const RobotCard: React.FC<RobotCardProps> = ({
  buttons,
  loadingBar,
  iconInfo,
  textInfo,
  robotId,
}) => {
  return (
    <CardBackground>
      <RobotsContainer>
        <Icon type={'robot'} size={'3x'} />
        <span>Robot {robotId}</span>
      </RobotsContainer>
      <ButtonsAndLoadingContainer>
        <ButtonsContainer>
          {buttons &&
            buttons.map((button, index) => <Button key={`button-${index}`} {...button} />)}
        </ButtonsContainer>
        <LoadingAndInfoContainer>
          <LoadingBar {...loadingBar} />
          <InfoContainer>
            <Icon {...iconInfo} />
            <span>{textInfo}</span>
          </InfoContainer>
        </LoadingAndInfoContainer>
      </ButtonsAndLoadingContainer>
    </CardBackground>
  )
}

export default RobotCard
