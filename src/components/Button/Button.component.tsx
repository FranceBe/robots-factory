import { ButtonContainer, ContentContainer } from 'components/Button/button.style'
import { ButtonProps } from 'components/Button/types/button'
import { Icon } from 'components/Icon'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { palette } from 'styles/variables'

export const Button: React.FC<ButtonProps> = ({
  buttonType = 'primary',
  isActive = false,
  tooltipText,
  uniqueIndex = '1',
  ...rest
}) => {
  return (
    <div
      data-tip={tooltipText}
      data-html={true}
      data-for={`button-tooltip${uniqueIndex}`}
      data-testid={'button-container'}
    >
      <ButtonContainer buttontype={buttonType} {...rest}>
        <ContentContainer>{rest.children}</ContentContainer>
        {isActive && <Icon type={'robot'} />}
        <ReactTooltip
          html={true}
          backgroundColor={palette.white}
          textColor={palette.grey_primary}
          id={`button-tooltip${uniqueIndex}`}
        />
      </ButtonContainer>
    </div>
  )
}

export default Button
