const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

//IMAGENES 
const avif = require('gulp-avif');


function css (done) {
    src("src/scss/**/*.scss") //Identificar el archivo SASS
    .pipe( plumber())
    .pipe(sass()) //Compilarlo 
    .pipe(dest("build/css")); //Almacenarlo en el disco duro

    done(); //Callback, avisa a gulp cuando terminamos de ejecutar la funcion
}

async function versionWebp (done){
    const webp = await  import('gulp-webp');
    const opciones = {
        quality : 50   
    }

    src('src/img/**/*.{jpg,JPG,png,PNG}')
        .pipe(webp.default(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif( done ){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,JPG,png,PNG}')
        .pipe ( avif(opciones) )
        .pipe ( dest('build/img'))

    done();
}

function dev (done) {
    watch("src/scss/**/*.scss", css)

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (versionWebp, versionAvif, dev);