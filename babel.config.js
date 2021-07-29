module.exports = {
  presets: [["@babel/preset-env", { targets: { esmodules: true, node: true } }]],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    ["@babel/plugin-transform-react-jsx"],
  ],
};
