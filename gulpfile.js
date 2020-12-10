var gulp = require('gulp');
var clean = require('gulp-clean');
var image = require("gulp-image");
var assetManifest = require('gulp-asset-manifest');
var rev = require('gulp-rev');
//build typescript
var rollup = require('rollup');
var rollupTypescript = require('rollup-plugin-typescript2');

//1.clean release
gulp.task('clean', function () {
    //  /*   递归所有
    //  /**  当前目录所有
    //  /*.* 所有文件
    return gulp.src(['release/web/*', '!release/web/version.json'], {
            read: false,
            force: true
        })
        .pipe(clean());
});

//2.compiler project
gulp.task("build", async function () {
    var watch = rollup.watch({
        watch: {
            skipWrite: false,
            clearScreen: false,
            include: 'src/**/*', //  string | RegExp | (string | RegExp)[];
            //exclude: 'node_modules/**',//  string | RegExp | (string | RegExp)[];
            // chokidar: { //ChokidarOptions;
            //     paths: 'src/**/*',
            //     usePolling: false
            // }
            buildDelay: 100
        },
        input: "src/Main.ts",
        treeshake: false, //建议忽略
        output: {
            file: 'bin/js/bundle.js',
            format: 'iife', //iife
            extend: true,
            name: 'bundle'
        },
        plugins: [
            rollupTypescript()
        ]
    });
    watch.on("change", function(evt) {
        console.log("change:", evt);
    });
    watch.on("close", function(evt) {
        console.log("close:", evt);
    });
    watch.on("event", function(evt) {
        if(evt.code!="BUNDLE_END")
        console.log("event:", evt);
    });
    watch.on("restart", function(evt) {
        console.log("restart:", evt);
    });
    var subTask = await rollup.rollup({
        onwarn:(waring,warn)=>{
			if(waring.code == "CIRCULAR_DEPENDENCY"){
				console.log("warnning Circular dependency:");
				console.log(waring);
			}
		},
        input: "src/Main.ts",
        output: {
            file: 'bin/js/bundle.js',
            format: 'iife', //iife
            extend: true,
            name: 'bundle'
        },
        plugins: [
            rollupTypescript()
        ]
    });
});

//3.copy bin to release
gulp.task("copyFile", function () {
    var baseCopyFilter = [`./bin/**/*.*`, `!./bin/version.json`, `!./bin/common/*.*`];
    var stream = gulp.src(baseCopyFilter, {
        base: `./bin`
    });
    return stream.pipe(gulp.dest('release/web/'));
});

//4.compress image
gulp.task('compressimage', function () {
    return gulp.src('./release/web/**/*.*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: false,
            jpegRecompress: false,
            mozjpeg: false, //jpg
            gifsicle: false, //gif
            svgo: true,
            concurrent: 10, //并发数
            quiet: true // defaults to false
        }))
        .pipe(gulp.dest('./release/web'));
});

//5.gen version.json
gulp.task('genmanifest', function () {
    return gulp.src('release/web/**/*.*')
        // .pipe(sass())
        .pipe(rev()) // Optional
        .pipe(assetManifest({
            log: false,
            includeRelativePath: true,
            manifestFile: "release/web/version.json"
        }));
    // .pipe(gulp.dest('dist')); output manifest files
});

//gulp入口
gulp.task('default', gulp.series(
    gulp.parallel('build')
));

//gulp发布入口
gulp.task('publish', gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('build'),
    gulp.parallel('copyFile'),
    gulp.parallel('compressimage'),
    gulp.parallel('genmanifest')
));