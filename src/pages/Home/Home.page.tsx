// Global Home container
import { TotalsGroup } from 'components/TotalsGroup'
import { RobotManager } from 'containers/RobotManager'
import { useGlobalContext } from 'hooks/globalContext'
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
  const { ...context } = useGlobalContext()
  const { robot } = context
  const [robotLines, setRobotLines] = useState(arrayFromContextRobotLength(context))

  useEffect(() => {
    setRobotLines(arrayFromContextRobotLength(context))
  }, [robot])

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
    </>
  )
}

export default Home
