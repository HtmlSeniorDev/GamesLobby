const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndex: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appESLintConfig: resolveApp('.eslintrc'),
  appStyleLintConfig: resolveApp('.stylelintrc'),
};
