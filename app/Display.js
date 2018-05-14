function Display(container) {
	var that = this;

	this.el = $("<div></div>");
	this.el.attr("id", "display");
	
	$(document).ready(function() {
		$(container).append(that.el);
	});
}

Display.prototype = {
	createElement: function(container) {
		var that = this;
		$(document).ready(function() {
			$(container).append(that.el);
		});
	},
	updateDisplay: function(value) {
		this.el.text(value);
	},

	updateWithStatement: function(statement) {
		this.updateDisplay(statement.print());
	}
};