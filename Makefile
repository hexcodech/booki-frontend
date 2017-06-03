SHELL := /bin/bash
WEBPACK = node_modules/webpack/bin/webpack.js
BUILD_CONFIG = ./webpack-build.config.js
BUILD = ./build

all:
	if [ -e "config.json" ]; then cp web/index.html build/index.html; \
		$(WEBPACK) --config "$(BUILD_CONFIG)"; \
	else \
		echo "config.json doesn't exist!"; \
	fi
clean:
	rm -rf $(BUILD)/
