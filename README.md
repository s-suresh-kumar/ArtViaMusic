# ArtViaMusic

Many people are familiar with music. Fewer people have the same level of familiarity with works of art. This web app allows a user to input the name of a song from which the lyrics are returned, keywords identified & a museum search conducted. The user is then presented with a piece of art with full museum description.

This app relies on three APIs: 1) lyrics.ovh provides the lyrics from the song search. 2) MonkeyLearn distills the lyrics for its keywords. 3) The keywords are used for a keyword search using the HarvardArtMuseums API.

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
