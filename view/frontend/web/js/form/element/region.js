define(
    [
        'Magento_Ui/js/form/element/region',
        'uiRegistry'
    ],
    function (
        Component,
        registry
    ) {
        'use strict';

        return Component.extend({
            initialize: function (config) {
                this._super();

                registry.get(this.parentName + '.' + 'region_id_input', function (region) {
                    region.value(config.value);
                });

                return this;
            }
        });
    }
);
