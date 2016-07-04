// Fill in elements from the spreadsheet which are <span> with id of "FILL-<CELLNUMBER>"
var textfill = function(entry) {
    console.log(entry);
    var title = entry.title['$t'];
    console.log(title);
    var element = $( "span#FILL-"+title );
    console.log(element)
    console.log(element.length)
    if (element.length) {
	element[0].innerHTML = entry.content['$t'];
    }
};

// Callback function do do the pagefill
var pagefill = function(data) {
    console.log("Pagefill");
    console.log(data);
    console.log(data.feed.entry)
    var entries = data.feed.entry;
    entries.forEach(textfill);
};

$(document).ready(function() {
    
    // Load spreadsheet data
    $.ajax({
	url: "https://spreadsheets.google.com/feeds/cells/1EjDXjxsU1T6WPc_2eDv9oyeZjQBobPMp4C9s1Qw9QYs/od6/public/values?alt=json-in-script&callback=pagefill",
	// The name of the callback parameter, as specified by the YQL service
	jsonp: "pagefill",	
	// Tell jQuery we're expecting JSONP
	dataType: "jsonp",
	// Tell YQL what we want and that we want JSON
	data: {
            alt: "json-in-script",
	},
	async: true,
	// Work with the response
	success: function( response ) {
            console.log( response ); // server response
	}
    });
});
