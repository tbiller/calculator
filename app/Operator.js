function Operator(operator) {
	this.operator = operator;
	this.type = "operator";
}

Operator.prototype = {
	print: function() {
		return this.operator;
	},
	removeChar: function() {
		this.operator = "";
	},
	length: function() {
		return this.operator.length;
	}
};