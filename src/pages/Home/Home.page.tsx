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
import React, { useEffect, useMemo, useState } from 'react'
import { robotsToWin } from 'utils/settings'

export const Home: React.FC = () => {
  const { resetContext, ...context } = useRobotsContext()
  const { robot } = context
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (robot === robotsToWin) {
      setModalOpen(true)
    }
  }, [robot])

  const resetGame = () => {
    resetContext()
    setModalOpen(false)
  }

  const robotLines = useMemo(() => [...Array(robot)], [robot])

  return (
    <>
      <TitleContainer>
        <Title> Robots Factory </Title>
      </TitleContainer>
      <ContentContainer>
        <RobotsManagementContainer>
          {robotLines.map((undefinedItem, index: number) => (
            <RobotManager key={`robot-${index + 1}`} robotId={index + 1} shouldStop={isModalOpen} />
          ))}
        </RobotsManagementContainer>
        <TotalsGroupContainer>
          <TotalsGroup
            totals={{
              bar: context.bar,
              foo: context.foo,
              foobar: context.foobar,
              robot: context.robot,
            }}
          />
        </TotalsGroupContainer>
      </ContentContainer>
      <Modal isOpen={isModalOpen} onButtonClick={resetGame} buttonText={'Fermer'}>
        <>
          <p>
            Vous avez obtenu <span>{robotsToWin} robots</span>. Bravo !
          </p>
          <p>Le jeu est maintenant terminé.</p>
          <p>En cliquand sur "Fermer", le jeu sera remis à 0.</p>
        </>
      </Modal>
    </>
  )
}

export default Home
