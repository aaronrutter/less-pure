module.exports = function(grunt) {

    // Show elapsed time
    require('time-grunt')(grunt);
    // -- Config -------------------------------------------------------------------

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),

        // -- bower.json Config ---------------------------------------------------------

        bower_json: {
            release: {
                values: {
                    main: 'pure.css'
                },

                dest: 'build/'
            }
        },

        // -- Clean Config ---------------------------------------------------------

        clean: {
            build: ['build/', 'css/'],
            build_res: ['build/*-r.css'],
            release: ['release/<%= pkg.version %>/']
        },

        // -- Copy Config ----------------------------------------------------------

        copy: {
            build: {
                src: 'css/*.css',
                dest: 'build/',
                expand: true,
                flatten: true
            },

            release: {
                src: '{LICENSE.md,README.md,HISTORY.md}',
                dest: 'build/'
            }
        },

        less: {
            build: {
                files: {
                    'css/base.css': [
                        'less/base.less'
                    ],
                    'css/buttons-core.css': [
                        'less/buttons-core.less'
                    ],
                    'css/buttons.css': [
                        'less/buttons.less'
                    ],
                    'css/forms-r.css': [
                        'less/forms-r.less'
                    ],
                    'css/forms.css': [
                        'less/forms.less'
                    ],
                    'css/grids-core.css': [
                        'less/grids-core.less'
                    ],
                    'css/grids.css': [
                        'less/grids.less'
                    ],
                    'css/menus-core.css': [
                        'less/menus-core.less'
                    ],
                    'css/menus-paginator.css': [
                        'less/menus-paginator.less'
                    ],
                    'css/menus-r.css': [
                        'less/menus-r.less'
                    ],
                    'css/menus.css': [
                        'less/menus.less'
                    ],
                    'css/normalize.css': [
                        'less/normalize.less'
                    ],
                    'css/tables.css': [
                        'less/tables.less'
                    ]
                },
                options: {
                    compress: false,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: false,
                    sourceMapFilename: 'build/main.css.map',
                    sourceMapRootpath: '/css/'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            build: {
                options: {
                    map: {
                        prev: 'build'
                    }
                },
                src: 'css/*.css'
            }
        },
        // -- Concat Config --------------------------------------------------------

        concat: {
            build: {
                files: [{
                        'css/base.css': [
                            'bower_components/normalize-css/normalize.css',
                            'css/base.css'
                        ]
                    },

                    {
                        'css/buttons.css': [
                            'css/buttons-core.css',
                            'css/buttons.css'
                        ]
                    },

                    {
                        'css/forms-nr.css': [
                            'css/forms.css'
                        ]
                    },

                    {
                        'css/forms.css': [
                            'css/forms-nr.css',
                            'css/forms-r.css'
                        ]
                    },

                    {
                        'css/grids.css': [
                            'css/grids-core.css',
                            'css/grids-units.css'
                        ]
                    },

                    {
                        'css/menus-nr.css': [
                            'css/menus-core.css',
                            'css/menus.css',
                            'css/menus-paginator.css'
                        ]
                    },

                    {
                        'css/menus.css': [
                            'css/menus-nr.css',
                            'css/menus-r.css'
                        ]
                    },

                    // Rollups

                    {
                        'build/<%= pkg.name %>.css': [
                            'css/base.css',
                            'css/grids.css',
                            'css/buttons.css',
                            'css/forms.css',
                            'css/menus.css',
                            'css/tables.css'
                        ]
                    },

                    {
                        'build/<%= pkg.name %>-nr.css': [
                            'css/base.css',
                            'css/grids.css',
                            'css/buttons.css',
                            'css/forms-nr.css',
                            'css/menus-nr.css',
                            'css/tables.css'
                        ]
                    }
                ]
            }
        },

        // -- CSSLint Config -------------------------------------------------------

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },

            base: ['less/base.less'],
            buttons: ['less/buttons-core.less', 'less/buttons.less'],
            forms: ['less/forms.less', 'less/forms-r.less'],
            grids: ['src/grids/css/*.css'],
            menus: ['src/menus/css/*.css'],
            tables: ['src/tables/css/*.css']
        },

        // -- CSSMin Config --------------------------------------------------------

        cssmin: {
            options: {
                noAdvanced: true
            },

            files: {
                expand: true,
                src: 'build/*.css',
                ext: '-min.css'
            }
        },

        // -- Compress Config ------------------------------------------------------

        compress: {
            release: {
                options: {
                    archive: 'release/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.tar.gz'
                },

                expand: true,
                flatten: true,
                src: 'build/*',
                dest: '<%= pkg.name %>/<%= pkg.version %>/'
            }
        },

        // -- License Config -------------------------------------------------------

        license: {
            normalize: {
                options: {
                    banner: [
                        '/*!',
                        'normalize.css v<%= bower.devDependencies["normalize-css"] %> | MIT License | git.io/normalize',
                        'Copyright (c) Nicolas Gallagher and Jonathan Neal',
                        '*/\n'
                    ].join('\n')
                },

                expand: true,
                cwd: 'build/',
                src: ['base*.css', '<%= pkg.name %>*.css']
            },

            yahoo: {
                options: {
                    banner: [
                        '/*!',
                        'Pure v<%= pkg.version %>',
                        'Copyright 2014 Yahoo! Inc. All rights reserved.',
                        'Licensed under the BSD License.',
                        'https://github.com/yahoo/pure/blob/master/LICENSE.md',
                        '*/\n'
                    ].join('\n')
                },

                expand: true,
                src: ['build/*.css']
            }
        },

        // -- Pure Grids Units Config ----------------------------------------------

        pure_grids: {
            default_units: {
                dest: 'build/grids-units.css',

                options: {
                    units: [5, 24]
                }
            },

            responsive: {
                dest: 'build/grids-responsive.css',

                options: {
                    mediaQueries: {
                        sm: 'screen and (min-width: 35.5em)', // 568px
                        md: 'screen and (min-width: 48em)', // 768px
                        lg: 'screen and (min-width: 64em)', // 1024px
                        xl: 'screen and (min-width: 80em)' // 1280px
                    }
                }
            }
        },

        // -- Strip Media Queries Config -------------------------------------------

        stripmq: {
            all: {
                files: {
                    //follows the pattern 'destination': ['source']
                    'build/grids-responsive-old-ie.css': ['build/grids-responsive.css']
                }
            }
        },

        // -- CSS Selectors Config -------------------------------------------------

        css_selectors: {
            base: {
                src: 'build/base.css',
                dest: 'build/base-context.css',

                options: {
                    mutations: [{
                        prefix: '.pure'
                    }]
                }
            }
        },

        // -- Watch/Observe Config -------------------------------------------------

        observe: {
            src: {
                files: 'src/**/css/*.css',
                tasks: ['test', 'suppress', 'build'],

                options: {
                    interrupt: true
                }
            }
        }
    });

    // -- Main Tasks ---------------------------------------------------------------

    // npm tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css-selectors');
    grunt.loadNpmTasks('grunt-pure-grids');
    grunt.loadNpmTasks('grunt-stripmq');

    // Local tasks.
    grunt.loadTasks('tasks/');

    grunt.registerTask('default', ['import', 'test', 'build']);
    grunt.registerTask('import', ['bower_install']);
    grunt.registerTask('test', ['less:build', 'csslint']);
    grunt.registerTask('build', [
        'clean:build',
        //'copy:build',
        'autoprefixer:build',
        'pure_grids',
        'stripmq',
        'concat:build',
        'clean:build_res',
        'css_selectors:base',
        'cssmin',
        'license'
    ]);

    // Makes the `watch` task run a build first.
    grunt.renameTask('watch', 'observe');
    grunt.registerTask('watch', ['default', 'observe']);

    grunt.registerTask('release', [
        'default',
        'clean:release',
        'copy:release',
        'bower_json:release',
        'compress:release'
    ]);

};