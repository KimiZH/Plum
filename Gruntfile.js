var $ = (function () {
    var class2type = {},
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty;

    for (var items = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < items.length; i++) {
        var name = items[i];
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    }
    
    return {
        extend: function () {
            var src, copyIsArray, copy, name, options, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if ( typeof target === "boolean" ) {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if ( typeof target !== "object" && !this.isFunction(target) ) {
                target = {};
            }

            // extend jQuery itself if only one argument is passed
            if ( length === i ) {
                target = this;
                --i;
            }

            for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null ) {
                    // Extend the base object
                    for ( name in options ) {
                        src = target[ name ];
                        copy = options[ name ];

                        // Prevent never-ending loop
                        if ( target === copy ) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
                            if ( copyIsArray ) {
                                copyIsArray = false;
                                clone = src && this.isArray(src) ? src : [];

                            } else {
                                clone = src && this.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[ name ] = this.extend( deep, clone, copy );

                        // Don't bring in undefined values
                        } else if ( copy !== undefined ) {
                            target[ name ] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        },

        isFunction: function( obj ) {
            return this.type(obj) === "function";
        },

        isArray: Array.isArray || function( obj ) {
            return this.type(obj) === "array";
        },

        isWindow: function( obj ) {
            return obj != null && obj == obj.window;
        },

        isNumeric: function( obj ) {
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        },

        type: function( obj ) {
            if ( obj == null ) {
                return String( obj );
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ core_toString.call(obj) ] || "object" :
                typeof obj;
        },

        isPlainObject: function( obj ) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow( obj ) ) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if ( obj.constructor &&
                    !core_hasOwn.call(obj, "constructor") &&
                    !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.

            var key;
            for ( key in obj ) {}

            return key === undefined || core_hasOwn.call( obj, key );
        },

        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        }
    }
})();

module.exports = function(grunt) {
    var cacheSvr = '.';
    
    function onBuildRead_webWidget(moduleName, path, contents) {
        if (moduleName == 'cacheSvr/ui/src/js/require/2.0.4/require') {
            contents = ''
                + 'if (typeof(require) != "function") {'
                    + contents
                + '}';
        }
        else if (moduleName == 'cacheSvr/ui/src/js/require/window.km/main') {
            var str = grunt.file.read('ui/src/js/require/2.0.4/require.js');
            contents = contents.replace('/* require.js */', str);
        }
        else if (moduleName == 'jquery') {
            var str = grunt.file.read('ui/src/js/jquery/define.amd/main.js');
            contents = str.replace('/* jquery.js */', contents);
        }
        else {
            contents = onBuildRead(moduleName, path, contents);
        }
        return contents;
    };
    
    function onBuildRead(moduleName, path, contents) {
        if (/^cacheSvr\/ui\/src\/js\/jquery\//.test(moduleName)) {
            contents = 'define("' + moduleName + '", ["jquery"], function ($) { var jQuery = $; ' + contents + '});';
        }
        return contents;
    };

    var mainConfig = {
            baseUrl: '.',
            paths: {
                'cacheSvr': cacheSvr,
                'jquery': cacheSvr + '/ui/src/js/jquery/1.7.2/main',
                'template': cacheSvr + '/ui/src/js/widget/template/main',
                'csstemplate': cacheSvr + '/ui/src/js/widget/css-template/main'
            },
            deps: [
                'cacheSvr/ui/src/js/require/2.0.4/main',
                'cacheSvr/ui/src/js/require/config/main'
            ],
            onBuildRead: onBuildRead,
            //optimize: 'none',
            //preserveLicenseComments: false,
            skipModuleInsertion: true
        },
        webWidgetConfig = {
            onBuildRead: onBuildRead_webWidget
        };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            mobile: {
                options: $.extend(true, {}, mainConfig, {
                    include: ['cacheSvr/ui/src/js/page/mobile/main'],
                    excludeShallow: [],
                    out: 'ui/dest/<%= pkg.version %>/mobile.js'
                })
            },
            mobile: {
                options: $.extend(true, {}, mainConfig, {
                    include: ['cacheSvr/ui/src/js/page/posthandler/main'],
                    excludeShallow: [],
                    out: 'ui/dest/<%= pkg.version %>/posthandler.js'
                })
            },
            admin_default: {
                options: $.extend(true, {}, mainConfig, {
                    include: ['cacheSvr/ui/src/js/page/admin/default/main'],
                    excludeShallow: [],
                    out: 'ui/dest/<%= pkg.version %>/admin/default.js'
                })
            },
            admin_list: {
                options: $.extend(true, {}, mainConfig, {
                    include: ['cacheSvr/ui/src/js/page/admin/list/main'],
                    excludeShallow: [],
                    out: 'ui/dest/<%= pkg.version %>/admin/list.js'
                })
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['requirejs']);
    grunt.registerTask('mobile', ['requirejs:mobile']);
    grunt.registerTask('admin.login', ['requirejs:admin_login']);
    grunt.registerTask('admin.list', ['requirejs:admin_list']);
};