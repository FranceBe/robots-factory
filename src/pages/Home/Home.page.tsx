// Global Home container
import { Modal } from 'components/Modal'
import { TotalsGroup } from 'components/TotalsGroup'
import { RobotManager } from 'containers/RobotManager'
import { useGlobalContext } from 'hooks/globalContext'
import { defaultContextValues } from 'hooks/globalContext/globalContext.variables'
import { arrayFromContextRobotLength, getTotalsFromContext } from 'pages/Home/home.service'
import {
  ContentContainer,
  RobotsManagementContainer,
  Title,
  TitleContainer,
  TotalsGroupContainer,
} from 'pages/Home/home.style'
import React, { useEffect, useState } from 'react'

export const Home: React.FC = () => {
  const { setContext, ...context } = useGlobalContext()
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
    setContext(defaultContextValues)
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
            <RobotManager key={`robot-${lineKey + 1}`} robotId={lineKey + 1} />
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
            <p>Le jeu a été remis à 0, vous pouvez fermer cette modale.</p>
          </>
        }
        onButtonClick={resetGame}
        buttonText={'Fermer'}
      />
    </>
  )
}

export default Home
