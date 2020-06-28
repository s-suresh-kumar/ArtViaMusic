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
}).then(function (responseOVH) {
  // Log the queryURL
  console.log("queryURL-OVH:", queryURL);
  console.log("reponse-OVH:", responseOVH);
  console.log("reponse-OVH.lyrics:", responseOVH.lyrics);
  let inputText = responseOVH.lyrics;
  let inputTextArr = [];
  const re = /\s|\n/;
  inputTextArr = inputText.split(re);

  let datainputToPD = "text=" + JSON.stringify(inputTextArr);

  console.log(inputTextArr);
  /* comment out the following as we get following due to
require not deined :
jQuery.Deferred exception: require is not defined ReferenceError: require is not defined
    at Object.<anonymous> (file:///D:/suresh/uncbc/zoom/codingbootcamp/ArtViaMusic/script.js:16:14)

  const pd = require("paralleldots");

  // Be sure to set your API key
  pd.apiKey = eILsVmFHayC9wtOifRXODHNqBmVwcMea34apHw42JMQ;
  pd.keywords(
    "For the Yankees, it took a stunning comeback after being down 2-0 to the Indians in the American League Division Series. For the Astros, it took beating Chris Sale to top the Red Sox."
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });  */
  let API_KEY = "eILsVmFHayC9wtOifRXODHNqBmVwcMea34apHw42JMQ";
  /* As many stack overflow pages suggest, let us try now AJAX equivalent as curl is not supported in javascript */
  // $.ajax({
  //   url:
  //     "https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/keywords_batch",
  //   /*   beforeSend: function (xhr) {
  //     xhr.setRequestHeader(
  //       "Authorization",
  //       "Basic " + btoa("apikey:eILsVmFHayC9wtOifRXODHNqBmVwcMea34apHw42JMQ")
  //     ); */
  //   form: { text: datainputToPD, api_key: API_KEY },
  //   type: "POST",
  //   // dataType: "json",
  //   // contentType: "application/json",
  //   // processData: false,
  //   //  data: datainputToPD,
  //   success: function (responsePD) {
  //     console.log("responsePD:", responsePD);
  //     alert(JSON.stringify(responsePD));
  //   },
  //   error: function (err) {
  //     console.log("err:", err);
  //     alert("Cannot get data");
  //   },
  // });

  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/keywords_batch",
    method: "POST",
    headers: {
      "x-rapidapi-host": "paralleldots-text-analysis-v1.p.rapidapi.com",
      "x-rapidapi-key": "94e04ada5amshd58bd1c7b9b9a08p19c7fajsnfd7aba141134",
      "content-type": "text/html",
    },
    data: { datainputToPD },
  };
  $.ajax(settings).done(function (response) {
    console.log("RESPONSE-PD:", response);
  });

  let keyword = "real";

  let harvardQueryURL =
    "https://api.harvardartmuseums.org/object?q=keyword=" +
    keyword +
    "&hasimage=1&apikey=b257eb60-b88c-11ea-a178-2f68d1bc3c57";

  $.ajax({
    url: harvardQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    let imageUrl = response.records[0].primaryimageurl;
    console.log(response.records[0].primaryimageurl);
  });
  /* The above AJX call results in following error: Nevertheless issuing pull request so it can be in master and debugged 
  index.html:1 Access to XMLHttpRequest at 'https://apis.paralleldots.com/v4/keywords_batch' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
apis.paralleldots.com/v4/keywords_batch:1 Failed to load resource: net::ERR_FAILED */
});

// feed them into Parallel Dots API ajax
// generate keywords -- array

// feed that into Harvard Art Museums API ajax
