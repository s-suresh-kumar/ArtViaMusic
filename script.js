// get lyrics API ajax (api.lyrics.ovh/suggest/...)
// grab lyrics -- make them object/array
// example: https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime
// let queryURL = "api.lyrics.ovh/suggest/";
let queryURL =
  "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime";

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  // Log the queryURL
  console.log(response);

  const pd = require('paralleldots');

  // Be sure to set your API key
  pd.apiKey = eILsVmFHayC9wtOifRXODHNqBmVwcMea34apHw42JMQ;
  pd.keywords('For the Yankees, it took a stunning comeback after being down 2-0 to the Indians in the American League Division Series. For the Astros, it took beating Chris Sale to top the Red Sox.')
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log(error);
	})


// feed them into Parallel Dots API ajax
// generate keywords -- array

// feed that into Harvard Art Museums API ajax
