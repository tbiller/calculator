function Button(opts) {
	this.std = {
		width: 40,
		height: 40,
		marginWidth: 1,
		borderWidth: 1
	}

	this.widthMultiple = opts.width || 1;
	this.heightMultiple = opts.height || 1;
	this.yMultiple = opts.y || 0;
	this.xMultiple = opts.x || 0;
	this.value = opts.value;
}

Button.prototype = {
	getCssHeight: function() {
		return (this.heightMultiple * this.std.height) + (this.heightMultiple - 1) * this.std.marginWidth;
	},
	getCssWidth: function() {
		return (this.widthMultiple * this.std.width) + (this.widthMultiple - 1) * this.std.marginWidth;
	},
	getCssTop: function() {
		return this.yMultiple * (this.std.height + this.std.marginWidth);
	},
	getCssLeft: function() {
		return this.xMultiple * (this.std.width + this.std.marginWidth);
	},

	buttonPress: function() {
		Calculator.buttonPress(this.value);
	},

	createElement: function(container) {
		var el = $("<div></div>");
		el.addClass("button");
		el.text(this.value);

		el.css({
			height: this.getCssHeight() + "px",
			width: this.getCssWidth() + "px",

			top: this.getCssTop() + "px",
			left: this.getCssLeft() + "px",

			border: this.std.borderWidth + "px solid #dadada"
		}).css({
			lineHeight: el.css("height")
		})

		this.el = el;
		this.addElementToDom(container);
	},

	addElementToDom: function(container) {
		var that = this;

		$(document).ready(function() {
			$(container).append(that.el);
			that.el.on("click", function() {
				that.buttonPress();
			});
		});

	}

};