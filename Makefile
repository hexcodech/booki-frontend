SHELL := /bin/bash
WEBPACK = node_modules/webpack/bin/webpack.js
BUILD_CONFIG = ./webpack-build.config.js
BUILD = ./build

all:
	if [ -e "config.json" ]; then \
		rm -rf $($BUILD); \
		cp web/index.html build/index.html; \
		cp -r web/css/ build/css/; \
		cp -r web/img build/img; \
		$(WEBPACK) --config "$(BUILD_CONFIG)"; \
	else \
		echo "config.json doesn't exist!"; \
	fi
clean:
	rm -rf $(BUILD)
