# SignArchive (pl. ArchiwuMig)
Polish Sign Language Dictionary.

Allows user to search, view and manage signs (with media, images or texts), definitions, words ect.

Webpage: https://signarchive.netlify.app/

## Page
### Definitions view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveDefinitionsView.png?raw=true)

### Soucres view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveSourcesView.png?raw=true)

### Light theme
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveLightTheme.png?raw=true)

## Dev stack
React.js + Typescript + Node.js + Express + axios + SQLite

### To run
```
pnpm install
pnpm dev
```

## Releases
### Version 1.0 released 17.04.2026
For more info look into wiki.

###  Version 2.0
- [ ] Add numeral tab in sign view
- [ ] Add custom names tab in sign view (street, districts, buildings)
- [ ] Improved screen responsiveness
- [ ] Font size adjustment
- [ ] Keyboard support
- [ ] Feedback from backend for user's actions (error, success, failure)
- [ ] Screen reader compatibility (HTML classes, Arial labels, and focus)
- [ ] Downloading json of a word or/and signs
- [ ] Signs frequency of use and reliability of the source (did deaf people actually use this sign, or did hearing people created and misused it?)
- [ ] Reusing sign in new words

### Future
- [ ] Generating video thumbnails with ghost movements from videos
- [ ] Generating files with landmarks from videos
- [ ] Displaying a Three.js motion model moving based on generated landmarks
- [ ] Recognizing a sign from a webcam or video
- [ ] Adding HamNoSys sign transcript
- [ ] Storing multiple videos for a single sign to share with students who want to teach their ML with many media of same word
- [ ] User accounts with moderation and voting on new signs and editing old ones

## About me
|I am deaf born in hearing family. I’ve been learning PJM (Polish Sign Language) for years, and I’ve been missing a good sign dictionary.

The available PJM dictionaries are often outdated projects from several years ago that don’t indicate whether a sign is still in use or which region it comes from (Warsaw? Kraków? Poznań?).

So I decided to create my own amateur dictionary, which will be updated regularly and to which anyone will be able to add signs, definitions, and sources.
