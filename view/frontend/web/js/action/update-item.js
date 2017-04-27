define(
    [
        'Setor7_Oopc/js/model/resource-url-manager',
        'Magento_Checkout/js/model/totals',
        'Magento_Checkout/js/model/quote',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor',
        'uiRegistry'
    ],
    function (resourceUrlManager, totals, quote, storage, errorProcessor, registry) {
        "use strict";
        return function (itemId, formData) {
            if (totals.isLoading())
                return;

            totals.isLoading(true);
            var serviceUrl = resourceUrlManager.getUrlForUpdateItem(quote);

            storage.post(
                serviceUrl, JSON.stringify({itemId: itemId, formData: formData}), false
            ).done(
                function (result) {
                    if (!result) {
                        window.location.reload();
                    }
                    registry.get('checkout.sidebar.summary.cart_items.details.thumbnail').imageData
                        = JSON.parse(result.image_data);

                    var options = JSON.parse(result.options_data);

                    result.totals.items.forEach(function (item) {
                        item.amcheckout = options[item.item_id];
                    });

                    quote.setTotals(result.totals);
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
