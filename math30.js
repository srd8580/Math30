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
	self.timerContainer = null;
	self.timerOn = false;
	self.seconds = 0;
	self.currentProblemIndex = 0;
	self.allowedOperators = [];
	self.problems = [];
	self.problemCount = 30;	
	
	self.init = function () {
		//set UI vars
		self.optionsContainer = $("#optionsContainer");
		self.typeButtons = $(".type-button");
		self.selectAdditionButton = $("#btnAddition");
		self.selectSubtractionButton = $("#btnSubtraction");
		self.submitOptionsButton = $("#btnGo");
		self.gameContainer = $("#gameContainer");
		self.timerContainer = $("#timerContainer");
		
		//wireup events
		self.typeButtons.click(self.onTypeClick);
		self.submitOptionsButton.click(self.startGame);
	};
	
	self.onTypeClick = function (evt) {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
	};
	
	self.buildAllowedOperators = function () {
		self.allowedOperators = [];
		
		$("[data-operator]").each(function () {
			if ($(this).hasClass("active")) {
				self.allowedOperators.push($(this).data("operator"));
			}
		});
	};
	
	self.buildProblems = function () {
		self.problems = [];
		
		for (var i = 0; i < self.problemCount; i++) {
			self.problems.push(new Problem(i + 1, self.allowedOperators));
		}
		self.currentProblemIndex = 0;
	};
	
	self.nextQuestion = function () {
		self.problems[self.currentProblemIndex].answer = Problem.answerInput.val();
		
		if (self.currentProblemIndex + 1 < self.problemCount) {
			self.currentProblemIndex++;
			self.problems[self.currentProblemIndex].paint();
		} else {	//done
			self.completeGame();
		}
	};	
	
	self.startTimer = function () {
		self.seconds = 0;
		self.timerOn = true;
	};
	
	self.completeGame = function () {
		self.timerOn = false;
		
		var correctAnswers = $.grep(self.problems, function (item) {
			return item.isCorrect();
		});
		
		alert("You got " + 
			  correctAnswers.length + " of " + 
			  self.problemCount + " correct in " + self.seconds + " seconds!");
		
		self.optionsContainer.show();
		self.gameContainer.hide();		
	};
	
	self.startGame = function () {
		self.buildAllowedOperators();
		
		if (self.allowedOperators.length < 1) {
			alert("Please choose at least one type!");
			return;
		}
		
		self.optionsContainer.hide();
				
		self.buildProblems();
		self.problems[self.currentProblemIndex].paint();
		self.startTimer();
		self.gameContainer.show();
	};
	
	setInterval(function () {
		if (self.timerOn) {
			self.seconds++;
			self.timerContainer.text(self.seconds);
		}
	}, 1000);
};

var Problem = function (index, allowedOperators) {
	var self = this;
	
	self.init();
	self.index = index;
	self.numerator = Problem.random();
	self.denominator = Problem.random();
	self.operator = Problem.randomOperator(allowedOperators);
	self.correctAnswer = null;
	self.answer = '';
	
	//make sure numerator is >= denominator
	if (self.numerator < self.denominator) {
		self.denominator = [self.numerator, self.numerator = self.denominator][0];
	}
	
	self.correctAnswer = eval(self.numerator + self.operator + self.denominator);
	
	self.paint = function () {
		Problem.problemNumberContainer.text(self.index + ".");
		Problem.numeratorContainer.text(self.numerator);
		Problem.denominatorContainer.text(self.denominator);
		Problem.operatorContainer.text(self.operator);
		Problem.answerInput.val(self.answer);
		Problem.answerInput.focus();
	};
	
	self.isCorrect = function () {
		return self.correctAnswer == self.answer;	
	};
};

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
Problem.randomOperator = function (operators) {
	var idx = Problem.random(0, operators.length - 1);	
	return operators[idx];
};

window.viewModel = new Math30ViewModel();