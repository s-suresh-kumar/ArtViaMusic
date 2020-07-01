// get lyrics API ajax (api.lyrics.ovh/suggest/...)
// grab lyrics -- make them object/array
// example: https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime
// let queryURL = "api.lyrics.ovh/suggest/";

$(document).ready(function () {
  let queryURLOnClick;
  let queryURLOnLoad;

  function onload() {
    const qURL = [
      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime",

      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Blondie/Call%20Me",

      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Pink%20Floyd/Another%20brick%20in%20the%20wall",

      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Michael%20Jackson/Rock%20With%20You",

      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Captain%20%26%20Tennille/Do%20That%20to%20Me%20One%20More%20Time",

      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Olivia%20Newton-John/Magic",

      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/Queen/Crazy%20Little%20Thing%20Called%20Love",
    ];

    queryURLOnLoad = qURL[Math.floor(Math.random() * qURL.length)];
    findArt(queryURLOnLoad);
  }
  onload();

  $("#button").on("click", function (event) {
    event.preventDefault();
    let title = $("#title").val();
    let artist = $("#artist").val();

    console.log(title, artist);

    let queryURLOnClick =
      "https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com/v1/" +
      artist +
      "/" +
      title;
    findArt(queryURLOnClick);
  });

  function findArt(queryURL) {
    // Here we run our AJAX call to the lyricsovh api
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (responseOVH) {
        // Log the queryURL
        console.log("queryURL-OVH:", queryURL);
        console.log("reponse-OVH:", responseOVH);
        console.log("reponse-OVH.lyrics:", responseOVH.lyrics);
        let inputText = responseOVH.lyrics.replace(/[\])}[{(]/g, "");
        inputText = inputText.replace(/\n\s*\n/g, "\n");
        console.log("inputText:", inputText);
        let inputTextArr = [];
        inputTextArr = inputText.split();

        let datainputToPD = JSON.stringify(inputTextArr);

        console.log("inputTextArr:", inputTextArr);

        // prepare for parallel dots api
        //Lisa's key for parallel dots
        let API_KEY = "eILsVmFHayC9wtOifRXODHNqBmVwcMea34apHw42JMQ";
        const url =
          "https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/keywords_batch";

        // window.alert("about to call the api");
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
          timeout: 2 * 800000,
          success: function (data) {
            //  window.alert(JSON.stringify(data));
            console.log("success!!", data);
            let recdKeywords = data.keywords[0];
            const sortedKeywords = recdKeywords.sort((a, b) => {
              return a.confidence_score * 1 - b.confidence_score * 1;
            });

            let keyword = "";
            let j = 0;

            for (let i = recdKeywords.length - 1; i >= 0; i--) {
              if (j > 2) {
                break;
              } else {
                console.log(
                  "keyword " +
                    (j + 1) +
                    " is: " +
                    recdKeywords[i].keyword +
                    " confidence score is : " +
                    recdKeywords[i].confidence_score
                );
                keyword += recdKeywords[i].keyword;
                keyword += " ";
                j++;
              }
            }
            console.log("Keyword to harvard museum api is: " + keyword);
            //  let keyword = "education sarcasm control";

            let queryURL =
              "https://api.harvardartmuseums.org/object?q=keyword=" +
              keyword +
              "&hasimage=1&apikey=b257eb60-b88c-11ea-a178-2f68d1bc3c57";

            $.ajax({
              url: queryURL,
              method: "GET",
            })
              .then(function (response) {
                console.log(response);
                let thisItem;
                let title = "";
                let medium = "";
                let artist = "";
                let period = "";
                let description = "";

                if (response.records[0].primaryimageurl != null) {
                  thisItem = response.records[0];
                  console.log(
                    "thisItem is response.records[0]: ",
                    response.records[0]
                  );
                } else {
                  thisItem = response.records[1];
                  console.log(
                    "thisItem is response.records[1]: ",
                    response.records[1]
                  );
                }

                //provides the image url to show the image
                if ("primaryimageurl" in thisItem) {
                  let imageUrl = thisItem.primaryimageurl;
                  console.log("Image url is :" + imageUrl);
                  $("#imageDiv").attr("src", imageUrl);
                } else {
                  console.log("primaryimageurl missing for this art");
                }
                const infoNotAvail = ": -----";
                // pulls the description of the piece
                if ("description" in thisItem) {
                  if (thisItem.description == null) {
                    $("#desc").append(infoNotAvail);
                    console.log("Description missing for this art");
                  } else {
                    description = thisItem.description;
                    $("#desc").append(": " + description);
                    console.log("DESCRIPTION is :", description);
                  }
                } else {
                  $("#desc").append(infoNotAvail);
                  console.log("Description missing for this art");
                }

                // pulls the title of the piece
                if ("title" in thisItem) {
                  if (thisItem.title == null) {
                    $("#title").append(infoNotAvail);
                    console.log("title missing for this art");
                  } else {
                    title = thisItem.title;
                    $("#title").append(": " + title);
                    console.log("TITLE is :", title);
                  }
                } else {
                  $("#title").append(infoNotAvail);
                  console.log("title missing for this art");
                }
                //pulls the medium of the piece
                if ("medium" in thisItem) {
                  if (this.medium == null) {
                    $("#medium").append(infoNotAvail);
                    console.log("medium missing for this art");
                  } else {
                    medium = thisItem.medium;
                    $("#medium").append(": " + medium);
                    console.log("MEDIUM is :", medium);
                  }
                } else {
                  $("#medium").append(infoNotAvail);
                  console.log("medium missing for this art");
                }
                //gets the artist's name
                if ("peopleCount" in thisItem) {
                  if (thisItem.peopleCount > 0) {
                    artist = thisItem.people[0].name;
                    $("#artist").append(": " + artist);
                    console.log("ARTIST is :", artist);
                  } else {
                    $("#artist").append(infoNotAvail);
                    console.log("artist missing for this art");
                  }
                } else {
                  $("#artist").append(infoNotAvail);
                  console.log("artist missing for this art");
                }
                //provides three options for how to pull the date, depending on what is provided in the api
                let date = "";
                if ("period" in thisItem) {
                  period = thisItem.period;

                  //the first way will get the exact year it was made
                  if ("dated" in thisItem) {
                    if (thisItem.dated != null) {
                      date = thisItem.dated;
                      $("#date").append(": " + date);
                      console.log(title + " was made in " + date);
                    }
                  }
                  //the second will provide the century it was made in
                  else if ("century" in thisItem) {
                    if (thisItem.century != null) {
                      date = thisItem.century;
                      $("#date").append(": " + century);
                      console.log(title + " was made in the " + date);
                    }
                  }
                  //if neither the date or century is available, it'll get the general period it was created in
                  else {
                    if (period == null) {
                      $("#date").append(infoNotAvail);
                      console.log("period missing for this art");
                    } else {
                      $("#date").append(": " + period);
                      console.log(title + " was made in the " + period);
                    }
                  }
                } else {
                  $("#date").append(infoNotAvail);
                  console.log("period missing for this art");
                }
              })
              .catch((error) => {
                console.error(error);
                window.alert(error);
              });
          },
          error: function (e) {
            console.error(e);
            window.alert(e);
          },
        });
      })
      .catch((error) => {
        console.error(error);
        window.alert(error);
      });
  }
  // generate keywords -- array

  // feed that into Harvard Art Museums API ajax
});
