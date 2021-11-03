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
