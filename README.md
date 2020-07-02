# ArtViaMusic
[![Thumbnail](assets/images/ArtViaMusic-thumbnail.jpg)](https://s-suresh-kumar.github.io/ArtViaMusic/)

Many people are familiar with music. Fewer people have the same level of familiarity with works of art. This web app allows a user to input the name of a song from which the lyrics are returned, keywords identified & a museum search conducted. The user is then presented with a piece of art with full museum description.

This app relies on three APIs: 1) lyrics.ovh provides the lyrics from the song search. 2) Paralleldots distills the lyrics for its keywords. 3) The keywords are used for a keyword search using the HarvardArtMuseums API.

## User Story

```
AS A person who wants to broaden my exposure to art
I WANT to see art that relates to music I enjoy
SO THAT I can learn more about art with themes or topics that interest me
```

## Acceptance Criteria

```
GIVEN search bar
WHEN I enter the name of a song
THEN the lyrics are generated
WHEN the lyrics are generated
THEN the keywords are extracted
WHEN the keywords are extracted
THEN they are used as the search terms for the Harvard Art Museum search
WHEN the search returns the results
THEN I am presented with a work of art & its museum description
```
## Design

The ArtViaMusic has a single html page namely index.html. It has a static style sheet files viz., styles.css. It has a javascript file called script.js which mainly has jQuery and AJAX libary code.

The html page is designed using skeleton css components so page is responsive to screen size changes and work well on all viewport sizes and devices. The pages are validated using java and js validation services and is free of errors and warnings.

The script.js adds the dynamic behavior to the respective page. The script.js is the main crux of the app. It takes song name  and artist name as input from the user. It dynamically makes appropriate AJAX API calls to https://private-anon-d20202d0cc-lyricsovh.apiary-proxy.com,  to obtain the lyrics for the song. The lyrics is then post processed to remove extra newlines, all kind of parantheses from the lyrics. It is then made a single element string array. Then the app supplies this data to https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/keywords_batch via AJAX API call. The returned JSON array has keywords with associated confidence score. Upto top 3 confidence score keywords are then fed in to harvardmuseum api at https://api.harvardartmuseums.org/  as a single string. HarvardMuseum API in turn returns up to 10 records of associated arts based on the keyword input. Some of the arts returned do not have imageurls to be displayed. So the first art with available imageurl is presented to user by dynamically updating the HTML page with its image, its description, artist, title, medium and date information. 

### The code repository for this work can be found at:

[repository](https://github.com/s-suresh-kumar/ArtViaMusic)

### The hosted web page for this work can be found at:

[Deployed Application](https://s-suresh-kumar.github.io/ArtViaMusic/)

## Possible Improvements and extensions

  In the future we would like to store the search history in localStorage and be able to recall history items for re-display. We can try exploring other AI APIs or other endpoints within the same AI API for extracting keyword towards HarvardMuseumAPI. In the future the app may be extended to play the found lyrics as music and/or display lyrics in a side bar. If possible we would like to incorporate suggest (predictive) API, so that the user does not end up giving wrong song names and artist names.
