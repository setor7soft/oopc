define(
    [
        'Setor7_Oopc/js/model/resource-url-manager',
        'Magento_Checkout/js/model/totals',
        'Magento_Checkout/js/model/quote',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor'
    ],
    function (resourceUrlManager, totals, quote, storage, errorProcessor) {
        "use strict";
        return function (itemId) {
            if (totals.isLoading())
                return;

            totals.isLoading(true);
            var serviceUrl = resourceUrlManager.getUrlForRemoveItem(quote);

            storage.post(
                serviceUrl, JSON.stringify({itemId: itemId}), false
            ).done(
                function (result) {
                    if (!result) {
                        window.location.reload();
                    }

                    var itemIds = result.items.map(function (value, index) {
                        return value.item_id;
                    });
                    window.checkoutConfig.quoteItemData = window.checkoutConfig.quoteItemData.filter(function (item) {
                        return itemIds.indexOf(+item.item_id) !== -1;
                    });

                    quote.setTotals(result);
                }
            ).fail(
                function (response) {
                    errorProcessor.process(response);
                }
            ).always(
                function () {
                    totals.isLoading(false);
                }
            );
        }
    }
);
