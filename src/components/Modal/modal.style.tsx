import styled from 'styled-components'
import { fontSizes, palette } from 'styles/variables'

export const ModalContent = styled.div`
  text-align: center;
  font-size: ${fontSizes.medium};
  span {
    color: ${palette.green_primary};
  }
`

export const modalStyle = {
  content: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    left: '50%',
    marginRight: '-50%',
    right: '30%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 4,
  },
}
