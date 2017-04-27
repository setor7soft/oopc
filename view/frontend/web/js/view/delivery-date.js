define(
    [
        'Magento_Ui/js/form/form',
        'Setor7_Oopc/js/action/update-delivery',
        'Setor7_Oopc/js/model/delivery',
        'Setor7_Oopc/js/view/checkout/datepicker'
    ],
    function (
        Component,
        updateAction,
        deliveryService
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Setor7_Oopc/checkout/delivery_date',
                listens: {
                    'update': 'update'
                }
            },

            isLoading: deliveryService.isLoading,

            update: function () {
                this.source.set('params.invalid', false);
                this.source.trigger('amcheckoutDelivery.data.validate');

                if (!this.source.get('params.invalid')) {
                    var data = this.source.get('amcheckoutDelivery');

                    updateAction(data);
                }
            }
        });
    }
);
