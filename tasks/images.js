const { src, dest } = require('gulp')
const image = require('gulp-image');
const gulpif = require('gulp-if')
const newer = require('gulp-newer');

const config = {}

// const production = process.env.NODE_ENV === 'production'
const production = false

module.exports = function() {
  return src('source/images/**/*.*')
    .pipe(newer('dest/images'))
    .pipe(gulpif(production, image(config)))
    .pipe(dest('dest/images'))
}
