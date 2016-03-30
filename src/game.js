function Game() {
	var rolls = [];

	this.totalScore = function() {
		var score = 0;
		var frameIndex = 0;
		for (var frame = 0; frame < 10; frame++) {

			if (isStike(frameIndex)) { //strike
				score += 10 
				+ rolls[frameIndex + 1] 
				+ rolls[frameIndex + 2];
				frameIndex++;
			} 
			else if (isSpare(frameIndex)) { //spare
				score += 10 + rolls[frameIndex + 2];
				frameIndex += 2;
			}
			else {
				score += frameScore(frameIndex);
				frameIndex += 2;
			} 
		}
		return score;
	};

	this.roll = function(pins){
		if (pins < 0 || pins > 10) {
			throw new Error("Invalid pins number");
		};
		roll = rolls.push(pins);
	}

	function frameScore(frameIndex){
		var r1 = rolls[frameIndex] || 0;
		var r2 = rolls[frameIndex + 1] || 0;
		return r1 + r2;
	}

	function isSpare(frameIndex){
		return frameScore(frameIndex) == 10;
	}

	function isStike(frameIndex){
		return rolls[frameIndex] == 10;
	}
}



// Game.prototype.totalScore = function() {
// 	var score = 0;
// 	var i = 0;
// 	for (var frame = 0; frame < 10; frame++) {
// 		var r1 = this.rolls[i] || 0;
// 		var r2 = this.rolls[i + 1] || 0;
// 		var frameScore = r1 + r2;
// 		if (isSpare(r1, r2)) {
// 			frameScore += this.rolls[i + 2];
// 		} 
// 		score += frameScore;
// 		i += 2;
// 	}
// 	return score;
// };

// Game.prototype.roll = function(pins) {
// 	this.rolls[this.currentRoll++] = pins;
// };

module.exports = Game;