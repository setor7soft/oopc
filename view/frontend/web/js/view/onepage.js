define(
    [
        'uiComponent',
        'ko',
        'uiRegistry',
        'Magento_Checkout/js/model/quote',
        'Setor7_Oopc/js/action/set-shipping-information'
    ],
    function (
        Component,
        ko,
        registry,
        quote,
        setShippingInformationAction
    ) {
        'use strict';

        return Component.extend({
            requestComponent: function (name) {
                var observable = ko.observable();

                registry.get(name, function (summary) {
                    observable(summary);
                });
                return observable;
            },

            placeOrder: function () {
                if (quote.isVirtual()) {
                    this._savePaymentAndPlaceOrder();
                }
                else {
                    var shippingAddress = registry.get('checkout.steps.shipping-step.shippingAddress');
                    if (shippingAddress.validateShippingInformation()) {
                        setShippingInformationAction().done(this._savePaymentAndPlaceOrder);
                    }
                }
            },

            _savePaymentAndPlaceOrder: function () {
                var paymentMethod = quote.getPaymentMethod()();
                var methodCode = paymentMethod ? paymentMethod.method : false;

                if (!methodCode) {
                    alert('No payment method selected');
                    return;
                }

                registry.get('checkout.steps.billing-step.payment.payments-list.' + methodCode, function (method) {
                    method.placeOrder();
                });
            },

            isPlaceOrderActionAllowed: function () {
                return quote.paymentMethod();
            }
        });
    }
);
