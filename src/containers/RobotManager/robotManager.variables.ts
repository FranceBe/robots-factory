import { IconProps } from 'components/Icon/types/icon'
import { ContextType } from 'hooks/types/globalContext'
import { palette } from 'styles/variables'

// Create constants for each activity matching ContextType keys
export const fooName: keyof ContextType = 'foo'
export const barName: keyof ContextType = 'bar'
export const foobarName: keyof ContextType = 'foobar'
export const robotName: keyof ContextType = 'robot'

// Create an object matching an activity and its associated info text
export const infosText: Record<string, string> = {
  bar: 'Le robot est en train de miner du Bar. Cela prend entre 0.5 et 2s / Bar.',
  bar_success: "Le robot a fini d'assembler un Bar.",
  foo: 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.',
  foo_success: "Le robot a fini d'assembler un Foo.",
  foobar:
    "Le robot est en train d'assembler un Foobar. Cela prend 2s et a 60% de chance de succès.",
  foobar_fail:
    "Echec : Le robot n'a pas assemblé de Foobar, le Bar a pu être sauvé mais le Foo est perdu.",
  foobar_success: "Succès : Le robot a fini d'assembler un Foobar.",

  moving: "Le robot est en train de changer d'activité. Cela prend 5s.",
  robot: 'Succès : Le robot a acheté un nouveau robot.',
}

// Create an object matching an activity and its associated info icon
export const infosIcon: Record<string, IconProps> = {
  bar: { spin: true, type: 'spinner' },
  bar_success: { color: palette.green_primary, type: 'success' },
  foo: { spin: true, type: 'spinner' },
  foo_success: { color: palette.green_primary, type: 'success' },
  foobar: { spin: true, type: 'spinner' },
  foobar_fail: { color: palette.red_primary, type: 'failure' },
  foobar_success: { color: palette.green_primary, type: 'success' },
  moving: { type: 'moving' },
  robot: { color: palette.green_primary, type: 'success' },
}

// Create an object matching an activity and its associated timeBase
export const timeBases: Record<string, number> = {
  foo: 1,
  foobar: 2,
  moving: 5,
  robot: 0,
}

// Create an object matching an activity and its associated tooltip texts
export const tooltipTexts: Record<string, string> = {
  foobar:
    '<p>Requiert <span class="foobar-foo">1 Foo</span> et <span class="foobar-bar">1 Bar</span>.</p>',
  robot:
    '<p>Requiert <span class="robot-foobar">3 Foobar</span>  et <span class="robot-foo">6 Foo</span>.</p>',
}

// Create objects matching an activity and its associated resource requirements
export const requirementsForAFoobar: Record<string, number> = {
  bar: 1,
  foo: 1,
}

export const requirementsForARobot: Record<string, number> = {
  foo: 6,
  foobar: 3,
}
