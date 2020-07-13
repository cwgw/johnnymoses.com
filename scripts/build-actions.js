#!usr/bin/env node
const ACTIONS_DIR = `./.github/actions`

const path = require('path');
const fs = require('fs-extra')
const ncc = require('@zeit/ncc');
const util = require('util')

buildActions();

async function buildActions() {
  const actions = fs.readdirSync(ACTIONS_DIR);
  const buildTasks = actions.map(async file => {
    const root = path.resolve(ACTIONS_DIR, file);

    let isDir;
    try {
      const stats = await fs.stat(root)
      isDir = stats.isDirectory();
    } catch (error) {
      exitWithError(error);
    }

    if (!isDir) {
      return Promise.resolve();
    }

    let input;
    try {
      if (fs.existsSync(path.resolve(root, 'index.js'))) {
        input = path.resolve(root, 'index.js');
      } else {
        console.log(`Couldn't find input for action "${file}"`)
        return Promise.resolve();
      }
    } catch (error) {
      exitWithError(error);
    }
    
    try {
      const output = path.resolve(root, 'dist');
      await fs.ensureDir(output);
      await fs.emptyDir(output);
      const { code, map, assets } = await ncc(input, {
        minify: true,
        sourceMap: true,
      });
      await fs.writeFile(
        path.resolve(output, 'index.js'),
        code
      );
      if (map) {
        await fs.writeFile(
          path.resolve(output, 'index.map.js'),
          map
        );
      }
      if (assets) {
        await Promise.all(Object.entries(assets).map(
          ([file, { source }]) => fs.writeFile(
            path.resolve(output, file),
            source
          )
        ));
      }
    } catch(error) {
      exitWithError(error);
    }
  })

  try {
    await Promise.all(buildTasks);
  } catch (error) {
    exitWithError(error);
  }

  console.log(
    `Successfully built ${actions.length} action(s):\n\t${actions.join("\n\t")}`
  );
}

function exitWithError(error) {
  console.error(error);
  process.exit(1);
}