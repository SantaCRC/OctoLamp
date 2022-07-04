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

        self.login = function() {
            var username = self.username();
            var password = self.password();

            $.ajax({
                url: API_BASEURL + "octolamp/login",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                contentType: "application/json; charset=UTF-8",
                success: function(data) {
                    showMessage(gettext("Login successful"), "success");
                },
                error: function(xhr) {
                    if (xhr.status == 401) {
                        showMessage(gettext("Invalid username or password."), "error");
                    } else {
                        showMessage(gettext("Could not contact OctoLamp."), "error");
                    }
                }


            });   

            
        }

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];

        // TODO: Implement your plugin's view model here.
        self.onBeforeBinding = function() {
            self.settings = self.settingsViewModel.settings;
        };
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
        elements: ["settings_plugin_OctoLamp"]
    });
});
