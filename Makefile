WEBPACK = webpack
BUILD_CONFIG = ./webpack-build.config.js
BUILD = ./build

all:
	if [ -f config.json ] && [ -f web/oauth-callback.php ]; then
		$(WEBPACK) --config $(BUILD_CONFIG)
		cp web/index.html $(BUILD)/index.html
		cp config.json $(BUILD)/config.json
	else
		echo "Rename config-sample.json to config.json and web/oauth-callback-sample.php to web/oauth-callback.php and adjust the values.";
	fi
clean:
	rm -rf $(BUILD)/
