/**
 * The tests for our components need React, because we are using the new
 * technology of shallow rendering, so we are passing to the renderer
 * a component in jsx format, which will be of course replaced by Babel with
 * React.createElement(...).
 *
 * @see https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
 *
 * If React is not defined global or is not included in every test suite,
 * every test will fail, because React is undefined.
 *
 * We have prefered to set React global.
 */
global.React = require('react');
