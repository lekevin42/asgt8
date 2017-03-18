(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function SlideHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.coffee_level = document.getElementById('coffee_strength');
        this.caffeine_level = $('#strengthLevel');
        this.coffee_level.innerHTML = this.caffeine_level.val();
    }

    SlideHandler.prototype.addSliderHandler = function() {
        console.log('Adding slide handler!');

        this.setColor();

        $(this.caffeine_level).on('input change', function() {
            this.coffee_level.innerHTML = this.caffeine_level.val();
            this.setColor();
        }.bind(this));

        $('#reset_submit').click(function() {
            this.coffee_level.innerHTML = 30;
            this.coffee_level.style.color = 'green';
        }.bind(this));
    };


    SlideHandler.prototype.setColor = function() {
        if (this.caffeine_level.val() <= 33) {
            this.coffee_level.style.color = 'green';

        } else if (this.caffeine_level.val() <= 66) {
            this.coffee_level.style.color = 'yellow';

        } else {
            this.coffee_level.style.color = 'red';
        }
    };


    App.SlideHandler = SlideHandler;
    window.App = App;

})(window);
