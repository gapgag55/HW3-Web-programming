/*
 * DEFAULT CONFIG SETTINGS
 */
const SETTINGS = {
  API_KEY: 'AIzaSyBs1ithKNkmQ4YZ9MZLm8wnO6RQgyMo53Y',
  BASE_URL: 'https://www.googleapis.com/youtube/v3/search',
  BASE_AUDIO: 'https://youtubemp3api.com/@api/json/mp3/',
  RESULT: 0
}

/*
 * Search Function when
 * 1. Web once loading
 * 2. Users input keyword
 */
function search () {
  SETTINGS.RESULT = 0

  /*
   * Loader
   */
  $('#body').html(loader('absolute'))

  /*
   * Using setTimeout for better performance.
   */
  setTimeout( function () {
    /*
     * Load content from Ajax's jQuery
     */
    loadContent()
  }, 500)
}

/*
 * LoadContent Function
 */
function loadContent() {

  /*
   * Ajax jQuery Started.
   */
  $.ajax({
    url: url()
  }).done(function ( response ) {
  
    /*
     * Detecting response items when length equals zero
     * Then send back to client "No content"
     */
    if ( response.items.length == 0 ) {
      return $('#body').html('Sorry, No content available yet!') 
    }

    /*
     * Map Array into html
     */
    let items = response.items.map(function (item) { 
      let date = new Date(item.snippet.publishedAt)
      
      return `<a class="columns" target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
        <div class="bg" style="background-image: url(${item.snippet.thumbnails.high.url});"></div>
        <div class="column is-half left">${item.snippet.title}</div>
        <div class="column left">${item.snippet.channelTitle}</div>
        <div class="column">${date.getMonth()}/${date.getDay()}/${date.getYear()}</div>
      </a>`
    })

    /*
     * Let items put into html, insides body
     */
    $('#body').html(items)

  }).fail(function (err) {
    /*
     * Remove Loader when 400 error content
     */
    $('#loader').remove()
  })

}

/*
 * Loadmore button will called when 
 * Users click loadmore button
 */
function loadmore() {
  loadContent()
  $('#body').append(loader('relative'))
}

// HELPER FUNCTION

function url() {
  /*
   * encodeURIComponent using for UTF-8 languages encoded such as Thai language
   * Ex ท่องเที่ยว -> '%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%9...'
   */
  let search = encodeURIComponent($('#query').val()) || 'count on me'
  SETTINGS.RESULT += 10

  /*
   * Using Template Literals for holding variables into text
   */
  return `${SETTINGS.BASE_URL}?q=${search}&maxResults=${SETTINGS.RESULT}&part=snippet&type=video&key=${SETTINGS.API_KEY}`
}

/*
 * Loader animation
 * Using SVG
 */
function loader(style) {
  return `<svg id="loader" style="position: ${style}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <rect x="0" y="11.2222" width="4" height="8.55556" fill="#333">
    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
  </rect>
  <rect x="10" y="7.22222" width="4" height="16.5556" fill="#333">
    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
  </rect>
  <rect x="20" y="6.77778" width="4" height="17.4444" fill="#333">
    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
  </rect>
</svg>`
}