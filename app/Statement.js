function Statement(startNumeric) {
	// Each statement object represents a series of calculations 
	// Statements begin and end when the '=' button is pressed
	// Statements are arrays of values (numbers and operators)
	this.values = [];
	this.values.push(startNumeric || new Numeric());
	this.calculated = false;
}

Statement.prototype = {
	activeVal: function() {
		return this.values[this.values.length - 1];
	},

	addNewVal: function(newVal) {
		this.values.push(newVal);
	},

	replaceActiveVal: function(newVal) {
		this.values[this.values.length - 1] = newVal;
	},

	addChar: function(newChar) {
		var activeVal = this.activeVal(),
			newCharType = Calculator.getValueType(newChar)

		newChar = newChar.toString();
	
		switch(activeVal.type) {
			case "numeric":
				if (newChar === "-" && activeVal.numericVal() === 0) newCharType = "numeric";

				if (newCharType === "numeric") {
					activeVal.addChar(newChar);
				} else {
					this.addNewVal(new Operator(newChar))
				}
				break;
			case "operator":
				if (newCharType === "operator") {
					this.replaceActiveVal(new Operator(newChar));
				} else {
					this.addNewVal(new Numeric(newChar));
				}
				break;
		}
	},

	removeChar: function() {
		this.activeVal().removeChar();
		if (this.activeVal().length() === 0) {
			this.removeActiveVal();
		}
	},

	removeActiveVal: function() {
		this.values.pop();
		if (this.values.length === 0) {
			this.values.push(new Numeric());
		}
	},

	performCalculation: function(firstVal, secondVal, operator) {
		firstVal = parseFloat(firstVal);
		secondVal = parseFloat(secondVal);

		if (operator && secondVal) {
			switch(operator) {
				case "+":
					return firstVal + secondVal;
				case "-":
					return firstVal - secondVal;
				case "/":
					return firstVal / secondVal;
				case "*":
					return firstVal * secondVal;
				case "^":
					return Math.pow(firstVal, secondVal);
				default: 
					throw new Error("Operator: " + operator + " is not recognized.")
			}
		} else {

		}
	},

	calculate: function(statement) {
		if(this.calculated === true) {
			throw new Error("Statement has already been calculated");
		}

		if(this.activeVal().type === "operator") this.values.pop();

		var firstVal, 
			operator, 
			secondVal, 
			result;
		
		firstVal = this.values[0].numericVal();
		for(var i = 0; i < this.values.length - 1; i += 2) {
			operator = this.values[i+1].print();
			secondVal = this.values[i+2].numericVal();

			result = this.performCalculation(firstVal, secondVal, operator);
			firstVal = result; 
		}

		this.calculated = true;

		if ($.isNumeric(result)) {
			var resultNumeric = new Numeric(result.toString());
			resultNumeric.finalized = true;

			this.addNewVal(new Operator("="));
			this.addNewVal(resultNumeric);
			return resultNumeric;
		}

	},


	print: function() {
		var output = "";

		if (this.calculated) {
			output = "<div class='logged-statement'>";

			output += this.values.map(function(value) {
				return value.type === "numeric" ? 
					"<span class='logged-value' numeric-val=" +
					value.numericVal() +
					">" + value.print() + "</span>" :
					value.print();
			}).join(" ");

			output += "</div>";
		} else {
			output = this.values.map(function(value) {
				return value.print();
			}).join(" ");
		}
		
		return output;
	},

	updateWithLoggedValue: function(numericVal) {
		var newVal = new Numeric(numericVal);
		newVal.finalized = true;
		if (this.activeVal().type === "numeric") {
			this.replaceActiveVal(newVal);
		} else {
			this.addNewVal(newVal);
		}
	}

}