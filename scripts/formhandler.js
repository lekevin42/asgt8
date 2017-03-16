(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var achievement = [];

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            var power;
            var add_power = document.getElementById('add_power');
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            if (achievement.indexOf(data['emailAddress']) != -1) {
                $('#myModal').modal('show');
                $('#submit_power').click(function() {
                    power = $('#myModal input:radio:checked').val();
                    if (power) {
                        data['power'] = power;
                        $('#myModal').modal('hide');
                        $('#add_power_modal').modal('show');

                        add_power.innerHTML = 'We have added ' + power + ' to your coffee.';

                    }
                });
                //$('#myModal').modal('hide');


                //  $('#add_power').innerHTML = 'Nothing was added to your coffee.';


            } else if (data['size'] === 'coffee-zilla' && data['flavor']) {
                achievement.push(data['emailAddress']);
                $('#achievement').modal('show');
                $('#achievement_choice').click(function() {
                    var option = $('#achievement input:radio:checked').val();
                    console.log(option);
                    if (option === 'yes') {
                        $('#myModal').modal('show');
                        $('#submit_power').click(function() {
                            power = $('#myModal input:radio:checked').val();
                            if (power) {
                                data['power'] = power;
                                $('#myModal').modal('hide');
                                $('#add_power_modal').modal('show');

                                add_power.innerHTML = 'We have added ' + power + ' to your coffee.';

                            }
                        });
                        $('#achievement').modal('hide');

                    } else {
                        $('#achievement').modal('hide');
                    }
                });

            }

            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
