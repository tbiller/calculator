function Log(container) {
	var that = this;
	this.el = $("<div></div>");
	this.el.attr("id", "logs");
	
	$(document).ready(function() {
		$(container).append(that.el);
	});

	this.calculator = {};
	this.statements = [];
	this.setClickListeners();
}


Log.prototype = {
	setClickListeners: function() {
		var that = this;
		$(document).ready(function() {
			that.el.on("click", ".logged-value", function() {
				that.calculator.insertLoggedValue($(this).attr("numeric-val"));
			});
		});
	},

	addStatement: function(statement) {
		this.statements.push(statement);
		this.el.animate({scrollTop: 0}, 50);
		this.el.prepend(statement.print());
	},

};