'use strict';
module.exports = function( grunt ) {

    // load all grunt tasks matching the `grunt-*` pattern
    // Ref. https://npmjs.org/package/load-grunt-tasks
    require( 'load-grunt-tasks' )( grunt );

    grunt.initConfig( {
        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: [ 'admin/sass/**/*.{scss,sass}', 'public/sass/**/*.{scss,sass}' ],
                tasks: [ 'sass' ]
            },
            autoprefixer: {
                files: [ 'admin/css/*css', 'public/css/*css' ],
                tasks: [ 'autoprefixer' ]
            },
            js: {
                files: [ '<%= uglify.frontend.src %>', '<%= uglify.backend.src %>' ],
                tasks: [ 'uglify' ]
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: [ '*.php', '*.css' ]
            }
        },
        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'admin/css/buddy-views-admin.css': 'admin/sass/buddy-views-admin.scss',
                    'public/css/buddy-views.css': 'public/sass/buddy-views.scss'
                }
            },
            minify: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'admin/css/buddy-views-admin.min.css': 'admin/sass/buddy-views-admin.scss',
                    'public/css/buddy-views.min.css': 'public/sass/buddy-views.scss'
                }
            }
        },
        // autoprefixer
        autoprefixer: {
            dist: {
                options: {
                    browsers: [ 'last 2 versions', 'ie 9', 'ios 6', 'android 4' ],
                    expand: true,
                    flatten: true
                },
                files: {
                    'public/css/buddy-views.css': 'public/css/buddy-views.css',
                    'public/css/buddy-views.min.css': 'public/css/buddy-views.min.css',
                    'admin/css/buddy-views-admin.css': 'admin/css/buddy-views-admin.css',
                    'admin/css/buddy-views-admin.min.css': 'admin/css/buddy-views-admin.min.css'
                }
            }
        },
        // Uglify Ref. https://npmjs.org/package/grunt-contrib-uglify
        uglify: {
            options: {
                banner: '/*! \n * BuddyViews JavaScript Library \n * @package BuddyViews \n */\n',
            },
            frontend: {
                src: [
                    'public/js/buddy-views.js'
                ],
                dest: 'public/js/buddy-views.min.js'
            },
            backend: {
                src: [
                    'admin/js/buddy-views-admin.js'
                ],
                dest: 'admin/js/buddy-views-admin.min.js'
            }
        },
        checktextdomain: {
            options: {
                text_domain: 'buddy-views', //Specify allowed domain(s)
                keywords: [ //List keyword specifications
                    '__:1,2d',
                    '_e:1,2d',
                    '_x:1,2c,3d',
                    'esc_html__:1,2d',
                    'esc_html_e:1,2d',
                    'esc_html_x:1,2c,3d',
                    'esc_attr__:1,2d',
                    'esc_attr_e:1,2d',
                    'esc_attr_x:1,2c,3d',
                    '_ex:1,2c,3d',
                    '_n:1,2,4d',
                    '_nx:1,2,4c,5d',
                    '_n_noop:1,2,3d',
                    '_nx_noop:1,2,3c,4d'
                ]
            },
            target: {
                files: [ {
                        src: [
                            '*.php',
                            '**/*.php',
                            '!node_modules/**',
                            '!tests/**'
                        ], //all php
                        expand: true
                    } ]
            }
        },
        makepot: {
            target: {
                options: {
                    cwd: '.', // Directory of files to internationalize.
                    domainPath: 'languages/', // Where to save the POT file.
                    exclude: [ 'node_modules/*' ], // List of files or directories to ignore.
                    mainFile: 'index.php', // Main project file.
                    potFilename: 'buddy-views.pot', // Name of the POT file.
                    potHeaders: { // Headers to add to the generated POT file.
                        poedit: true, // Includes common Poedit headers.
                        'Last-Translator': 'Sanket Parmar <sanket.parmar11@gmail.com>',
                        'Language-Team': 'Littlemonks <teamlittlemonks@gmail.com>',
                        'report-msgid-bugs-to': 'https://github.com/LittleMonks/buddy-views/issues',
                        'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
                    },
                    type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
                    updateTimestamp: true // Whether the POT-Creation-Date should be updated without other changes.
                }
            }
        }

    } );
    // register task
    grunt.registerTask( 'default', [ 'sass', 'autoprefixer', 'uglify', 'checktextdomain', 'makepot', 'watch' ] );
};
