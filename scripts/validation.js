(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.@bignerdranch\.com$/.test(email);
        },

        isDecaf: function(s_val, caffeine_level) {
            if (s_val.indexOf('decaf') != -1 && caffeine_level > 20) {
                return false;
            }
            return true;
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
