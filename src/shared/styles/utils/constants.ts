// Ideal for use in JS, e.g. timeout
export const TRANSITION_SPEEDS_RAW = {
  FAST: 200,
  BASE: 300,
  STEADY: 400,
  SLOW: 600,
}

// Ideal for use in CSS
export const TRANSITION_SPEEDS = {
  FAST: `${TRANSITION_SPEEDS_RAW.FAST}ms`,
  BASE: `${TRANSITION_SPEEDS_RAW.BASE}ms`,
  STEADY: `${TRANSITION_SPEEDS_RAW.STEADY}ms`,
  SLOW: `${TRANSITION_SPEEDS_RAW.SLOW}ms`,
}
