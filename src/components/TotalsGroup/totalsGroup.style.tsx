import styled from 'styled-components'
import { spaces } from 'styles/variables'

export const CardContainer = styled.div`
  width: 90%;
  .totals-component:not(:nth-last-child(2)) {
    margin-bottom: ${spaces.small};
  }
  .totals-component:nth-last-child(2) {
    margin-bottom: ${spaces.regular};
  }
`
