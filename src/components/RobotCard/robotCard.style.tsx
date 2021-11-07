import styled from 'styled-components'
import { fontSizes, palette, spaces } from 'styles/variables'

export const CardBackground = styled.div`
  background-color: ${palette.white};
  padding: ${spaces.regular};
  border-radius: ${spaces.x_small};
  display: flex;
  align-items: center;
  width: fit-content;
`

export const RobotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${spaces.regular};
  svg {
    margin-bottom: ${spaces.small};
  }
`

export const ButtonsAndLoadingContainer = styled.div``

export const ButtonsContainer = styled.div`
  display: flex;
  button {
    margin: ${spaces.small};
  }
`

export const LoadingAndInfoContainer = styled.div`
  margin: ${spaces.small};
`
export const InfoContainer = styled.div`
  min-height: ${fontSizes.medium};
  margin-top: ${spaces.small};
  display: flex;
  align-items: center;
  svg {
    margin-right: ${spaces.small};
  }
`
