// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is connected to HTML, and DOM is ready!');

  // form to search spotify API
  var $spotifySearch = $('#spotify-search');

  // input field for track (song)
  var $track = $('#track');

  // element to hold results from spotify API
  var $results = $('#results');

  // loading gif
  var $loading = $('#loading');

  // compile handlebars template
  var source = $('#track-template').html();
  var template = Handlebars.compile(source);

  // submit form to search spotify API
  $spotifySearch.on('submit', function(event) {
    event.preventDefault();

    // empty previous results
    $results.empty();

    // save form data to variable
    var searchTrack = $track.val();

    // only search if the form had a keyword to search with!
    if (searchTrack !== ""){
      // show loading gif
      $loading.show();

      // spotify search URL
      var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

      // use AJAX to call spotify API
      $.ajax({
        method: 'GET',
        url: searchUrl,
        success: renderSpotifyData  // use this function as the callback
      });
    } else {
      // remind the user to enter a keyword
      // one way is a "quick and ugly" alert
      alert("Please enter a keyword to search");
    }

    // reset the form
    $spotifySearch[0].reset();
    // give focus back to track name field
    $track.focus();
  });

  // handles results received from spotify
  function renderSpotifyData(spotifyResults) {
    console.log("received results:", spotifyResults);

    // track results are in an array called `items`
    // which is nested in the `tracks` object
    var trackResults = spotifyResults.tracks.items;
    console.log('search result tracks:', trackResults);

    // hide loading gif
    $loading.hide();

    // for each result (if there are results):
    trackResults.forEach(function(trackData){
      // pass in data to render in the template
      var trackHtml = template({ track: trackData });

      // append html to the view
      $results.append(trackHtml);
    });
    // if there weren't results, display a helpful no results message
    $results.append("<p class=\"text-center\">No results</p>");
  }


});
