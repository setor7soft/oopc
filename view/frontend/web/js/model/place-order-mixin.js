/*jshint browser:true jquery:true*/
/*global alert*/
define([
    'jquery',
    'mage/utils/wrapper'
], function ($, wrapper) {
    'use strict';

    return function (placeOrderAction) {
        return wrapper.wrap(placeOrderAction, function (originalAction, serviceUrl, payload, messageContainer) {
            var amcheckoutForm = $('.additional-options input, .additional-options textarea');
            var amcheckoutData = amcheckoutForm.serializeArray();
            var data = {};

            amcheckoutData.forEach(function (item) {
                data[item.name] = item.value;
            });

            payload.amcheckout = data;

            return originalAction(serviceUrl, payload, messageContainer);
        });
    };
});
