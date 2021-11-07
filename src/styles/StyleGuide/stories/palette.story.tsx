import { Meta } from '@storybook/react/types-6-0'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import * as styledGuide from 'styles/variables'

const StorybookTitle = styled.h1`
  color: grey;
`

const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`

const OneColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 200px;
  padding: 10px;
`
const Label = styled.div`
  display: flex;
  justify-content: center;
  width: 192px;
`

const Color = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  height: 200px;
  width: 200px;
  border: 1px solid ${styledGuide.palette.grey_primary};
`
const ColorComponent = ({ name, color }: { name: string; color: string }): ReactElement => (
  <OneColorContainer key={`${name}-${color}`}>
    <Label>{name.split('_').join(' ')}</Label>
    <Label> {color} </Label>
    <Color color={color} />
  </OneColorContainer>
)

const renderColor = (color: [string, string]) => (
  <ColorComponent key={color[0]} name={color[0]} color={color[1]} />
)

const ColorsComponent = (): ReactElement => (
  <>{Object.entries(styledGuide.palette).map((color: [string, string]) => renderColor(color))}</>
)

export default {
  title: 'StyleGuide/Palette',
} as Meta

export const Palette = (): ReactElement => (
  <>
    <StorybookTitle>Couleurs</StorybookTitle>
    <ColorsContainer>
      <ColorsComponent />
    </ColorsContainer>
  </>
)
