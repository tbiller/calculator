QUnit.module("Statement Tests", {
	beforeEach: function() {
		this.reset = function() {
			this.statement = new Statement();
		};
		this.activeVal = function() {
			return this.statement.activeVal();
		};
		this.addChars = function(chars) {
			chars.forEach(function(char) {
				this.statement.addChar(char);
			});
		};
		this.addCharString = function(charString) {
			for (var i=0; i<charString.length; i++) {
				this.statement.addChar(charString.charAt(i));
			}
		};
		this.reset();
	},
	afterEach: function() {

	}
});

QUnit.test("First  number with blank statement", function(assert) {
	assert.equal(this.activeVal().type, "numeric", "Type is set to numeric");
	assert.equal(this.activeVal().print(), "0", "Default value is 0");

	this.addCharString("25.2");
	assert.equal(this.activeVal().type, "numeric", "Type is set to numeric");
	assert.equal(this.activeVal().numericVal(), 25.2, "Numeric value is correct");

	this.reset();
	this.addCharString("0-1");
	assert.equal(this.activeVal().print(), "-1", "Interprets initial zero correctly");
});

QUnit.test("Operators understood", function(assert) {
	this.addCharString("+");
	assert.equal(this.activeVal().type, "operator", "Recognizes operator input");
	assert.equal(this.statement.print(), "0 +");

	this.reset();
	this.addCharString("2+-");
	assert.equal(this.statement.print(), "2 -", "Operators are replaced");
});

QUnit.test("Multi-numeric statements can be compiled", function(assert) {
	this.addCharString("2+3");
	assert.equal(this.statement.print(), "2 + 3", "Num, op, num");

	this.reset();
	this.addCharString("2/5+6");
	assert.equal(this.statement.print(), "2 / 5 + 6", "Num, op, num, op, num");
});

QUnit.test("Addition works", function(assert) {
	this.addCharString("2+3");
	assert.equal(this.statement.calculate().numericVal(), 5, "Addition works");
});

QUnit.test("Subtraction works", function(assert) {
	this.addCharString("2-3");
	assert.equal(this.statement.calculate().numericVal(), -1, "Subtraction works");
});

QUnit.test("Multiplication works", function(assert) {
	this.addCharString("2*3");
	assert.equal(this.statement.calculate().numericVal(), 6, "Multiplication works");
});

QUnit.test("Division works", function(assert) {
	this.addCharString("9/3");
	assert.equal(this.statement.calculate().numericVal(), 3, "Division works");
});

QUnit.test("Multi-operation statements work", function(assert) {
	this.addCharString("9/3+18-2.5*2");
	assert.equal(this.statement.calculate().numericVal(), 37, "Multi-operation statements work");
});

QUnit.test("Exponents work", function(assert) {
	this.addCharString("9^2");
	assert.equal(this.statement.calculate().numericVal(), 81);
});

// QUnit.test("Logs work", function(assert) {
// 	this.addCharString("100 log");
// 	assert.equal(this.statement.calculate().numericVal(), 2);
// });

QUnit.test("Create new statement with starting value", function(assert) {
	this.statement = new Statement(new Numeric(6));
	assert.equal(this.activeVal().type, "numeric");
	assert.equal(this.statement.print(), "6");
});

QUnit.test("Remove char works", function(assert) {
	this.statement = new Statement();
	this.addCharString("2.4*43/1");
	this.statement.removeChar();
	assert.equal(this.statement.print(), "2.4 * 43 /");

	this.statement.removeChar();
	assert.equal(this.statement.print(), "2.4 * 43");

	this.statement.removeChar();
	assert.equal(this.statement.print(), "2.4 * 4");

	this.statement.removeChar();
	assert.equal(this.statement.print(), "2.4 *");

	this.statement.removeChar();
	this.statement.removeChar();
	assert.equal(this.statement.print(), "2.");
	
	this.statement.removeChar();
	this.statement.removeChar();
	assert.equal(this.statement.print(), "0");
});