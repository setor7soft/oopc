/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'jquery',
        'Magento_Checkout/js/view/summary/item/details',
        'Magento_Checkout/js/model/quote',
        'Magento_Ui/js/modal/confirm',
        'Setor7_Oopc/js/action/remove-item',
        'Setor7_Oopc/js/action/update-item',
        'mage/translate',
        'ko',
        'Setor7_Oopc/js/options/configurable',
        'priceOptions',
        'mage/validation'
    ],
    function ($, Component, quote, confirm, removeItemAction, updateItemAction, $t, ko, configurable, priceOptions) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Setor7_Oopc/checkout/summary/item/details'
            },

            getItemConfig: function (item) {
                if (item.hasOwnProperty('amcheckout')) {
                    return item.amcheckout;
                }

                var items = quote.getItems();

                var quoteItems = items.filter(function (quoteItem) {
                    return quoteItem.item_id == item.item_id;
                });

                if (quoteItems.length == 0)
                    return false;

                var quoteItem = quoteItems[0];

                if (quoteItem.hasOwnProperty('amcheckout')) {
                    return quoteItem.amcheckout;
                }
                else
                    return false;
            },

            getConfigurableOptions: function (item) {
                var itemConfig = this.getItemConfig(item);

                if (itemConfig.hasOwnProperty('configurableAttributes')) {
                    return itemConfig.configurableAttributes.template;
                }
                else
                    return '';
            },

            getCustomOptions: function (item) {
                var itemConfig = this.getItemConfig(item);

                if (itemConfig.hasOwnProperty('customOptions')) {
                    return itemConfig.customOptions.template;
                }
                else
                    return '';
            },

            initOptions: function (item) {
                var itemConfig = this.getItemConfig(item);

                var containerSelector = '[data-role="product-attributes"][data-item-id=' + item.item_id + ']';
                var container = $(containerSelector);

                if (itemConfig.hasOwnProperty('configurableAttributes')) {
                    container.amcheckoutConfigurable({
                        spConfig: JSON.parse(itemConfig.configurableAttributes.spConfig),
                        superSelector: containerSelector + ' .super-attribute-select'
                    });
                }

                if (itemConfig.hasOwnProperty('customOptions')) {
                    container.priceOptions({
                        optionConfig: JSON.parse(itemConfig.customOptions.optionConfig)
                    });
                }

                item.form = container;
                item.isUpdated = ko.observable(false);
                item.validation = container.validation();

                container.find('input, select, textarea').change(function () {
                    item.isUpdated(true);
                });
            },

            updateItem: function (item) {
                if (item.validation.valid()) {
                    updateItemAction(item.item_id, item.form.serialize());
                }
            },

            deleteItem: function (item) {
                confirm({
                    content: $t("Are you sure you would like to remove this item from the shopping cart?"),
                    actions: {
                        confirm: function () {
                            removeItemAction(item.item_id);
                        },
                        always: function (event) {
                            event.stopImmediatePropagation();
                        }
                    }
                });
            },

            canShowDeleteButton: function () {
                return quote.getItems().length > 1;
            }
        });
    }
);
