(function(window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;

    function DataStore() {
        this.data = {};
    }

    function promisedResolvedWith(value) {
        var promise = new Promise(function (resolve, reject){
            resolve(value);
        });
        return promise;
    }

    DataStore.prototype.add = function(key, val) {
        return promisedResolvedWith(null);
    };

    DataStore.prototype.get = function(key) {
        return promisedResolvedWith(this.data[key]);
    };

    DataStore.prototype.getAll = function() {
        return promisedResolvedWith(this.data);
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key];
        return promisedResolvedWith(null);
    };

    App.DataStore = DataStore;
    window.App = App;
})(window);
