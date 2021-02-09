// function findlyrics(){
//     $.get("https://api.lyrics.ovh/v1/"+document.getElementById("artist").value+"/"+document.getElementById("title").value,
//         function(data){
//         document.getElementById("output").innerHTML=data.lyrics.replace(new RegExp("/n","g"),"<br>")
//     })
// }
function findlyrics() {
  let title = $("#title").val();
  let artist = $("#artist").val();

  console.log(title, artist);

  let queryURL = "
  
  " + artist + "/" + title;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
