(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var SLIDER_SELECTOR = '#strengthLevel';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var SlideHandler = App.SlideHandler;
    var myTruck = new Truck('MAGIC', new DataStore());
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    var slideHandler = new SlideHandler(SLIDER_SELECTOR);

    slideHandler.addSliderHandler();
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

    console.log(formHandler);
})(window);
