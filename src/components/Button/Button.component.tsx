import { ButtonProps } from 'components/Button/button'
import { ButtonContainer, ContentContainer } from 'components/Button/button.style'
import { Icon } from 'components/Icon'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { palette } from 'styles/variables'
import { ThemeType } from 'utils/common.variables'

export const Button: React.FC<ButtonProps> = ({
  buttonType = ThemeType.primary,
  isActive = false,
  tooltipText,
  uniqueIndex = '1',
  ...rest
}) => {
  return (
    <div
      data-tip={tooltipText}
      // data-html and data-for are used
      // with ReactTooltip to allow html in tooltip and link
      // the div with the tooltip
      data-html={true}
      data-for={`button-tooltip${uniqueIndex}`}
      data-testid={'button-container'}
    >
      <ButtonContainer buttontype={ThemeType[buttonType]} {...rest}>
        <ContentContainer>{rest.children}</ContentContainer>
        {isActive && <Icon type={'robot'} />}
        {tooltipText && (
          <ReactTooltip
            html={true}
            backgroundColor={palette.white}
            textColor={palette.grey_primary}
            id={`button-tooltip${uniqueIndex}`}
          />
        )}
      </ButtonContainer>
    </div>
  )
}

export default Button
