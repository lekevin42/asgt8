(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var SLIDER_SELECTOR = '#strengthLevel';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    //var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var SERVER_URL = 'http://localhost:3002/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    //var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var SlideHandler = App.SlideHandler;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('MAGIC', remoteDS);
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);
    var slideHandler = new SlideHandler(SLIDER_SELECTOR);
    slideHandler.addSliderHandler();
    formHandler.addSubmitHandler(function(data) {
        return myTruck.createOrder.call(myTruck, data)
            .then(function() {
                checkList.addRow.call(checkList, data);
            }
        );
    });
    //formHandler.addDuplicateEmailHandler(Validation.isDuplicateEmail, remoteDS);
    formHandler.addInputHandler(Validation.isCompanyEmail, remoteDS);

    myTruck.printOrders(checkList.addRow.bind(checkList));

    formHandler.addDecafHandler(Validation.isDecaf);


    console.log(formHandler);
})(window);
