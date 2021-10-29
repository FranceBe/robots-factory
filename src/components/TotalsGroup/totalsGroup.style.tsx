import styled from 'styled-components'

export const CardContainer = styled.div`
  //position: fixed;
  width: 90%;
  .totals-component:not(:nth-last-child(2)) {
    margin-bottom: 8px;
  }
  .totals-component:nth-last-child(2) {
    margin-bottom: 16px;
  }
`
