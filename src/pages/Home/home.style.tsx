import styled from 'styled-components'
import { palette, spaces } from 'styles/variables'

export const Title = styled.h1`
  text-align: center;
  margin-top: ${spaces.medium};
  margin-bottom: ${spaces.xx_large};
`

export const TitleContainer = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  top: 0;
  background-color: ${palette.grey_quaternary};
`
export const TotalsGroupContainer = styled.div`
  width: 30%;
  position: fixed;
  right: 0;
`

export const ContentContainer = styled.div`
  display: flex;
  position: relative;
  top: 101px;
  justify-content: space-between;
`

export const RobotsManagementContainer = styled.div`
  width: 70%;
  margin-bottom: ${spaces.medium};
  > div {
    margin-bottom: 16px;
  }
`
