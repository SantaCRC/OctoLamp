/*
 * View model for OctoPrint-Octolamp
 *
 * Author: Fabian Alvarez
 * License: AGPLv3
 */
$(function() {
    function OctolampViewModel(parameters) {
        var self = this;

        self.settings = parameters[0];

        // Get username and password from settings
        self.username = ko.observable();
        self.password = ko.observable();

        self.test_connection = function(){
            
        }


    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: OctolampViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [ /* "loginStateViewModel", "settingsViewModel" */ ],
        // Elements to bind to, e.g. #settings_plugin_OctoLamp, #tab_plugin_OctoLamp, ...
        elements: [ /* ... */ ]
    });
});
