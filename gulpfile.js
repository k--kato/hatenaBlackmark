const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const cssnext = require('cssnext');
const precss = require('precss');

const css_dir = [
    './src/css/**/*.css'
];

// PostCSS
gulp.task('css', function () {
    const processors = [
        stylelint()
        , reporter({clearMessages: true})
        , autoprefixer({browsers: ['last 2 version']})
        , cssnext
        , precss
        , mqpacker
        , csswring
    ];
    return gulp.src(css_dir)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest/css'));
});


// Watch    
gulp.task('watch', function () {
    gulp.watch(css_dir, [
        'css'
    ]);
});


// Default Task
gulp.task('default', [
    'css'
    , 'watch'
]);

