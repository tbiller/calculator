function Numeric(valString) {
	this.valString = (valString || "").toString();
	this.type = "numeric";
	this.finalized = false;
}

Numeric.prototype = {
	addChar: function(char) {
		if (this.finalized) {
			this.valString = char;
			this.finalized = false;
			return;
		}
		if (char === "-") {
			if (this.numericVal() !== 0) {
				throw new Error("Attempting to add minus sign to non-zero numeric");
			}
			this.valString = char;
		} else {
			this.valString += char;
		}
	},

	removeChar: function(){
		if (this.valString.length <= 1) {
			this.valString = "";
			return false;
		}
		// this.valString = this.numericVal().toString();
		this.valString = this.valString.substr(0, this.valString.length - 1);
		this.finalized = false;
	},

	length: function() {
		return this.valString.length;
	},

	numericVal: function() {
		return parseFloat(format("0.########", this.valString)) || 0;
	},

	print: function() {
		if (this.valString === "-") return this.valString;

		return format("#,##0.########", this.numericVal()) +  
				(this.valString.substr(-1) === "." ? "." : "");
	},

};