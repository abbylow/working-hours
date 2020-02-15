/*
# Objective:
write a function to find expiry datetime. expiry datetime is 3 working hours from "now".
the working hours is defined in "schedule" input parameter.
You can write the function in javascript.
# input parameters:
now: datetime, current datetime. e.g: '2019-10-11T08:13:07+0800'
schedule: an arraylist of map object. which specified the day open or close and also the start and end of working hours
[
	{"open": false, "open_at": "", close_at: ""}, // sunday
	{"open": true, "open_at": "09:00", close_at: "18:00"}, // monday
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "17:00"},
	{"open": false, "open_at": "", close_at: ""},
]
# example:
now is friday 4pm. whith the above schedule, the expiry date should be next monday 11 am. because on friday office close
at 5pm and office is closed on weekend.
output: datetime, 3 working hour from input date ("now"), which is 11 am of next monday
*/

function checkAllDaysClosed(schedule) {
  return schedule.filter(el => el.open === false).length === 7;
}

function find(now, schedule) {
  if (checkAllDaysClosed(schedule)) {
    throw new Error('No working day at all')
  }

  let durationLeft = 180; //minutes
  let accumulatedDays = 0;
  let currentDay = now.getDay();
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();

  function jumpNextDay(){
    currentDay = currentDay === 6 ? 0 : currentDay + 1;
    accumulatedDays++;
    currentHour = 0;
    currentMin = 0;
  }

  while (durationLeft > 0) {
    const currentSchedule = schedule[currentDay];

    if (currentSchedule.open) {
      let currentTimeStr = String(currentHour).padStart(2, '0') + ':' + String(currentMin).padStart(2, '0');
      let startTime = (currentTimeStr > currentSchedule.open_at) ? currentTimeStr : currentSchedule.open_at;
      let endTime = currentSchedule.close_at;

      if (startTime >= endTime) {
        jumpNextDay();
      }
      else{
        let startTimeArr = startTime.split(":");
        let startTimeInMins = (parseInt(startTimeArr[0]) * 60) + parseInt(startTimeArr[1]);
        let endTimeArr = endTime.split(":");
        let endTimeInMins = (parseInt(endTimeArr[0]) * 60) + parseInt(endTimeArr[1]);

        let maxOpenMins = endTimeInMins - startTimeInMins;
        if (maxOpenMins < durationLeft) {
          durationLeft -= maxOpenMins;
          jumpNextDay();
        }
        else {
          let finalTimeInMins = startTimeInMins + durationLeft; 
          let result = new Date(now.getTime());
          result.setDate(result.getDate() + accumulatedDays);
          result.setHours(finalTimeInMins / 60, finalTimeInMins % 60);
          return result;
        }
      }
    }
    else {
      jumpNextDay();
    }
  }
}
