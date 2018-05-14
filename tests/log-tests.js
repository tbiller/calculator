QUnit.module("Log Tests", {
	beforeEach: function() {
		this.log = new Log("#qunit-fixture");
		this.addCharString = function(statement, charString) {
			for(var i=0; i<charString.length; i++) {
				statement.addChar(charString.charAt(i));
			}
		};
	},

	afterEach: function() {

	}
});


QUnit.test("Statement is added to log", function(assert) {
	var statement = new Statement();

	assert.equal(this.log.statements.length, 0, "Initially no statements in log");
	
	this.addCharString(statement, "45*99");
	statement.calculate();
	this.log.addStatement(statement);

	assert.equal(this.log.statements.length, 1, "Statement is added to log");
	assert.equal($(".logged-statement:first-child").text(), "45 * 99 = 4,455");

});
