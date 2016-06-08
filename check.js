// checkin to, or checkout from, the hackerspace via its web site

// TODO: global replace to avoid duplicate checkins, per-person checkin

// the string that serves as an anchor in the file for adding text
var openString = '<p>The space is open if someone is there.</p>';
// the string that is added to notify someone is in the space
var checkinString = '<p>Kai <a href="tel:00886931157391">09311157391</a> is at the space.</p>';
var filename = 'index.html';

var check = process.argv[2];
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
    data = data.replace(openString, openString + "\n" + checkinString);
  } else {
    data = data.replace("\n" + checkinString, '');
  }
  fs.writeFile(filename, data, function (err) {
    if (err) return console.log(err);
    console.log('wrote file', filename);
  });
});

