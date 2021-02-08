/**
 * Using @material-ui babel.config.js
 */
const path = require('path');

const defaultAlias = {
  '@tabtabgo/core': './packages/core/src',
  '@tabtabgo/web': './packages/web/src',
};

const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements',
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['legacy', 'modern', 'stable', 'rollup']);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    // Not required for now
    // [
    //   'babel-plugin-macros',
    //   {
    //     muiError: {
    //       errorCodesPath,
    //       missingError,
    //     },
    //   },
    // ],
    'babel-plugin-optimize-clsx',
    // Need the following 3 proposals for all targets in .browserslistrc.
    // With our usage the transpiled loose mode is equivalent to spec mode.
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules,
        // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
        version: '^7.4.4',
      },
    ],
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(...productionPlugins);
  }
  if (process.env.NODE_ENV === 'test') {
    plugins.push([
      'babel-plugin-module-resolver',
      {
        alias: defaultAlias,
        root: ['./'],
      },
    ]);
  }

  const babelConfig = {
    presets,
    plugins    
  };
  console.log("babel Config:", babelConfig)
  return babelConfig;
};
