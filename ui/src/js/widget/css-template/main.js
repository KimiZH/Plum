/* 
    edit from require-cs:
    https://github.com/jrburke/require-cs
    https://github.com/jrburke/require-cs/blob/master/cs.js
*/

/*global define, window, XMLHttpRequest, importScripts, Packages, java,
  ActiveXObject, process, require */
define(function () {
    var fs, getXhr,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        fetchText = function () {
            throw new Error('Environment unsupported.');
        },
        buildMap = {},
        global = new Function("return this;")(),
        isLeIE7 = global.navigator && (~~(global.navigator.appVersion.replace(/.*?MSIE\s([\d\.]+).*/ig, "$1")) <= 7);

    function cssmin(css, linebreakpos) {

        var startIndex = 0,
            endIndex = 0,
            i = 0, max = 0,
            preservedTokens = [],
            comments = [],
            token = '',
            totallen = css.length,
            placeholder = '';

        // collect all comment blocks...
        while ((startIndex = css.indexOf("/*", startIndex)) >= 0) {
            endIndex = css.indexOf("*/", startIndex + 2);
            if (endIndex < 0) {
                endIndex = totallen;
            }
            token = css.slice(startIndex + 2, endIndex);
            comments.push(token);
            css = css.slice(0, startIndex + 2) + "___YUICSSMIN_PRESERVE_CANDIDATE_COMMENT_" + (comments.length - 1) + "___" + css.slice(endIndex);
            startIndex += 2;
        }

        // preserve strings so their content doesn't get accidentally minified
        css = css.replace(/("([^\\"]|\\.|\\)*")|('([^\\']|\\.|\\)*')/g, function (match) {
            var i, max, quote = match.substring(0, 1);

            match = match.slice(1, -1);

            // maybe the string contains a comment-like substring?
            // one, maybe more? put'em back then
            if (match.indexOf("___YUICSSMIN_PRESERVE_CANDIDATE_COMMENT_") >= 0) {
                for (i = 0, max = comments.length; i < max; i = i + 1) {
                    match = match.replace("___YUICSSMIN_PRESERVE_CANDIDATE_COMMENT_" + i + "___", comments[i]);
                }
            }

            // minify alpha opacity in filter strings
            match = match.replace(/progid:DXImageTransform\.Microsoft\.Alpha\(Opacity=/gi, "alpha(opacity=");

            preservedTokens.push(match);
            return quote + "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___" + quote;
        });

        // strings are safe, now wrestle the comments
        for (i = 0, max = comments.length; i < max; i = i + 1) {

            token = comments[i];
            placeholder = "___YUICSSMIN_PRESERVE_CANDIDATE_COMMENT_" + i + "___";

            // ! in the first position of the comment means preserve
            // so push to the preserved tokens keeping the !
            if (token.charAt(0) === "!") {
                preservedTokens.push(token);
                css = css.replace(placeholder,  "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___");
                continue;
            }

            // \ in the last position looks like hack for Mac/IE5
            // shorten that to /*\*/ and the next one to /**/
            if (token.charAt(token.length - 1) === "\\") {
                preservedTokens.push("\\");
                css = css.replace(placeholder,  "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___");
                i = i + 1; // attn: advancing the loop
                preservedTokens.push("");
                css = css.replace("___YUICSSMIN_PRESERVE_CANDIDATE_COMMENT_" + i + "___",  "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___");
                continue;
            }

            // keep empty comments after child selectors (IE7 hack)
            // e.g. html >/**/ body
            if (token.length === 0) {
                startIndex = css.indexOf(placeholder);
                if (startIndex > 2) {
                    if (css.charAt(startIndex - 3) === '>') {
                        preservedTokens.push("");
                        css = css.replace(placeholder,  "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___");
                    }
                }
            }

            // in all other cases kill the comment
            css = css.replace("/*" + placeholder + "*/", "");
        }


        // Normalize all whitespace strings to single spaces. Easier to work with that way.
        css = css.replace(/\s+/g, " ");

        // Remove the spaces before the things that should not have spaces before them.
        // But, be careful not to turn "p :link {...}" into "p:link{...}"
        // Swap out any pseudo-class colons with the token, and then swap back.
        css = css.replace(/(^|\})(([^\{:])+:)+([^\{]*\{)/g, function (m) {
            return m.replace(":", "___YUICSSMIN_PSEUDOCLASSCOLON___");
        });
        css = css.replace(/\s+([!{};:>+\(\)\],])/g, '$1');
        css = css.replace(/___YUICSSMIN_PSEUDOCLASSCOLON___/g, ":");

        // retain space for special IE6 cases
        css = css.replace(/:first-(line|letter)(\{|,)/g, ":first-$1 $2");

        // no space after the end of a preserved comment
        css = css.replace(/\*\/ /g, '*/');


        // If there is a @charset, then only allow one, and push to the top of the file.
        css = css.replace(/^(.*)(@charset "[^"]*";)/gi, '$2$1');
        css = css.replace(/^(\s*@charset [^;]+;\s*)+/gi, '$1');

        // Put the space back in some cases, to support stuff like
        // @media screen and (-webkit-min-device-pixel-ratio:0){
        css = css.replace(/\band\(/gi, "and (");


        // Remove the spaces after the things that should not have spaces after them.
        css = css.replace(/([!{}:;>+\(\[,])\s+/g, '$1');

        // remove unnecessary semicolons
        css = css.replace(/;+\}/g, "}");

        // Replace 0(px,em,%) with 0.
        css = css.replace(/([\s:])(0)(px|em|%|in|cm|mm|pc|pt|ex)/gi, "$1$2");

        // Replace 0 0 0 0; with 0.
        css = css.replace(/:0 0 0 0(;|\})/g, ":0$1");
        css = css.replace(/:0 0 0(;|\})/g, ":0$1");
        css = css.replace(/:0 0(;|\})/g, ":0$1");

        // Replace background-position:0; with background-position:0 0;
        // same for transform-origin
        css = css.replace(/(background-position|transform-origin|webkit-transform-origin|moz-transform-origin|o-transform-origin|ms-transform-origin):0(;|\})/gi, function(all, prop, tail) {
            return prop.toLowerCase() + ":0 0" + tail;
        });

        // Replace 0.6 to .6, but only when preceded by : or a white-space
        css = css.replace(/(:|\s)0+\.(\d+)/g, "$1.$2");

        // Shorten colors from rgb(51,102,153) to #336699
        // This makes it more likely that it'll get further compressed in the next step.
        css = css.replace(/rgb\s*\(\s*([0-9,\s]+)\s*\)/gi, function () {
            var i, rgbcolors = arguments[1].split(',');
            for (i = 0; i < rgbcolors.length; i = i + 1) {
                rgbcolors[i] = parseInt(rgbcolors[i], 10).toString(16);
                if (rgbcolors[i].length === 1) {
                    rgbcolors[i] = '0' + rgbcolors[i];
                }
            }
            return '#' + rgbcolors.join('');
        });


        // Shorten colors from #AABBCC to #ABC. Note that we want to make sure
        // the color is not preceded by either ", " or =. Indeed, the property
        //     filter: chroma(color="#FFFFFF");
        // would become
        //     filter: chroma(color="#FFF");
        // which makes the filter break in IE.
        css = css.replace(/([^"'=\s])(\s*)#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])/gi, function () {
            var group = arguments;
            if (
                group[3].toLowerCase() === group[4].toLowerCase() &&
                group[5].toLowerCase() === group[6].toLowerCase() &&
                group[7].toLowerCase() === group[8].toLowerCase()
            ) {
                return (group[1] + group[2] + '#' + group[3] + group[5] + group[7]).toLowerCase();
            } else {
                return group[0].toLowerCase();
            }
        });

        // border: none -> border:0
        css = css.replace(/(border|border-top|border-right|border-bottom|border-right|outline|background):none(;|\})/gi, function(all, prop, tail) {
            return prop.toLowerCase() + ":0" + tail;
        });

        // shorter opacity IE filter
        css = css.replace(/progid:DXImageTransform\.Microsoft\.Alpha\(Opacity=/gi, "alpha(opacity=");

        // Remove empty rules.
        css = css.replace(/[^\};\{\/]+\{\}/g, "");

        if (linebreakpos >= 0) {
            // Some source control tools don't like it when files containing lines longer
            // than, say 8000 characters, are checked in. The linebreak option is used in
            // that case to split long lines after a specific column.
            startIndex = 0;
            i = 0;
            while (i < css.length) {
                i = i + 1;
                if (css[i - 1] === '}' && i - startIndex > linebreakpos) {
                    css = css.slice(0, i) + '\n' + css.slice(i);
                    startIndex = i;
                }
            }
        }

        // Replace multiple semi-colons in a row by a single one
        // See SF bug #1980989
        css = css.replace(/;;+/g, ";");

        // restore preserved comments and strings
        for (i = 0, max = preservedTokens.length; i < max; i = i + 1) {
            css = css.replace("___YUICSSMIN_PRESERVED_TOKEN_" + i + "___", preservedTokens[i]);
        }

        // Trim the final string (for any leading or trailing white spaces)
        css = css.replace(/^\s+|\s+$/g, "");

        return css;

    };

    if (typeof process !== "undefined" &&
               process.versions &&
               !!process.versions.node) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        fetchText = function (path, callback) {
            callback(cssmin(fs.readFileSync(path, 'utf8')));
        };
    } else if ((typeof window !== "undefined" && window.navigator && window.document) || typeof importScripts !== "undefined") {
        // Browser action
        getXhr = function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            if (!xhr) {
                throw new Error("getXhr(): XMLHttpRequest not available");
            }

            return xhr;
        };

        fetchText = function (url, callback, config) {        
            if (config.debug) {
                callback('@import url(' + url + ');');
                return;
            }
            else {
                url = url.replace(/^https?:\/\/.*?\//ig, '/');
            }

            var xhr = getXhr();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function (evt) {
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    callback(cssmin(xhr.responseText));
                }
            };
            xhr.send(null);
        };
        // end browser.js adapters
    } else if (typeof Packages !== 'undefined') {
        //Why Java, why is this so awkward?
        fetchText = function (path, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(path),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                stringBuffer.append(line);

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            
            callback(cssmin(content));
        };
    }
    
    function compile(text, opts) {
        return "'"
                + "/**** " + opts.path + " (begin) ****/"
                + text.replace(/\\/ig, '\\\\').replace(/'/ig, '\\\'')
                + "/**** " + opts.path + " (end) ****/"
                + "'";
        //return "function(){var a=document.createElement('style'),b=document.createTextNode('" + text.replace(/'/ig, '\\\'') + "');a.type='text/css';if(a.styleSheet){a.styleSheet.cssText=b.nodeValue}else{a.appendChild(b)}return a}";
    };

    return {
        fetchText: fetchText,

        write: function (pluginName, name, write) {
            if (buildMap.hasOwnProperty(name)) {
                var text = buildMap[name];
                write.asModule(pluginName + "!" + name, text);
            }
        },

        version: '0.0.1',

        load: function (name, parentRequire, load, config) {
            var path = parentRequire.toUrl(name);

            fetchText(path, function (text) {
                var opts = {
                        path: path
                    };

                //Do transform.
                try {
                    text = "define(function(){return " + compile(text, opts) + "})";
                } catch (err) {
                    err.message = "In " + path + ", " + err.message;
                    throw err;
                }

                //Hold on to the transformed text if a build.
                if (config.isBuild) {
                    buildMap[name] = text;
                }

                //IE with conditional comments on cannot handle the
                //sourceURL trick, so skip it if enabled.
                /*@if (@_jscript) @else @*/
                if (!config.isBuild) {
                    text += "\r\n//@ sourceURL=" + path;
                }
                /*@end@*/

                function loadName() {
                    load.fromText(name, text);

                    //Give result to load. Need to wait until the module
                    //is fully parse, which will happen after this
                    //execution.
                    parentRequire([name], function (value) {
                        load(value);
                    });
                };
                
                if (isLeIE7) {
                    setTimeout(loadName, 0);
                }
                else {
                    loadName();
                }
            }, config);
        }
    };
});