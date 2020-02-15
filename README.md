# Objective:
write a function to find expiry datetime. expiry datetime is 3 working hours from "now".
the working hours is defined in "schedule" input parameter.
You can write the function in javascript.

# Input parameters:
now: datetime, current datetime. e.g: '2019-10-11T08:13:07+0800'
schedule: an arraylist of map object. which specified the day open or close and also the start and end of working hours
```
[
	{"open": false, "open_at": "", close_at: ""}, // sunday
	{"open": true, "open_at": "09:00", close_at: "18:00"}, // monday
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "17:00"},
	{"open": false, "open_at": "", close_at: ""},
]
```

# Example:
now is friday 4pm. whith the above schedule, the expiry date should be next monday 11 am. because on friday office close
at 5pm and office is closed on weekend.
output: datetime, 3 working hour from input date ("now"), which is 11 am of next monday

# About the solution
Assume the provided "open_at" and "close_at" time are local time, the solution is using the javascript function which is also based on the local time. 
