// Global Home container
import { Icon } from 'components/Icon/Icon.component'
import { TotalsProps } from 'components/Totals/types/totals'
import { TotalsGroup } from 'components/TotalsGroup'
import { useGlobalContext } from 'hooks/GlobalContext'
import {
  ContentContainer,
  RobotsManagementContainer,
  Title,
  TitleContainer,
  TotalsGroupContainer,
} from 'pages/Home/home.style'
import React from 'react'

export const Home: React.FC = () => {
  const { foo, bar, foobar, robots } = useGlobalContext()
  const totalsContent: TotalsProps[] = [
    { label: 'Foo', total: foo, type: 'primary' },
    { label: 'Bar', total: bar, type: 'primary' },
    { label: 'Foobar', total: foobar, type: 'primary' },
    { label: <Icon type={'robot'} />, total: robots, type: 'secondary' },
  ]
  return (
    <div>
      <TitleContainer>
        <Title> Robots Factory </Title>
      </TitleContainer>
      <ContentContainer>
        <RobotsManagementContainer />
        <TotalsGroupContainer>
          <TotalsGroup content={totalsContent} />
        </TotalsGroupContainer>
      </ContentContainer>
    </div>
  )
}

export default Home
