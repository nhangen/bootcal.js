$(document).ready(function() {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

		function daysInMonth(month, year) {
			return new Date(year, month + 1, 0).getDate();
		}

		function getNextMonth(year, month) {
			return new Date(year, month);
		}

		function getLastMonth(year, month) {
			return new Date(year, month);
		}
		
		function set_calendar(year, month) {
			// lets get todays date and use it to establish our calendar grid
			if (year && month >= 0) {
				var today = new Date(year, month);
			}
			else {
				var today = new Date();
			}
			
			var day = today.getDay();
			var month = today.getMonth();
			var year = today.getFullYear();
			/* this variable allows us to start our date grid on the proper day
			since Sunday is 0 and our calendar starts on Monday, we add 1 to the date 
			(taken care of via the for statement below) and since eq() elements are 0 based, 
			we subtract 1, leaving us with day - 1
			*/
			var offset = day - 1;
			// this variable allows us to populate the date grid
			var daysinmonth = daysInMonth(month, year);
			// get next and last month for button data attributes
			if (month == 11) {
				var lastMonth = month - 1;
				var lastMonthYear = year;
				var nextMonth = 0;
				var nextMonthYear = year + 1;
			}
			else if (month == 0) {
				var lastMonth = 11;
				var lastMonthYear = year -1;
				var nextMonth = month + 1;
				var nextMonthYear = year;
			}
			else {
				var lastMonth = month - 1;
				var lastMonthYear = year;
				var nextMonth = month + 1;
				var nextMonthYear = year;
			}
			//console.log(lastMonthYear + ' ' + lastMonth);
			var nextDate = getNextMonth(nextMonthYear, nextMonth);
			var lastDate = getLastMonth(lastMonthYear, lastMonth);
			//console.log(lastDate);
			//console.log(daysinmonth);
			// set month at top of calendar
			$("#month").text(monthNames[month] + ' ' + year);
			// set data attributes so that we can move forward, backward, and return to today
			$("button#today").data("today", today);
			$("button#last").data("last", lastDate);
			$("button#next").data("next", nextDate);
			// loop to set the days on the grid
			$("td .number-day").text('');
			for (i = 1; i <= daysinmonth; i++) {
				$("td .number-day").eq(i + offset).text(i);
			}
		}
		set_calendar();
		// now let's make some magic happen with our buttons
		$("#last").click(function(e) {
			e.preventDefault();
			var last = $('#last').data('last');
			var month = last.getMonth();
			var year = last.getFullYear();
			set_calendar(year, month);
		});
		$("#next").click(function(e) {
			e.preventDefault();
			var next = $('#next').data('next');
			var month = next.getMonth();
			var year = next.getFullYear();
			set_calendar(year, month);
		});
		$("#today").click(function(e) {
			e.preventDefault();
			set_calendar();
		});
});
