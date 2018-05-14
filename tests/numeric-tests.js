QUnit.module("Numeric Tests", {
	beforeEach: function() {
		this.addCharString = function(value, charString) {
			for(var i=0; i<charString.length; i++) {
				value.addChar(charString.charAt(i));
			}
		};
	},

	afterEach: function() {

	}
});


QUnit.test("Numeric value is interpreted correctly", function(assert) {
	var value = new Numeric("2.");
	assert.equal(value.numericVal(), 2, "Ending period is dropped");

	value = new Numeric(".");
	assert.equal(value.numericVal(), 0, "Single period is 0");

	value = new Numeric("-");
	assert.equal(value.numericVal(), 0, "Single negative sign is 0");

	value = new Numeric(".4");
	assert.equal(value.numericVal(), 0.4, "Leading period is understood");

	value = new Numeric("-.4");
	assert.equal(value.numericVal(), -0.4, "Leading negative sign is understood");

	value = new Numeric(0.1 + 0.2);
	assert.equal(value.numericVal(), 0.3, "Floating point errors are dropped");

	value = new Numeric("-");
	assert.equal(value.numericVal(), 0);
	assert.equal(value.print(), "-", "Negative sign is added to valstring");

	value = new Numeric("00");
	assert.equal(value.print(), "0", "Leading zeros are dropped");
	value.addChar("3");
	assert.equal(value.print(), "3", "Leading zeros are dropped");
	assert.equal(value.numericVal(), 3, "Leading zeros are dropped");

	value = new Numeric();
	this.addCharString(value, "0-.5");
	assert.equal(value.print(), "-0.5", "Leading zeros are dropped before negative");
});

QUnit.test("Value prints correctly", function(assert) {
	var value = new Numeric("24");
	assert.equal(value.print(), "24", "Positive integer prints");

	value = new Numeric("-24");
	assert.equal(value.print(), "-24", "Negative integer prints");

	value = new Numeric("-24.");
	assert.equal(value.print(), "-24.", "Trailing zero maintained");

	value = new Numeric("24.00000000003");
	assert.equal(value.print(), "24", "Values with floating point errors print correctly");

	value = new Numeric("24000");
	assert.equal(value.print(), "24,000", "Thousands comma inserted");

	value = new Numeric("24000000");
	assert.equal(value.print(), "24,000,000", "Millions comma inserted");

	value = new Numeric("120.10");
	assert.equal(value.print(), "120.1", "Trailing zeros are trimmed");

});

QUnit.test("addChar works", function(assert) {
	var value = new Numeric();
	value.addChar(".");
	assert.equal(value.valString, ".");

	value.addChar("24");
	assert.equal(value.valString, ".24");
});

QUnit.test("removeChar works", function(assert) {
	var value = new Numeric("23");
	value.removeChar();
	assert.equal(value.valString, "2");

	value.removeChar();
	assert.equal(value.valString, "");
});