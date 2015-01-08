function nameDate(date) {
	var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
						'Thursday', 'Friday', 'Saturday'];
	var months = ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November',
				'December'];
	var day = date.getDate();
	var sfx = 'th';
	if(Math.floor(day / 10) != 1) switch(day % 10) {
		case 1: sfx = 'st'; break;
		case 2: sfx = 'nd'; break;
		case 3: sfx = 'rd';
	}
	return	daysOfTheWeek[date.getDay()] + ', ' + months[date.getMonth()] +
			' ' + day + sfx + ', ' + date.getFullYear();
}

function nameTime(date) {
	var hour = date.getHours();
	var half = hour < 12 ? 'AM' : 'PM';
	hour = hour % 12 || 12;
	hour = (hour < 10 ? '0' : '') + hour;
	var min = date.getMinutes();
	min = (min < 10 ? '0' : '') + min;
	return hour + ':' + min + ' ' + half;
}

var logApp = angular.module('logApp', []);
logApp.controller('LogCtrl', function ($scope) {
	$scope.days = window.days;
	$scope.addEvent = function() {
		var date = new Date();
		var today = $scope.days[$scope.days.length - 1];
		if(!today || (today.date != nameDate(date))) {
			today = {date: nameDate(date), events: []};
			$scope.days.push(today);
		}
		today.events.push({
			time: nameTime(date),
			length: $scope.length,
			trigger: $scope.trigger,
			occupation: $scope.occupation
		});
		$scope.length = $scope.trigger = $scope.occupation = undefined;
	};
});

window.days = JSON.parse(localStorage.getItem('days') || '[]');
setInterval(window.onbeforeunload = function() {
	localStorage.setItem('days', JSON.stringify(window.days || []));
}, 60000);//Autosave
