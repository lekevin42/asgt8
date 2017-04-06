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
                $('#power_list').modal('show');
                $('#submit_power').click(function() {
                    power = $('#power_list input:radio:checked').val();
                    if (power) {
                        data['power'] = power;
                        $('#power_list').modal('hide');
                        $('#add_power_modal').modal('show');

                        add_power.innerHTML = 'We have added ' + power + ' to your coffee.';

                    }
                });

            } else if (data['size'] === 'coffee-zilla' && data['flavor'] && data['strength'] === '100') {
                achievement.push(data['emailAddress']);
                console.log(achievement);
                $('#achievement').modal('show');
                $('#achievement_choice').click(function() {
                    var option = $('#achievement input:radio:checked').val();
                    console.log(option);
                    if (option === 'yes') {
                        $('#power_list').modal('show');
                        $('#submit_power').click(function() {
                            power = $('#power_list input:radio:checked').val();
                            if (power) {
                                data['power'] = power;
                                $('#power_list').modal('hide');
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
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn, remoteDS) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';

            remoteDS.getAll().then(function(data) {
                var i;
                var taken = false;
                for (i = 0; i < data.length; i++) {
                    if (data[i]['emailAddress'] === emailAddress) {
                        taken = true;
                        break;
                    }
                }

                if (fn(emailAddress) && !taken) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress + ' is not an authorized email address or already exists!';
                    event.target.setCustomValidity(message);
                }
            });

        });
    };

    FormHandler.prototype.addDecafHandler = function(fn) {
        var order;
        var decaf;
        var message = '';

        this.$formElement.on('input', '[name="coffee"]', function(event) {
            order = event.target.value;
            decaf = $('#strengthLevel').val();
            var decafEvent = document.getElementById('strengthLevel');
            if (order && decaf) {
                if (fn(order, decaf)) {
                    event.target.setCustomValidity('');
                    decafEvent.setCustomValidity('');
                } else {
                    message = 'Coffee with decaf cannot have a caffeine rating higher than 20!';
                    event.target.setCustomValidity(message);
                }
            }
        });

        this.$formElement.on('input', '[name="strength"]', function(event) {
            order = $('#coffeeOrder').val();
            decaf = event.target.value;
            var orderName = document.getElementById('coffeeOrder');
            console.log(order);
            console.log(decaf);
            if (order && decaf) {
                if (fn(order, decaf)) {
                    event.target.setCustomValidity('');
                    orderName.setCustomValidity('');
                    console.log('true');
                } else {
                    message = 'Coffee with decaf cannot have a caffeine rating higher than 20!';
                    event.target.setCustomValidity(message);
                }
            }
        });
    };

    /*    FormHandler.prototype.addDuplicateEmailHandler = function(fn, remoteDS) {
            console.log('Setting duplicate email handler for form');
            this.$formElement.on('input', '[name="emailAddress"]', function(event) {
                var emailAddress = event.target.value;
                var message = '';
                console.log(emailAddress);
                if (fn(emailAddress, remoteDS)) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress + ' already exists!';
                    event.target.setCustomValidity(message);
                }
            });
        };
    */
    App.FormHandler = FormHandler;
    window.App = App;

})(window);
