(function() {
  
	function displaySearchResults(results, store) {
		var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
    	var appendString = '';
      
      appendString = '<table class="result-table">'

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
      	var item = store[results[i].ref];
        
        appendString += '<tr>';
        appendString += '<td>';
        appendString += '<p>' + item.id + '</p>';
        appendString += '</td>';
        appendString += '<td>';
        appendString += '<a data-toggle="modal" href="#wineModal" onClick="displayWineInfo(\''+ item.title + '\',\'' + item.image + '\')"><p>' + item.title + '</p></a>';
        appendString += '<div id="wineModal" class="modal fade" role="dialog">';
        appendString += '<div class="modal-dialog">';
        appendString += '<div id="wineModalContent" class="modal-content">';
        appendString += '</div>';
        appendString += '</div>';
        appendString += '</div>'; 
        appendString += '</td>';
        appendString += '<td>';
      	appendString += '<p>' + item.vintage + '</p>';
        appendString += '</td>';
        appendString += '<td>';
        appendString += '<p>' + item.region + '</p>';
        appendString += '</td>';
        appendString += '<td>';
        appendString += '<p>' + item.grapevariety + '</p>';
        appendString += '</td>';
        appendString += '<td>';
        appendString += '<p>' + item.valuepoint + '</p>';
        appendString += '</td>';
        appendString += '</tr>';
      }

      appendString += '</table>';

      searchResults.innerHTML = appendString;
  } else {
  	searchResults.innerHTML = '<li>No results found</li>';
  }
}

/*function displayWineInfo(wineTitle, wineImage) {
  var headerDiv = document.createElement("div");

  headerDiv.setAttribute("class","modal-header");
  headerDiv.innerHTML("<h4 class='modal-title'>" + wineTitle +
   "</h4><button type='button' class='close' data-dismiss='modal'>&times;</button>");


  document.getElementById("wineModalContent").appendChild(contentDiv);

}*/

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');

	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');

		if (pair[0] === variable) {
			return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
		}
	}
}

var searchTerm = getQueryVariable('query');

if (searchTerm) {
	document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
    	//this.field('id');
    	this.field('title', { boost: 10 });
      this.field('vintage');
    	this.field('category');
    	this.field('country');
      this.field('region');
      this.field('grapevariety');

      for (var key in window.store) { // Add the data to lunr
      	this.add({
      		'id': key,
      		'title': window.store[key].title,
          'vintage': window.store[key].vintage,
      		'category': window.store[key].category,
      		'country': window.store[key].country,
          'region': window.store[key].region,
          'grapevariety': window.store[key].grapevariety
      	})
      }
  	});

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
}
})();