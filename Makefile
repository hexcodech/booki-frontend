SHELL := /bin/bash
WEBPACK = node_modules/webpack/bin/webpack.js
BUILD_CONFIG = ./webpack-build.config.js
BUILD = ./build

all:
	if [ -e "config.json" ]; then \
		rm -rf $(BUILD); \
		mkdir $(BUILD); \
		cp web/index.html $(BUILD)/index.html; \
		cp config.json $(BUILD)/config.json; \
		cp -r web/css/ $(BUILD)/css/; \
		cp -r web/img $(BUILD)/img; \
		$(WEBPACK) --config "$(BUILD_CONFIG)"; \
	else \
		echo "config.json doesn't exist!"; \
	fi
clean:
	rm -rf $(BUILD)
