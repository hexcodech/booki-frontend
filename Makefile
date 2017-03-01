WEBPACK = webpack
CONFIG = ./webpack.config.js

BUILD = ./build



all:
	$(WEBPACK) --config $(CONFIG)
clean:
	rm -rf $(BUILD)/*