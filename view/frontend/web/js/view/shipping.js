define(
    [
        'Magento_Checkout/js/action/set-shipping-information',
        'Magento_Checkout/js/view/shipping'
    ],
    function (
        setShippingInformationAction,
        Shipping
    ) {
        'use strict';

        var instance = null;

        return Shipping.extend({
            setShippingInformation: function () {
                if (this.validateShippingInformation()) {
                    setShippingInformationAction().done(
                        function () {
                            //stepNavigator.next();
                        }
                    );
                }
            },
            initialize: function () {
                this._super();
                instance = this;
            },

            selectShippingMethod: function (shippingMethod) {
                this._super();

                instance.setShippingInformation();

                return true;
            }
        });
    }
);
