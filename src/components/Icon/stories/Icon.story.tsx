import { Meta } from '@storybook/react/types-6-0'
import { Icon } from 'components/Icon'
import React from 'react'
import { palette } from 'styles/variables'
import { IconEnum } from 'utils/common.enum'

export default {
  component: Icon,
  title: 'Components/Icon',
} as Meta

export const Icons: React.FC = () => (
  <>
    <div>
      <Icon type={IconEnum.robot} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.spinner} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.success} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.failure} />
    </div>
    <div>
      <Icon type={IconEnum.moving} />
    </div>
  </>
)

export const IconsWithCustomSizes: React.FC = () => (
  <>
    <div>
      <Icon type={IconEnum.robot} size={'1x'} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.spinner} size={'2x'} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.success} size={'3x'} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.failure} size={'4x'} />
    </div>
    <div>
      <Icon type={IconEnum.moving} size={'5x'} />
    </div>
  </>
)

export const IconsWithAnimation: React.FC = () => <Icon type={IconEnum.spinner} spin />

export const IconsWithCustomColors: React.FC = () => (
  <>
    <div>
      <Icon type={IconEnum.robot} color={palette.blue_primary} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.spinner} color={palette.pink_primary} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.success} color={palette.green_primary} />
    </div>
    <br />
    <div>
      <Icon type={IconEnum.failure} color={palette.red_primary} />
    </div>
    <div>
      <Icon type={IconEnum.moving} color={palette.grey_primary} />
    </div>
  </>
)
