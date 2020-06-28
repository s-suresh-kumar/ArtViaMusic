let keyword = "wall brick";

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
  let image = $("<img>");
  image.attr("src", imageUrl);
  $("body").append(image);
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
