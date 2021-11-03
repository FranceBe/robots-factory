// Global Home container
import { Modal } from 'components/Modal'
import { TotalsGroup } from 'components/TotalsGroup'
import { RobotManager } from 'containers/RobotManager'
import { useRobotsContext } from 'contexts/robotsContext'
import {
  ContentContainer,
  RobotsManagementContainer,
  Title,
  TitleContainer,
  TotalsGroupContainer,
} from 'pages/Home/home.style'
import { arrayFromContextRobotLength, getTotalsFromContext } from 'pages/Home/home.utils'
import React, { useEffect, useState } from 'react'

export const Home: React.FC = () => {
  const { resetContext, ...context } = useRobotsContext()
  const { robot } = context
  const [robotLines, setRobotLines] = useState(arrayFromContextRobotLength(context))
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setRobotLines(arrayFromContextRobotLength(context))
    if (robot === 20) {
      setModalOpen(true)
    }
  }, [robot])

  const resetGame = () => {
    resetContext()
    setModalOpen(false)
  }

  return (
    <>
      <TitleContainer>
        <Title> Robots Factory </Title>
      </TitleContainer>
      <ContentContainer>
        <RobotsManagementContainer>
          {robotLines.map((lineKey) => (
            <RobotManager key={`robot-${lineKey + 1}`} robotId={`${lineKey + 1}`} />
          ))}
        </RobotsManagementContainer>
        <TotalsGroupContainer>
          <TotalsGroup content={getTotalsFromContext(context)} />
        </TotalsGroupContainer>
      </ContentContainer>
      <Modal
        isOpen={isModalOpen}
        content={
          <>
            <p>
              Vous avez obtenu <span>20 robots</span>. Bravo !
            </p>
            <p>Le jeu est maintenant terminé.</p>
            <p>En cliquand sur "Fermer", le jeu sera remis à 0.</p>
          </>
        }
        onButtonClick={resetGame}
        buttonText={'Fermer'}
      />
    </>
  )
}

export default Home
