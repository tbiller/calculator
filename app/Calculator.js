var Calculator = (function(buttonProperties, keyMap) {
	var	buttons = [],
	log = {},
	display = {},
	activeStatement = {};
	activeValue = 0;

	activeStatement = new Statement(0);

	var createButtons = function(container) {
		var keypadContainer = "#keypad";
		$(document).ready(function() {
			$(container).append("<div id='keypad'></div>");
		});

		buttonProperties.forEach(function(buttonProps) {
			var newButton = new Button(buttonProps);
			newButton.createElement(keypadContainer);
			buttons.push(newButton);
		});
	};

	var setupKeypressListeners = function() {
		$(document).on("keypress", function(e) {
			var key = e.which,
			btnValue;

			console.log(key);
			if (key >= 48 && key <= 57) {
				btnValue = key - 48;
			} else {
				btnValue = keyMap.keypress[key];
			}

			if (btnValue !== undefined) {
				calcObj.buttonPress(btnValue);
				e.preventDefault();
			}

		});

		$(document).on("keydown", function(e) {
			var key = e.which,
			btnValue;

			btnValue = keyMap.keydown[key];
			if (btnValue) {
				calcObj.buttonPress(btnValue);
				e.preventDefault();
			}
		});
	};

	var createDisplay = function(container) {
		display = new Display(container);
	};

	var createLogs = function(container) {
		log = new Log(container);
		log.calculator = calcObj;
	};

	var updateActiveValue = function(btnValue) {
		updateDisplay();
	};

	var updateDisplay = function() {
		display.updateWithStatement(activeStatement);
	};

	var saveStatement = function(resultNumeric) {
		var statementToSave = activeStatement;
		log.addStatement(statementToSave);
		activeStatement = new Statement(resultNumeric);

		updateDisplay();
	};



	/********************** PUBLIC METHODS *************************/
	var calcObj = {
		reset: function() {
			activeStatement = new Statement();
		},

		create: function(container) {
			this.createElements(container);
			setupKeypressListeners();
			activeStatement = new Statement();
		},

		createElements: function(container) {
			var keypadAndDisplay = "<div id='keypadAndDisplay'></div>";
			$(document).ready(function() {
				$(container).append(keypadAndDisplay);
			});
			createDisplay("#keypadAndDisplay");
			createButtons("#keypadAndDisplay");
			updateDisplay();
			createLogs(container);
		},

		setUpKeyListeners: function() {
			setupKeypressListeners();
		},

		buttonPress: function(btnValue) {
			switch(btnValue.toString().toLowerCase()) {
				case "=":
					var resultNumeric = activeStatement.calculate();
					saveStatement(resultNumeric);
					break;
				case "clr":
					activeStatement = new Statement();
					break;
				case "<--":
					activeStatement.removeChar();
					break;
				default:
					activeStatement.addChar(btnValue);
			}
			updateDisplay();
		},

		insertLoggedValue: function(val) {
			activeStatement.updateWithLoggedValue(val);
			updateDisplay();
		},

		clearValues: function() {
			curVal = 0;
			prevVal = 0;
		},

		// formatValue: function(val) {
		// 	return format("#,##0.###########", val) + 
		// 		(val.toString().substr(-1) === "." ? "." : "");
		// },

		getValueType: function(val) {
			switch (val.toString()) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
				case ".":
				return "numeric";
				case "+":
				case "-":
				case "*":
				case "/":
				case "^":
				return "operator";
				case "CLR":
				return "clear";
				case "=":
				return "calculate";
			}
		}
	};
	return calcObj;

}(buttonProperties, keyMap));