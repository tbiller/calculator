Calculator.setUpKeyListeners(); // set up keypress listeners, ONCE!

QUnit.module("Acceptance", {
	beforeEach: function() {
		Calculator.createElements("#qunit-fixture");
		Calculator.reset();

		this.lastLoggedStatement = function() {
			return $(".logged-statement:first-child");
		};

		this.lastLoggedText = function() {
			return this.lastLoggedStatement().text();
		};

		this.buttonSequence = function(btns) {
			if (Array.isArray(btns)) {
				btns.forEach(function(btn) {
					Calculator.buttonPress(btn);
				});
			} else {
				for(var i=0; i<btns.length; i++) {
					Calculator.buttonPress(btns.charAt(i));
				}
			}
			
		};

		this.buttons = $(".button"),
		this.display = $("#display"),
		this.logs = $("#logs");
	}
});

QUnit.test("Calculator is displayed", function(assert) {
	assert.equal(this.buttons.length, buttonProperties.length, "Buttons are created");
	assert.equal(this.display.length, 1, "Display is created");
	assert.equal(this.logs.length, 1, "Logs are created");
});

QUnit.test("Button presses are captured", function(assert) {

	assert.equal(this.display.text(), "0", "Display initialized with 0");

	this.buttonSequence("243");
	assert.equal(this.display.text(), "243", "Button presses are captured");
});


QUnit.test("keypresses are captured", function(assert) {
	console.log(this.display.text());
	var e = $.Event('keypress', { which: 50 } ); // 2
	$("#qunit-fixture").trigger(e);
	console.log(this.display.text());
	assert.equal(this.display.text(), "2", "Key presses are captured");

	e = $.Event('keydown', { which: 8 } ); // clr
	$("#qunit-fixture").trigger(e);
	assert.equal(this.display.text(), "0", "Key presses are captured");
});


QUnit.test("Statement result is captured in display", function(assert) {
	this.buttonSequence("22-32=");
	assert.equal(this.display.text(), "-10");
});


QUnit.test("Pressing buttons right after calculation replaces result", 
		function(assert) {
	this.buttonSequence("22-32=");
	this.buttonSequence(".48");
	assert.equal(this.display.text(), "0.48");
});

QUnit.test("Clicking logged value replaces it in display", function(assert) {
	var done = assert.async(),
		that = this;
	this.buttonSequence("45.2*2000=");

	setTimeout(function() {
		that.lastLoggedStatement().children(".logged-value:nth-child(2)").trigger("click");
		assert.equal(that.display.text(), "2,000", "Value is replaced in display");
		done();

		// this.lastLoggedStatement().children(".logged-value:last-child").click();
		// assert.equal(this.display.text(), "90,400", "Value is replaced in display");

		// this.buttonSequence(".48");
		// assert.equal(this.display.text(), "0.48", "Logged value is replaced by new buttons");
	}, 50);

});
