/**
 * The tests for our components need React, because we are using JSX to render
 * them, which of course will be replaced by Babel with React.createElement(..).
 *
 * If React is not defined global or is not included in every test suite,
 * every test will fail, because React is undefined.
 *
 * We have prefered to set React global.
 */
global.React = require('react');
