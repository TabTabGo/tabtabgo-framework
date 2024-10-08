/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('fast-glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');
const srcPath = path.join(packagePath, './src');

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await copyFile(sourcePath, targetPath)
}

async function copyFile(sourcePath, targetPath) {
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}
/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@material-ui/core/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in TypeScript by checking
 * if an index.d.ts is present at that path.
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob.sync('*/index.{js,ts,tsx}', { cwd: from }).map(path.dirname);

  await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageJson = {
        sideEffects: false,
        module: './index.js',
        main: path.posix.join('../node', directoryPackage, 'index.js'),
        types: './index.d.ts',
      };

      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      const typingsPath = path.join(to, directoryPackage, 'index.d.ts');

      const [typingsExist] = await Promise.all([
        fse.pathExists(typingsPath),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]);

      if (!typingsExist) {
        throw new Error(`index.d.ts for ${directoryPackage} is missing. Path: '${typingsPath}'`);
      }

      return packageJsonPath;
    }),
  );
}

async function typescriptCopy({ from, to }) {
  if (!(await fse.pathExists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = await glob('**/*.d.ts', { cwd: from });
  const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function copyNonCodeFile({ from, to }) {
  if (!(await fse.pathExists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }
  const exst = ["css", "scss", "json", "png", "img"];
  var fPath = "**";
  var files = await glob(exst.map(ex => `${fPath}/*.${ex}`), { cwd: from });;
  //console.log(files);
  const cmds = files.map((file) => ({
    source: path.resolve(from, file),
    target: path.resolve(to, file)
  })).map((file) => copyFile(file.source, file.target));

  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { gitHead, scripts, devDependencies, workspaces, files, ...packageDataOther } = JSON.parse(
    packageData,
  );

  const newPackageData = {
    ...packageDataOther,
    private: false,
    // Not required for now
    // ...(packageDataOther.main
    //   ? {
    //       main: fse.existsSync(path.resolve(buildPath, './node/index.js'))
    //         ? './node/index.js'
    //         : './index.js',
    //       module: fse.existsSync(path.resolve(buildPath, './esm/index.js'))
    //         ? './esm/index.js'
    //         : './index.js',
    //     }
    //   : {}),
    //types: './index.d.ts',
  };

  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
  const license = `/** @license TabTabGo v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    [
      './index.js',
      './legacy/index.js',
      './modern/index.js',
      './node/index.js',
    ].map(async (file) => {
      try {
        await prepend(path.resolve(buildPath, file), license);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`Skipped license for ${file}`);
        } else {
          throw err;
        }
      }
    }),
  );
}

async function run() {
  try {
    const packageData = await createPackageFile();

    await Promise.all(
      [
        './README.md',
        '../../CHANGELOG.md',
        '../../LICENSE',
      ].map((file) => includeFileInBuild(file)),
    );
    await copyNonCodeFile({ from: srcPath, to: buildPath });
    // TODO add license    
    //await addLicense(packageData);
    // TypeScript
    //await typescriptCopy({ from: srcPath, to: buildPath });
    //await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
