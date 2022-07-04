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
        self.username = ko.observable();
        self.password = ko.observable();

        self.testconnection = function() {
            var username = self.username();
            var password = self.password();
            alert(username + " " + password);
        }

        self.onBeforeBinding = function() {
            self.username(self.settings.username);
            self.password(self.settings.password);
        }

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];

        // TODO: Implement your plugin's view model here.
        // self.onBeforeBinding = function() {
        //     self.settings = self.settingsViewModel.settings;
        // };
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: OctolampViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: ["settingsViewModel"],
        // Elements to bind to, e.g. #settings_plugin_OctoLamp, #tab_plugin_OctoLamp, ...
        elements: ["#OctoLampSettings"]
    });
});
