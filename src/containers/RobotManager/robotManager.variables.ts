import { requirement } from 'utils/settings'

// Create an object matching an activity and its associated tooltip texts
const { foo: fooForFoobar, bar: barForFoobar } = requirement.foobar
const { foo: fooForRobot, foobar: foobarForRobot } = requirement.robot
export const tooltipTexts: Record<string, string> = {
  foobar: `<p>Requiert <span class="foobar-foo">${fooForFoobar} Foo</span> et <span class="foobar-bar">${barForFoobar} Bar</span>.</p>`,
  robot: `<p>Requiert <span class="robot-foobar">${foobarForRobot} Foobar</span>  et <span class="robot-foo">${fooForRobot} Foo</span>.</p>`,
}

// Create objects matching an activity and its associated resource requirements
export const requirementsForAFoobar: Record<string, number> = {
  bar: requirement.foobar.bar,
  foo: requirement.foobar.foo,
}

export const requirementsForARobot: Record<string, number> = {
  foo: requirement.robot.foo,
  foobar: requirement.robot.foobar,
}
