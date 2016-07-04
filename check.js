// checkin to, or checkout from, the hackerspace via its web site

// TODO: global replace to avoid duplicate checkins, per-person checkin
// TODO: specify time interval, update calendar, see https://developers.google.com/google-apps/calendar/v3/reference/events/quickAdd#examples

// the string that serves as an anchor in the file for adding text
var openString = '<p>The space is open if someone is there.</p>';

var filename = 'index.html';

var check = process.argv[2];
var person = process.argv[3] || 'someone';
var action = process.argv[4] || '';
if (action !== '') action = action + ' ';

var personInfo = {
  'Kai' : '<a href="tel:00886931157391">09311157391</a>'
};

if (person in personInfo) {
  person = person + ' ' + personInfo[person];
}

// pattern for the line that is added to notify someone is in the space
var checkinStringRE = '<p>' + person + ' is .*at the space.</p>';
var checkinString;
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
fs.readFile(filename, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var oldData = data;
  if (checkin) {
    checkinString = checkinStringRE.replace('.*', action);
    data = data.replace(openString, openString + "\n" + checkinString);
  } else {
    var re = new RegExp("\n" + checkinStringRE);
    data = data.replace(re, '');
  }
  var result = (data === oldData ? 'uncessfully tried to ' : '') + (checkin ? 'add' : 'remove');
  console.log(result + ' line "' + (checkin ? checkinString : checkinStringRE) + '" in file "' + filename + '"');
  if (data !== oldData) {
    fs.writeFile(filename, data, function (err) {
      if (err) return console.log(err);
      console.log('wrote file', filename);
    });
  }
});

