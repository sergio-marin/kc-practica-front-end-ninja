var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');
//var spritesmith = require('gulp.spritesmith');
//var envify = require('envify/custom');
var gutil = require('gulp-util');

// configs
var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist/'
};

var jsConfig = {
    concatJsTaskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/'
};

var uglifyConfig = {
    uglifyTaskName: "uglify",
    src: './dist/main.js',
    dest: './dist/'
};

var fontAwesomeConfig = {
    fontAwesomeTaskName: "fontAwesome",
    src: './node_modules/font-awesome/fonts/*',
    dest: './dist/fonts/'
};

var imagesConfig = {
    imagesTaskName: "optimize-images",
    src: "src/img/*",
    dest: "./dist/img/",
    responsive: {
        'disc-placeholder.jpg': [
            {
                width: 520,
                rename: { suffix: '-520px' }
            },
            {
                width: 320,
                rename: { suffix: '-320px' }
            },
            {
                width: 250,
                rename: { suffix: '-250px' }
            },
            {
                width: 125,
                rename: { suffix: '-125px' }
            }
        ]
    }
};

// definimos la tarea por defecto
gulp.task("default", [
                        sassConfig.compileSassTaskName, 
                        jsConfig.concatJsTaskName,
                        fontAwesomeConfig.fontAwesomeTaskName],
                        //imagesConfig.imagesTaskName], 
    function(){

    // arrancar el servidor de browser sync
    browserSync.init({
        // server: "./"
        proxy: "127.0.0.1:8000" // conectar browsersync con sparrest
    });

    // cuando haya cambios en archivos scss, compila sass
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

    // cuando haya cambios en archivos js, los concatena
    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

    // cuando se cambie el html, recarga el navegador
    gulp.watch('./*.html', function(){
        browserSync.reload();  // recarga navegador
        //notify().write("Navegador recargado"); // mostramos notificación
    });
});

// compila sass
gulp.task(sassConfig.compileSassTaskName, function(){
    gulp.src(sassConfig.entryPoint)    // cargo el style.scss
    .pipe(sourcemaps.init())    // empezamos a capturar los sourcemaps
    .pipe(sass().on('error', function(error){ // compilamos sass
        return notify().write(error); // si ocurre un error, mostramos notifiación
    }))
    //.pipe(postcss([autoprefixer(), cssnano()])) // autoprefija el css y lo minifica
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))   // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(sassConfig.dest))      // dejo el resultado en ./dist/
    .pipe(browserSync.stream())     // recargamos el CSS en el navegador
    //.pipe(notify("SASS Compilado 🤘"));
});

// concatena js
gulp.task(jsConfig.concatJsTaskName, function(){
    gulp.src(jsConfig.entryPoint)
    .pipe(tap(function(file){ // para cada archivo seleccionado
        // lo pasamos por browserify para importar los require
        file.contents = browserify(file.path, { debug:true })
        //.transform(envify(gutil.env))  // nos permite leer variables de entorno con process.env
        .bundle()
        .on('error', function(error){
            return notify().write(error); // si ocurre un error javascript, lanza notificación
        });
    }))
    .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
    .pipe(sourcemaps.init({ loadMaps: true }))    // empezamos a capturar los sourcemaps
    //.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) // minificamos el código si es para producción
    .pipe(sourcemaps.write('./'))   // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(jsConfig.dest))
    //.pipe(notify("JS Concatenado 💪"))
    .pipe(browserSync.stream());
});

// minifica js
gulp.task(uglifyConfig.uglifyTaskName, function(){
    gulp.src(uglifyConfig.src)
    .pipe(uglify())
    .pipe(gulp.dest(uglifyConfig.dest))
    //.pipe(notify("JS Minificado"));
});

//copia FontAwesome
gulp.task(fontAwesomeConfig.fontAwesomeTaskName, function() {
  return gulp.src(fontAwesomeConfig.src)
    .pipe(gulp.dest(fontAwesomeConfig.dest))
})

// optimiza las imagenes
gulp.task(imagesConfig.imagesTaskName, function(){
    gulp.src(imagesConfig.src)
    .pipe(responsive(imagesConfig.responsive))  // genera las imágenes responsive
    .pipe(imagemin())   // optimiza el tamaño de las imagenes
    .pipe(gulp.dest(imagesConfig.dest));
});