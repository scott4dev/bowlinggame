var Game = require('../src/game.js');

describe('Game', function() {

	var game;

	var rollMany = function(times, pins){
		for (var i = 0; i < times; i++) {
			game.roll(pins);
		}
	};

	var rollSpare = function(first, second){
		game.roll(first);
		game.roll(second);
	};

	var rollStike = function(){
		game.roll(10);
	};

	beforeEach(function() {	
		game = new Game();
	});

	it('should have a score of 0 by default', function() {
		expect(game.totalScore()).toEqual(0);
	});

	it('should have a score of 0 after 20 failed roll', function() {
		rollMany(20, 0);
		expect(game.totalScore()).toEqual(0);
	});

	it('should have a score of 10 after 20 roll of 1', function() {
		rollMany(20, 1);
		expect(game.totalScore()).toEqual(20);
	});

	it('should have a score of 16 after one spare', function() {
		rollSpare(5, 5);
		game.roll(3);
		rollMany(17, 0);
		// totalScore 5 + 5 + 3*2 
		expect(game.totalScore()).toEqual(16);
	});

	it('should have a score of 300 for perfect game', function() {
		rollMany(12, 10);
		expect(game.totalScore()).toEqual(300);
	});

	it('should have a score of 52 for X,X,6,2,0,.....0', function() {
		rollStike();
		rollStike();
		game.roll(6);
		game.roll(2);
		rollMany(16, 0);
		expect(game.totalScore()).toEqual(52);
	});

	it('should have a score of 24 after one strike', function() {
		rollStike();
		game.roll(4);
		game.roll(3);
		rollMany(16, 0);
		// totalScore 5 + 5 + 3*2 
		expect(game.totalScore()).toEqual(24);
	});

	it('should have a score of 39 after two spare', function() {
		rollSpare(5, 5);
		game.roll(3);
		game.roll(1);
		rollSpare(5, 5);
		game.roll(6);
		rollMany(13, 0);
		// totalScore 5 + 5 + 3*2 + 1 + 5 + 5 + 6 * 2
		expect(game.totalScore()).toEqual(39);
	});

	it('should throw when pins is greater than 10', function() {
		expect( function(){
			game.roll(11);
		}).toThrow(new Error("Invalid pins number"));
	});

	it('should throw when pins is less than 0', function() {
		expect( function(){
			game.roll(-1);
		}).toThrow(new Error("Invalid pins number"));
	});
});