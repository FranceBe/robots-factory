import { ActivityType, InfoType } from 'hooks/useActivity/useActivity'
import { palette } from 'styles/variables'

export const nameByActivity: Record<string, ActivityType> = {
  bar: 'bar',
  foo: 'foo',
  foobar: 'foobar',
  moving: 'moving',
  robot: 'robot',
}

export const emptyInfo: InfoType = {
  iconInfo: undefined,
  textInfo: '',
}

export const infoByActivity: Record<string, Record<string, InfoType>> = {
  bar: {
    current: {
      iconInfo: {
        spin: true,
        type: 'spinner',
      },
      textInfo: 'Le robot est en train de miner du Bar. Cela prend entre 0.5 et 2s / Bar.',
    },
    failure: emptyInfo,
    success: {
      iconInfo: { color: palette.green_primary, type: 'success' },
      textInfo: "Le robot a fini d'assembler un Bar.",
    },
  },
  foo: {
    current: {
      iconInfo: { spin: true, type: 'spinner' },
      textInfo: 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.',
    },
    failure: emptyInfo,
    success: {
      iconInfo: { color: palette.green_primary, type: 'success' },
      textInfo: "Le robot a fini d'assembler un Foo.",
    },
  },
  foobar: {
    current: {
      iconInfo: {
        spin: true,
        type: 'spinner',
      },
      textInfo:
        "Le robot est en train d'assembler un Foobar. Cela prend 2s et a 60% de chance de succès.",
    },
    failure: {
      iconInfo: { color: palette.red_primary, type: 'failure' },
      textInfo:
        "Echec : Le robot n'a pas assemblé de Foobar, le Bar a pu être sauvé mais le Foo est perdu.",
    },
    success: {
      iconInfo: { color: palette.green_primary, type: 'success' },
      textInfo: "Succès : Le robot a fini d'assembler un Foobar.",
    },
  },
  moving: {
    current: {
      iconInfo: {
        type: 'moving',
      },
      textInfo: "Le robot est en train de changer d'activité. Cela prend 5s.",
    },
    failure: emptyInfo,
    success: emptyInfo,
  },
  robot: {
    current: emptyInfo,
    failure: emptyInfo,
    success: {
      iconInfo: {
        color: palette.green_primary,
        type: 'success',
      },
      textInfo: 'Succès : Le robot a acheté un nouveau robot.',
    },
  },
}

export const timeBaseByActivity: Record<string, number> = {
  foo: 1,
  foobar: 2,
  moving: 5,
  robot: 0,
}
