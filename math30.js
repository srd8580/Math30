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
	
	self.init = function () {
		//set vars
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
	
	self.submitOptions = function () {
		//TODO: validation
		self.optionsContainer.hide();
		self.gameContainer.show();
	};
};

window.viewModel = new Math30ViewModel();