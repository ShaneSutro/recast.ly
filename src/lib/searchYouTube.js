var searchYouTube = (options, callback) => {
  options.max === undefined ? 5 : options.max;
  // ajax is sending a request to the URL using the GEET method
  // data: is a object which are our parameters that we are asking for
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: {q: options.query, part: 'snippet', maxResults: options.max, videoEmbeddable: true, type: 'video', key: options.key},
    contentType: 'application/json',
    // callback is our data were getting back from this AJAX request
    // success calls a function that has our data inside. so we intercept that data and change it to pass back into our CallBack.
    success: (data) => {
      callback(data.items);
    },
    error: function(error) {
      console.error('failed to lookup youtube API', error);
    }
  });
};

export default searchYouTube;
