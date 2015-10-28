var $ = window.$;

$(document).ready(function () {
	window.viewModel.init();
});

var Math30ViewModel = function () {
	var self = this;
	
	self.optionsContainer = null;
	self.typeButtons = null;
	self.selectAdditionButton = null;
	self.selectSubtractionButton = null;
	self.submitOptionsButton = null;
	self.gameContainer = null;
	self.currentProblem = null;
	self.currentProblemIndex = 0;
	self.problems = [];
	self.problemCount = 30;
	//
	//TODO: build timer functionality and UI
	//TODO: build in ability to have 
	//
	
	self.init = function () {
		//set UI vars
		self.optionsContainer = $("#optionsContainer");
		self.typeButtons = $(".type-button");
		self.selectAdditionButton = $("#btnAddition");
		self.selectSubtractionButton = $("#btnSubtraction");
		self.submitOptionsButton = $("#btnGo");
		self.gameContainer = $("#gameContainer");
		
		//wireup events
		self.typeButtons.click(self.onTypeClick);
		self.submitOptionsButton.click(self.submitOptions);
	};
	
	self.onTypeClick = function (evt) {
		if ($(this).hasClass("btn-success")) {
			$(this).removeClass("btn-success");
			$(this).addClass("btn-default");
		} else {
			$(this).removeClass("btn-default");
			$(this).addClass("btn-success");
		}
	};
	
	self.buildProblems = function () {
		for (var i = 0; i < self.problemCount; i++) {
			self.problems.push(new Problem(i + 1));
		}
		self.currentProblemIndex = 0;
	};
	
	self.nextQuestion = function () {
		if (self.currentProblemIndex + 1 < self.problemCount) {
			self.currentProblemIndex++;
		}
		self.problems[self.currentProblemIndex].paint();
	};	
	
	self.submitOptions = function () {
		//
		//TODO: validation of options\
		//
		self.optionsContainer.hide();
		
		self.buildProblems();
		self.problems[self.currentProblemIndex].paint();
		self.gameContainer.show();
	};
};

var Problem = function (index) {
	var self = this;
	
	self.init();
	self.index = index;
	self.numerator = Problem.random();
	self.denominator = Problem.random();
	self.operator = Problem.randomOperator();
	self.answer = '';
	
	//make sure numerator is >= denominator
	if (self.numerator < self.denominator) {
		self.denominator = [self.numerator, self.numerator = self.denominator][0];
	}
	
	//
	//TODO: calculate correct answer
	//
	
	self.paint = function () {
		Problem.problemNumberContainer.text(self.index + ".");
		Problem.numeratorContainer.text(self.numerator);
		Problem.denominatorContainer.text(self.denominator);
		Problem.operatorContainer.text(self.operator);
		Problem.answerInput.val(self.answer);
		Problem.answerInput.focus();
	};
};

Problem.operators = ['+', '-'];
Problem.min = 0;
Problem.max = 10;
Problem.isInitialized = false;

Problem.prototype.init = function () {
	if (!Problem.isInitialized) {
		Problem.problemNumberContainer = $("#problemNumberContainer");
		Problem.numeratorContainer = $("#numeratorContainer");
		Problem.denominatorContainer = $("#denominatorContainer");
		Problem.operatorContainer = $("#operatorContainer");
		Problem.answerContainer = $("#answerContainer");
		Problem.answerInput = $("#answerInput");
		Problem.answerInput.keypress(Problem.onKeyPress);
		Problem.isInitialized = true;
	}
};
Problem.onKeyPress = function (evt) {
	if (evt.keyCode === 13) {
		window.viewModel.nextQuestion();
	}	
};
Problem.random = function (min, max) {
	if (typeof min === 'undefined') min = Problem.min;
	if (typeof max === 'undefined') max = Problem.max;
	
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
Problem.randomOperator = function () {
	var idx = Problem.random(0, Problem.operators.length - 1);	
	return Problem.operators[idx];
};

window.viewModel = new Math30ViewModel();