# coding=utf-8
from __future__ import absolute_import

### (Don't forget to remove me)
# This is a basic skeleton for your plugin's __init__.py. You probably want to adjust the class name of your plugin
# as well as the plugin mixins it's subclassing from. This is really just a basic skeleton to get you started,
# defining your plugin as a template plugin, settings and asset plugin. Feel free to add or remove mixins
# as necessary.
#
# Take a look at the documentation on what other plugin mixins are available.

import octoprint.plugin
import flask
from meross_iot.http_api import MerossHttpClient
from meross_iot.manager import MerossManager

class OctolampPlugin(octoprint.plugin.SettingsPlugin,
    octoprint.plugin.AssetPlugin,
    octoprint.plugin.TemplatePlugin,
    octoprint.plugin.StartupPlugin,
    octoprint.plugin.SimpleApiPlugin,
):
    # Initialize the plugin logging
    def on_after_startup(self):
        self._logger.info("Octolamp Plugin Started")
        username = self._settings.get(["username"])
        password = self._settings.get(["password"])
    ##~~ SettingsPlugin mixin

    # Defaults values
    def get_settings_defaults(self):
        return dict(
            username=None,
            password=None,
            url='https://google.com')
        
    # Setting templates for the plugin
    def get_template_configs(self):
        return [
            {"type": "settings", "custom_bindings": True},
        ]
    
    # Define api commands
    def get_api_commands(self):
        return dict(
            login = ['username', 'password']
        )
        
    async def test_connection(self,email,password):
        http_api_client = await MerossHttpClient.async_from_user_password(email=email, password=password)

        # Setup and start the device manager
        manager = MerossManager(http_client=http_api_client)
        await manager.async_init()

        # Retrieve all the MSS310 devices that are registered on this account
        await manager.async_device_discovery()
        plugs = manager.find_devices(device_type="mss310")
        return plugs  
        
    # Define api responses
    def on_api_command(self,command,data):
        if command == "login":
            username = data["username"]
            password = data["password"]
            plug=self.test_connection(username,password)
            print(plug)
            return flask.jsonify(plugs=username,passwd=password)
            
    # Get api response
    def on_api_get(self, request):
        return flask.jsonify(foo="bar")
    
    
    # Debugging
    def on_settings_save(self, data):
        octoprint.plugin.SettingsPlugin.on_settings_save(self, data)
        self._logger.info("Saving settings for Octolamp: %s" % data)

    ##~~ AssetPlugin mixin

    def get_assets(self):
        # Define your plugin's asset files to automatically include in the
        # core UI here.
        return dict(
            js= ["js/OctoLamp.js","js/helloworld.js"],
            css= ["css/OctoLamp.css"],
            less=["less/OctoLamp.less"]
        )

    ##~~ Softwareupdate hook

    def get_update_information(self):
        # Define the configuration for your plugin to use with the Software Update
        # Plugin here. See https://docs.octoprint.org/en/master/bundledplugins/softwareupdate.html
        # for details.
        return {
            "OctoLamp": {
                "displayName": "Octolamp Plugin",
                "displayVersion": self._plugin_version,

                # version check: github repository
                "type": "github_release",
                "user": "SantaCRC",
                "repo": "OctoPrint-Octolamp",
                "current": self._plugin_version,

                # update method: pip
                "pip": "https://github.com/SantaCRC/OctoPrint-Octolamp/archive/{target_version}.zip",
            }
        }

    # Custom API commands
    @octoprint.plugin.BlueprintPlugin.route("/echo", methods=["GET"])
    def echo(self):
        return flask.jsonify(foo="bar")
        


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "Octolamp Plugin"


# Set the Python version your plugin is compatible with below. Recommended is Python 3 only for all new plugins.
# OctoPrint 1.4.0 - 1.7.x run under both Python 3 and the end-of-life Python 2.
# OctoPrint 1.8.0 onwards only supports Python 3.
__plugin_pythoncompat__ = ">=3,<4"  # Only Python 3

def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = OctolampPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
