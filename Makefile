WEBPACK = webpack
BUILD_CONFIG = ./webpack-build.config.js

BUILD = ./build



all:
	$(WEBPACK) --config $(BUILD_CONFIG)
clean:
	rm -rf $(BUILD)/*