const { task, series, parallel } = require('gulp')
const clean = require('./tasks/clean')
const logger = require('./tasks/logger')
const server = require('./tasks/server')
const stylus = require('./tasks/stylus')
const stylusWatch = require('./tasks/stylusWatch')
const pug = require('./tasks/pug')
const pugWatch = require('./tasks/pugWatch')
const images = require('./tasks/images')
const imagesWatch = require('./tasks/imagesWatch')
const icons = require('./tasks/icons')
const iconsWatch = require('./tasks/iconsWatch')
const assets = require('./tasks/assets')
const assetsWatch = require('./tasks/assetsWatch')
const js = require('./tasks/js')
const jsWatch = require('./tasks/jsWatch')
const svgSprite = require('./tasks/svgSprite')
const svgSpriteWatch = require('./tasks/svgSpriteWatch')

task('clean', clean)
task('logger', logger)
task('server', server)
task('stylus', stylus)
task('stylus:watch', stylusWatch)
task('pug', pug)
task('pug:watch', pugWatch)
task('images', images)
task('images:watch', imagesWatch)
task('icons', icons)
task('icons:watch', iconsWatch)
task('assets', assets)
task('assets:watch', assetsWatch)
task('js', js)
task('js:watch', jsWatch)
task('svgSprite', svgSprite)
task('svgSprite:watch', svgSpriteWatch)

function dev() {
  return series(
    'clean',
    parallel('stylus', 'pug', 'images', 'icons', 'assets', 'js', 'svgSprite'),
    parallel(
      'stylus:watch',
      'pug:watch',
      'images:watch',
      'icons:watch',
      'assets:watch',
      'js:watch',
      'svgSprite:watch',
    ),
    'logger',
    'server',
  )
}

function prod() {
  return series(
    'clean',
    parallel('stylus', 'pug', 'images', 'icons', 'assets', 'js', 'svgSprite'),
  )
}

function deploy() {
  return series(
    'clean',
    parallel('stylus', 'pug', 'images', 'icons', 'assets', 'js', 'svgSprite'),
  )
}

exports.deploy = deploy()

exports.default = process.env.NODE_ENV === 'development' ? dev() : prod()
