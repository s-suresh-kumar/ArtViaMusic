let keyword = "real";

let queryURL =
  "https://api.harvardartmuseums.org/object?q=keyword=" +
  keyword +
  "&hasimage=1&apikey=b257eb60-b88c-11ea-a178-2f68d1bc3c57";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  let imageUrl = response.records[0].primaryimageurl;
  console.log(imageUrl);
  let image = $("<img>");
  image.attr("src", imageUrl);
  $("body").append(image);
});
