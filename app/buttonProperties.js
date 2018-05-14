var keyMap = {
	keypress: {
		43: "+",
		45: "-",
		47: "/",
		42: "*",
		61: "=",
		13: "=",
		46: ".",
		94: "^"
	},
	keydown: {
		8: "<--",
		46: "clr"
	}
}

var buttonProperties = [
	// row 0
	{
		value: 0,
		x: 0,
		y: 3,
		width: 2
	},
	{
		value: ".",
		x: 2,
		y: 3,
		width: 1
	},
	{
		value: "+",
		x: 3,
		y: 3,
		width: 1
	},

	// row 1
	{
		value: 1,
		x: 0,
		y: 2,
		width: 1
	},
	{
		value: 2,
		x: 1,
		y: 2,
		width: 1
	},
	{
		value: 3,
		x: 2,
		y: 2,
		width: 1
	},
	{
		value: "-",
		x: 3,
		y: 2,
		width: 1
	},
	// {
	// 	value: "=",
	// 	x: 4,
	// 	y: 3,
	// 	height: 2
	// },

	// row 2
	{
		value: 4,
		x: 0,
		y: 1,
		width: 1
	},
	{
		value: 5,
		x: 1,
		y: 1,
		width: 1
	},
	{
		value: 6,
		x: 2,
		y: 1,
		width: 1
	},
	{
		value: "*",
		x: 3,
		y: 1,
		width: 1
	},
	{
		value: "<--",
		x: 4,
		y: 1,
		width: 1
	},

	// row 3
	{
		value: 7,
		x: 0,
		y: 0,
		width: 1
	},
	{
		value: 8,
		x: 1,
		y: 0,
		width: 1
	},
	{
		value: 9,
		x: 2,
		y: 0,
		width: 1
	},
	{
		value: "/",
		x: 3,
		y: 0,
		width: 1
	},
	{
		value: "CLR",
		x: 4,
		y: 0,
		height: 1
	},
	{
		value: "^",
		x: 4,
		y: 2,
		height: 1
	},
	{
		value: "=",
		x: 4,
		y: 3,
		height: 1
	}

];