import { InfoType } from 'hooks/useActivity/useActivity'
import { palette } from 'styles/variables'
import { IconEnum } from 'utils/common.enum'
import { buildFoobarChance, taskTimeByActivity, timeMinMaxForBar } from 'utils/settings'

export const emptyInfo: InfoType = {
  iconInfo: undefined,
  textInfo: '',
}

export const infoByActivity: Record<string, Record<string, InfoType>> = {
  bar: {
    current: {
      iconInfo: {
        spin: true,
        type: IconEnum.spinner,
      },
      textInfo: `Le robot est en train de miner du Bar. Cela prend entre ${timeMinMaxForBar.min} et ${timeMinMaxForBar.max}s / Bar.`,
    },
    failure: emptyInfo,
    success: {
      iconInfo: { color: palette.green_primary, type: IconEnum.success },
      textInfo: "Le robot a fini d'assembler un Bar.",
    },
    undone: emptyInfo,
  },
  foo: {
    current: {
      iconInfo: { spin: true, type: IconEnum.spinner },
      textInfo: `Le robot est en train de miner du Foo. Cela prend ${taskTimeByActivity.foo}s / Foo.`,
    },
    failure: emptyInfo,
    success: {
      iconInfo: { color: palette.green_primary, type: IconEnum.success },
      textInfo: "Le robot a fini d'assembler un Foo.",
    },
    undone: emptyInfo,
  },
  foobar: {
    current: {
      iconInfo: {
        spin: true,
        type: IconEnum.spinner,
      },
      textInfo: `Le robot est en train d'assembler un Foobar. Cela prend ${taskTimeByActivity.foobar}s et a ${buildFoobarChance}% de chance de succès.`,
    },
    failure: {
      iconInfo: { color: palette.red_primary, type: IconEnum.failure },
      textInfo:
        "Echec : Le robot n'a pas assemblé de Foobar, le Bar a pu être sauvé mais le Foo est perdu.",
    },
    success: {
      iconInfo: { color: palette.green_primary, type: IconEnum.success },
      textInfo: "Succès : Le robot a fini d'assembler un Foobar.",
    },
    undone: emptyInfo,
  },
  moving: {
    current: {
      iconInfo: {
        type: IconEnum.moving,
      },
      textInfo: `Le robot est en train de changer d'activité. Cela prend ${taskTimeByActivity.moving}s.`,
    },
    failure: emptyInfo,
    success: emptyInfo,
    undone: emptyInfo,
  },
  robot: {
    current: emptyInfo,
    failure: emptyInfo,
    success: {
      iconInfo: {
        color: palette.green_primary,
        type: IconEnum.success,
      },
      textInfo: 'Succès : Le robot a acheté un nouveau robot.',
    },
    undone: emptyInfo,
  },
}
