/*
 * View model for OctoPrint-Octolamp
 *
 * Author: Fabian Alvarez
 * License: AGPLv3
 */
$(function() {
    function OctolampViewModel(parameters) {
        var self = this;
        self._g_settings = parameters[0];
        self.settingsViewModel = parameters[1];

        // this will be called when the user clicks the "Go" button and set the iframe's URL to
        // the entered URL
        self.test = function() {
            console.log("test");

            $.ajax({
                url: "/plugin/OctoLamp/login",
                type: "POST",
                data: {
                    command: "login",
                    username: self._g_settings.settings.plugins.OctoLamp.username(),
                    password: self._g_settings.settings.plugins.OctoLamp.password()
                },
                success: function(data) {
                    console.log(data);
                }
            });

        };

        // This will get called before the HelloWorldViewModel gets bound to the DOM, but after its
        // dependencies have already been initialized. It is especially guaranteed that this method
        // gets called _after_ the settings have been retrieved from the OctoPrint backend and thus
        // the SettingsViewModel been properly populated.
        self.onBeforeBinding = function() {
            self.settings = self._g_settings.settings.plugins.OctoLamp;
            self.test();
        };
    };

    // This is how our plugin registers itself with the application, by adding some configuration
    // information to the global variable OCTOPRINT_VIEWMODELS
    OCTOPRINT_VIEWMODELS.push([
        // This is the constructor to call for instantiating the plugin
        OctolampViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ["settingsViewModel"],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        ["#settings_plugin_OctoLamp"]
    ]);
});