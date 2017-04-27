define([
    'Magento_Ui/js/lib/view/utils/async',
    'uiRegistry'
], function ($, registry) {
    return {
        geolocate: function(autocomplete) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    autocomplete.setBounds(circle.getBounds());
                });
            }
        },

        init: function (component) {
            var self = this;

            registry.get(component, function (rootComponent) {
                registry.get(component + '.street.0', function (inputComponent) {
                    $.async({
                        selector: '#' + inputComponent.uid
                    }, function (input) {
                        var autocomplete = new google.maps.places.Autocomplete(
                            input,
                            {types: ['geocode']}
                        );

                        autocomplete.addListener('place_changed', function () {
                            self.fillInAddress(autocomplete, rootComponent);
                        });

                        self.geolocate(autocomplete);
                    });
                });
            });
        },

        fillInAddress: function (autocomplete, rootComponent) {
            var place = autocomplete.getPlace();

            if (!place.address_components)
                return;

            rootComponent.getChild('postcode').value('');
            rootComponent.getChild('region_id_input').value('');
            rootComponent.getChild('city').value('');

            var isRegionApplied = false;

            for (var i = place.address_components.length - 1; i >= 0; i--) {
                var addressComponent = place.address_components[i];
                var addressType = addressComponent.types[0];

                switch (addressType) {
                    case 'country':
                        rootComponent.getChild('country_id').value(addressComponent.short_name);
                        break;
                    case 'locality':
                        rootComponent.getChild('city').value(addressComponent.long_name);
                        break;
                    case 'postal_code':
                        rootComponent.getChild('postcode').value(addressComponent.long_name);
                        break;
                    case 'administrative_area_level_1':
                    case 'administrative_area_level_2':
                        if (isRegionApplied)
                            break;

                        var stateSelect = rootComponent.getChild('region_id');
                        if (stateSelect.visible()) {
                            var value = addressComponent.short_name;
                            if (value in window.Setor7_Oopc_regions) {
                                stateSelect.value(window.Setor7_Oopc_regions[value]);
                            }
                        }
                        else {
                            rootComponent.getChild('region_id_input').value(addressComponent.long_name);
                        }

                        isRegionApplied = true;
                        break;
                }
            }
        }
    };
});
