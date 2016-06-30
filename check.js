// checkin to, or checkout from, the hackerspace via its web site

// TODO: global replace to avoid duplicate checkins, per-person checkin
// TODO: specify time interval, update calendar, see https://developers.google.com/google-apps/calendar/v3/reference/events/quickAdd#examples

// the string that serves as an anchor in the file for adding text
var openString = '<p>The space is open if someone is there.</p>';

// the string that is added to notify someone is in the space
var checkinString =   '<p>Kai <a href="tel:00886931157391">09311157391</a> is at the space.</p>';
var checkinStringRE = '<p>Kai <a href="tel:00886931157391">09311157391</a> is.*at the space.</p>';
var filename = 'index.html';

var check = process.argv[2];
var action = process.argv[3];
var checkin;

if (check === 'in') {
  checkin = true;
} else if (check === 'out') {
  checkin = false;
} else {
  console.log('usage: node check.js in|out');
  process.exit(1);  
}

fs = require('fs')
fs.readFile(filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  if (checkin) {
    if (typeof action !== 'undefined' && action !== '') {
      checkinString = checkinString.replace('is at the space', 'is ' + action + ' at the space');
    }
    data = data.replace(openString, openString + "\n" + checkinString);
    console.log('addded string ' + checkinString + ' to ' + filename);
  } else {
    var re = new RegExp("\n" + checkinStringRE);
    data = data.replace(re, '');
    console.log('removed string ' + checkinStringRE + ' from ' + filename);
  }
  fs.writeFile(filename, data, function (err) {
    if (err) return console.log(err);
    console.log('wrote file', filename);
  });
});

