/*global define,alert*/
define(
    [
        'Magento_Checkout/js/model/quote',
        'Setor7_Oopc/js/model/shipping-save-processor'
    ],
    function (quote, shippingSaveProcessor) {
        'use strict';
        return function () {
            return shippingSaveProcessor.saveShippingInformation(quote.shippingAddress().getType());
        }
    }
);
