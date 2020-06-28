// get lyrics API ajax (api.lyrics.ovh/suggest/...)
// grab lyrics -- make them object/array
// example: https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime
// let queryURL = "api.lyrics.ovh/suggest/";

// let queryURL =
//   "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime";
// let queryURL =
//   "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Blondie/Call%20Me";
// let queryURL =
//   "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Pink%20Floyd/Another%20Brick%20in%20The%20Wall";

// let queryURL =
//   "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Michael%20Jackson/Rock%20With%20You";

/* did not work  begin*/
// let queryURL =
//   "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/The%20Captain%20and%Tennille/Do%20That%20to%20Me%20One%20More%20Time";
// let queryURL =
//   "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Olivia-Newton-John/Magic";
/* did not work  end*/

let queryURL =
  "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Queen/Crazy%20Little%20Thing%20Called%20Love";

// Here we run our AJAX call to the lyricsovh api
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (responseOVH) {
  // Log the queryURL
  console.log("queryURL-OVH:", queryURL);
  console.log("reponse-OVH:", responseOVH);
  console.log("reponse-OVH.lyrics:", responseOVH.lyrics);
  let inputText = responseOVH.lyrics.replace(/[\])}[{(]/g, "");
  inputText = inputText.replace(/\n\s*\n/g, "\n");
  console.log("inputText:", inputText);
  let inputTextArr = [];
  //const re = /\s|\n/;
  const re = /\n/;
  inputTextArr = inputText.split();

  let datainputToPD = /*"text=" + */ JSON.stringify(inputTextArr);

  console.log("inputTextArr:", inputTextArr);

  // prepare for parallel dots api
  //Lisa's key for parallel dots
  let API_KEY = "eILsVmFHayC9wtOifRXODHNqBmVwcMea34apHw42JMQ";
  const url =
    "https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/keywords_batch";
  const text = JSON.stringify([
    "For the Yankees, it took a stunning comeback after being down 2-0 to the Indians in the American League Division Series. For the Astros, it took beating Chris Sale to top the Red Sox.",
    "U.S. stocks edged higher on Friday, with the S&P 500 hitting a more than five-month high, as gains in industrials and other areas offset a drop in financials. Fred Katayama reports.",
  ]);

  window.alert("about to call the api");
  const $form = $("<form>", {
    enctype: "multipart/form-data",
    method: "post",
  });
  $("body").append($form);
  const formData = new FormData($form[0]);
  formData.append("api_key", API_KEY);
  formData.append("text", datainputToPD);

  $.ajax({
    type: "POST",
    enctype: "multipart/form-data",
    url: url,
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    timeout: 800000,
    success: function (data) {
      window.alert(JSON.stringify(data));
      console.log("success!!", data);

      let keyword = "education sarcasm control";

      let queryURL =
        "https://api.harvardartmuseums.org/object?q=keyword=" +
        keyword +
        "&hasimage=1&apikey=b257eb60-b88c-11ea-a178-2f68d1bc3c57";

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        let thisItem;
        if (response.records[0].primaryimageurl !== null) {
          thisItem = response.records[0];
        } else {
          thisItem = response.records[1];
        }

        //provides the image url to show the image
        let imageUrl = thisItem.primaryimageurl;
        console.log(imageUrl);
        $("#imageDiv").attr("src", imageUrl);

        // pulls the title of the piece
        let title = thisItem.title;
        console.log(title);
        //pulls the medium of the piece
        let medium = thisItem.medium;
        console.log(medium);
        //gets the artist's name
        let artist = thisItem.people[0].name;
        console.log(artist);
        //provides three options for how to pull the date, depending on what is provided in the api
        let date;
        let period = thisItem.period;
        //the first way will get the exact year it was made
        if (thisItem.dated !== null) {
          date = thisItem.dated;
          console.log(title + " was made in " + date);
        }
        //the second will provide the century it was made in
        else if (thisItem.century !== null) {
          date = thisItem.century;
          console.log(title + " was made in the " + date);
        }
        //if neither the date or century is available, it'll get the general period it was created in
        else {
          console.log(title + " was made in the " + period);
        }
      });
    },
    error: function (e) {
      console.error(e);
      window.alert("error");
    },
  });
});

// generate keywords -- array

// feed that into Harvard Art Museums API ajax
