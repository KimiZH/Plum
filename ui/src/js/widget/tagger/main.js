﻿define(['jquery'], function ($) {
    return function () {
        // ************
        // * Variables
        // ************
        var defaultSettings = {
            more: {
                cookies: {
                    // default cookie name for retreving country and
                    // language info
                    ctr: 'ctr',
                    lng: 'lng',
                    debug: {
                        p: 'p'
                    }
                },
                lng: null,
                ctr: null,
                rtlOverride: false,
                asianOverride: false
            }
        };

        // tagging logical should be ran at most once
        var isRan = false;
        // true to indicate dom is ready
        var isReady = false;
        // true to indicate targeting to 2nd target is enabled
        var isSecTaggingRequired = false;

        var knownBrowsers = ['msie', 'webkit', 'mozilla', 'opera'];
        var knownOSs = {
            'mac': {},
            'win': {},
            'linux': {},
            'iphone': { css: 'ios iphone' },
            'ipad': { css: 'ios ipad' }
        };
        var knownAsianLngs = ['ko', 'ja', 'ch', 'cs'];
        var knownHtml5Browser = ['msie9', 'mozilla', 'opera', 'webkit'];
        // arabic and hebrew, et marketing suggested to add az to rtl for
        // testing purpose
        // however this should not be done in etch, which is a lib may be
        // used across et projects.
        var knownRightToLeft = ['ar', 'he'];
        // containing info that specific to etown
        var etInfo, etCookieInfo;
        var elRoot = $(document.documentElement);
        // the reference to secondary target (usually it is body)
        var elSecTarget = null;

        // queuing tags that will be added to secondary target on
        // dom ready event
        var delayTaggingQ = [];

        // ************
        // * Private Functions
        // ************

        /**
        * @function compareKey Compare 2 strings and avoid case sensitive
        * @private
        */
        function compareKey(key1, key2) {
            if (!key1) { return false };
            return $.trim(key1).toUpperCase() == $.trim(key2).toUpperCase();
        };

        /**
        * @function getETInfo Get info that specific to englishtown
        * @private
        */
        function getETInfo(etOptions) {
            // return from cache
            if (etInfo) { return etInfo; }

            var ret = { ctr: null, lng: null, debug: null };
            var cookieInfo;

            // if the ctr or lng is specified by backend use them directly
            $.extend(ret, etOptions);

            // otherwise, get them from cookie
            if (!ret.ctr || !ret.lng || !ret.debug) {
                // if customized cookie name is specified, use it.
                cookieInfo = getCookieInfo(etOptions.cookies);

                // copy over if there is anything missed in predefined country
                // name and language
                for (var name in cookieInfo) {
                    if (cookieInfo.hasOwnProperty(name) &&
                        ret[name] == null) {
                        ret[name] = cookieInfo[name];
                    }
                }
            }

            // cache it
            etInfo = ret;
            return ret;
        };

        /**
        * @function getCookieInfo Get country, language, partner info from
        * cookie
        * @private
        */
        function getCookieInfo(cookies) {
            // it is meaningless to run this code multiple times
            if (etCookieInfo) return etCookieInfo;

            var ret = {};
            var cPair = document.cookie.toString().split(';');
            for (var i = cPair.length; i--; ) {

                var kv = cPair[i].split('=');

                if (kv.length <= 0) { continue; }

                var key = $.trim(kv[0]);
                if (compareKey(key, cookies.ctr)) {
                    kv.splice(0, 1);
                    ret[cookies.ctr] = kv.join('=');
                }
                else if (compareKey(key, cookies.lng)) {
                    kv.splice(0, 1);
                    ret[cookies.lng] = kv.join('=');
                }
                else if (compareKey(key, 'debug')) {
                    ret.debug = {};
                    kv.splice(0, 1);
                    var debugs = kv.join('=').split('|');
                    for (var j = debugs.length; j--; ) {
                        var debugKV = debugs[j].split(':');
                        var debugKey = $.trim(debugKV[0]);
                        if (compareKey(debugKey, cookies.debug.p)) {
                            debugKV.splice(0, 1);
                            ret.debug[cookies.debug.p] = debugKV.join(':');
                        }
                    }
                }
            }

            etCookieInfo = ret;
            return ret;

        };

        /**
        * @function isAsianLng Check if lng code is known asia language
        * @private
        */
        function isAsianLng(lng) {
            return $.inArray(lng, knownAsianLngs) > -1;
        };

        /**
        * @function isRtlLng Check if lng code is known rtl language
        * @private
        */
        function isRtlLng(lng) {
            return $.inArray(lng, knownRightToLeft) > -1;
        };

        /**
        * @function setSecondaryTarget Add tag to secondary target
        * @private
        */
        function setSecondaryTarget(className) {
            if (document.body != null) { elSecTarget = $(document.body); }
            elSecTarget.addClass(className);
        };

        /**
        * @function initDelayTagging initialize the delay tagging, add
        * tags in queue to secondary target (usually <body />,
        * for helping ie6 or below to workaround css multi class issue)
        * @private
        */
        function initDelayTagging() {
            isReady = true;

            if (!isSecTaggingRequired) { return; }

            for (var l = delayTaggingQ.length; l--; ) {
                setSecondaryTarget(delayTaggingQ[l]);
            }
        };

        // ************
        // * Tagging Functions
        // ************
        var taggers = {
            /**
            * @function browserBasic Add basic browser info such as browser
            * name or version
            */
            browserBasic: function () {
                var binfo = {},
                    browser = this.browser,
                    s = this.opts;

                var l;

                $.extend(binfo, this.binfo);
                // class is used for css styling not js handling, so lets
                // use documentMode rather then version.
                if (binfo.browser == 'msie' && document.documentMode) {
                    binfo.version = document.documentMode + '';
                }

                // add basic browser name
                var isChrome = window.navigator.appVersion.indexOf('Chrome') > -1 ? true : false,
                    isSafari = window.navigator.appVersion.indexOf('Chrome') > -1 ? false : (window.navigator.appVersion.indexOf('Safari') > -1 ? true : false);
                if (isChrome || isSafari) {
                    this.set(isChrome ? 'chrome' : 'safari');
                }
                this.set(browser);

                // add non-[browser name] class name
                for (l = knownBrowsers.length; l--; ) {
                    if (browser != knownBrowsers[l]) {
                        this.set('non-' + knownBrowsers[l]);
                    }
                }

                // special class name for non ie 6 and 7
                if (browser != 'msie' ||
                    (browser == 'msie' &&
                        binfo.version != 6 && binfo.version != 7)) {
                    this.set('non-msie6-msie7');
                }

                var major = Math.floor(binfo.version);
                // get major when there is a dot
                if (binfo.version.indexOf('.') >= 0) {
                    major = Math.floor(
                        binfo.version.substring(0,
                            binfo.version.indexOf('.')));
                }

                this.set(browser + major);


            },
            /**
            * @function browserHtml5 Check if current browser support html5
            */
            browserHtml5: function () {
                var binfo = this.binfo,
                    browser = this.browser,
                    s = this.opts;

                var l,
                    major = Math.floor(binfo.version);

                // html5 browser tag
                var html5TagSet = false;
                for (l = knownHtml5Browser.length; l--; ) {
                    if (knownHtml5Browser[l] == browser ||
                        knownHtml5Browser[l] == browser + major) {
                        this.set('html5browser');
                        html5TagSet = true;
                        break;
                    }
                }

                if (!html5TagSet) {
                    this.set('non-html5browser');
                }

                // TODO: detailed html5 feature detect
            },
            /**
            * @function platform Check current platform info
            */
            platformBasic: function () {
                var binfo = this.binfo,
                    browser = this.browser,
                    s = this.opts;

                var name;

                // get OS info
                // Figure out what OS is being used
                for (name in knownOSs) {
                    if (!knownOSs.hasOwnProperty(name)) { continue; }
                    var oskeyword = name;
                    var osinfo = knownOSs[name];
                    var cssname = osinfo.css ? osinfo.css : name;
                    var re = new RegExp(oskeyword, "i");
                    if (re.test(navigator.userAgent)) {
                        this.set(cssname);
                    }
                }

                // TODO: orientation detection
            },
            /**
            * @function queryStringBasic Determine useful information from query string
            */
            queryStringBasic: function () {
                // check protocol
                if (window.location.protocol == 'https:') {
                    this.set('qs-protocol-https');
                }
                else {
                    this.set('qs-protocol-http');
                }
            }
        };

        var etTaggers = {
            /**
            * @function etownBasic Get etown specified basic info such as
            * country code and language name
            */
            etownBasic: function () {
                // add country info and language info to root element
                var etInfo = getETInfo(this.opts.more);

                this.set('et-ctr-' + etInfo.ctr);
                this.set('et-lng-' + etInfo.lng);
                if (etInfo.debug && etInfo.debug.p && (etInfo.debug.p.toString().toLowerCase() != 'none')) {
                    this.set('et-partner-' + etInfo.debug.p);
                }
                else if ((typeof(ET) != 'undefined') && ET.Community && ET.Community.context && ET.Community.context.PartnerCode && (ET.Community.context.PartnerCode.toString().toLowerCase() != 'none')) {
                    this.set('et-partner-' + ET.Community.context.PartnerCode.toString().toLowerCase());
                }
            },
            /**
            * @function language Get additional language info
            */
            languageAdditional: function () {
                var etInfo = getETInfo(this.opts.more);

                // check if it is asian language
                var asianOverride = this.opts.more.asianOverride;
                if (asianOverride === true ||
                    (!asianOverride == true && isAsianLng(etInfo.lng))) {
                    this.set('et-lng-asian');
                }
                else {
                    this.set('et-lng-non-asian');
                }

                // check if it is right-to-left language
                var rtlOverride = this.opts.more.rtlOverride;
                if ((rtlOverride === true) ||
                    (!rtlOverride == true && isRtlLng(etInfo.lng))) {
                    this.set('et-lng-rtl');
                }
                else {
                    this.set('et-lng-non-rtl');
                }
            }
        };

        this.tags = {};
        this.set = function (className) {
            var l, classes;
            this.target.addClass(className);
            if (isSecTaggingRequired) {
                if (!isReady) {
                    delayTaggingQ.push(className);
                }
                else {
                    setSecondaryTarget(className);
                }
            }
            classes = className.split(' ');
            for (l = classes.length; l--; ) {
                this.tags[classes[l]] = true;
            };
        };
        this.tag = function (options) {
            if (isRan) { return; }

            // ************
            // * local variables

            // tagger options
            this.opts = {};

            $.extend(true, this.opts, defaultSettings, options);

            if (!options || !options.more) {

                this.opts.more = false;
            }
            else if (options.more === true) {
                // use default value
                this.opts.more = defaultSettings.more;
            }

            // the root element for being tagged
            this.target = elRoot;

            // we will tag <body /> also on ie6 or below,
            // that will make it easier to workaround the multi class
            // issue on ie6
            if ($.browser.msie && $.browser.version < 7) {
                isSecTaggingRequired = true;
                $(initDelayTagging);
            }

            // get ua info
            this.binfo = $.uaMatch(navigator.userAgent);
            this.browser = this.binfo.browser;

            var keyname;

            // run basic tagger
            for (keyname in taggers) {
                if (!taggers.hasOwnProperty(keyname)) { continue; }

                taggers[keyname].call(this);
            }

            // run etown specific tagger
            if (this.opts.more) {

                for (keyname in etTaggers) {
                    if (!etTaggers.hasOwnProperty(keyname)) { continue; }

                    etTaggers[keyname].call(this);
                }
            }

            // prevent future run.
            isRan = true;
        };
    };
});