define(
    [
        'jquery',
        'Magento_Ui/js/form/element/single-checkbox',
        'Setor7_Oopc/js/action/check-gift-wrap'
    ],
    function (
        $,
        Component,
        checkAction
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                listens: {
                    'checked': 'check'
                }
            },

            fee: 0,

            check: function (checked) {
                checkAction(checked);
            }
        });
    }
);
