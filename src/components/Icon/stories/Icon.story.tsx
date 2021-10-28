import { Meta } from '@storybook/react/types-6-0'
import Icon from 'components/Icon'
import React from 'react'
import { palette } from 'styles/variables'

export default {
  component: Icon,
  title: 'Components/Icon',
} as Meta

export const Icons: React.FC = () => (
  <>
    <div>
      <Icon type={'robot'} />
    </div>
    <br />
    <div>
      <Icon type={'spinner'} />
    </div>
    <br />
    <div>
      <Icon type={'success'} />
    </div>
    <br />
    <div>
      <Icon type={'failure'} />
    </div>
  </>
)

export const IconsWithCustomSizes: React.FC = () => (
  <>
    <div>
      <Icon type={'robot'} size={'1x'} />
    </div>
    <br />
    <div>
      <Icon type={'spinner'} size={'2x'} />
    </div>
    <br />
    <div>
      <Icon type={'success'} size={'3x'} />
    </div>
    <br />
    <div>
      <Icon type={'failure'} size={'4x'} />
    </div>
  </>
)

export const IconsWithAnimation: React.FC = () => (
  <>
    <div>
      <Icon type={'robot'} spin />
    </div>
    <br />
    <div>
      <Icon type={'spinner'} spin />
    </div>
    <br />
    <div>
      <Icon type={'success'} spin />
    </div>
    <br />
    <div>
      <Icon type={'failure'} spin />
    </div>
  </>
)

export const IconsWithCustomColors: React.FC = () => (
  <>
    <div>
      <Icon type={'robot'} color={palette.blue_primary} />
    </div>
    <br />
    <div>
      <Icon type={'spinner'} color={palette.pink_primary} />
    </div>
    <br />
    <div>
      <Icon type={'success'} color={palette.green_primary} />
    </div>
    <br />
    <div>
      <Icon type={'failure'} color={palette.red_primary} />
    </div>
  </>
)
