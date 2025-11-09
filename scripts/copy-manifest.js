// scripts/copy-manifest.js
const fs = require('fs')
const path = require('path')

const filesToCopy = ['manifest.json', 'background.js', 'icon-128.png']

filesToCopy.forEach(f => {
  const src = path.join(__dirname, '..', f)
  const dest = path.join(__dirname, '..', 'dist', f)
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log(`Copied ${f} to dist/`)
  } else {
    console.warn(`Skipping missing file ${f}`)
  }
})
