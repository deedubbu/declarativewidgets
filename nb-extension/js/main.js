/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */
define([
    'base/js/namespace',
    'base/js/events',
    './init/init'
], function(Jupyter, events, init) {
    'use strict';

    return {
        load_ipython_extension: function () {
            var load_css = function (name) {
                var link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = name;
                document.getElementsByTagName('head')[0].appendChild(link);
            };

            init({
                namespace: Jupyter,
                events: events
            });

            load_css(window.Urth._getModuleBasedComponentRoot() + 'css/main.css');

            console.log('loaded declarativewidgets');
        }
    };
});
