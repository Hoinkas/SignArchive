# SignArchive
Sign Language Dictionary.

Allows user to manage signs (with clips, images or texts), definitions, words ect.

The sign language sometimes uses the same sign for different words and/or the same word has different signs for it in various regions and times. It was all taken into consideration while creating this app.

Made for offline use, but will be implemented into webpage.

### Definitions view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveDefinitionsView.png?raw=true)

### Soucres view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveSourcesView.png?raw=true)

## Dev stack
Electron + React.js + Typescript + SQLite

### To run
```
pnpm install
pnpm dev
```

## Releases
### Version 1.0
- [x] View word list
- [x] View word details. Add, edit, delete word
- [x] View sign details list. Add, edit, delete sign
- [x] View sources details list. Add, edit, delete source
- [x] View definitions details list. Add, edit, delete definition
- [x] View definition categories. Edit category
- [x] View tags in sign. Add, edit, delete tags in sign
- [x] Sorting words list
- [x] Filtering word list by category and region
- [x] White theme version
- [ ] Showing form requirements and errors
- [ ] Add numeral tab in sign view
- [ ] Reusing sign in new words and creating words based on sign definitions
- [ ] Exporting to a webpage using Node.js, Express, Axios
- [ ] Admin account

###  Version 2.0
- [ ] Improved screen responsiveness
- [ ] Font size adjustment
- [ ] Keyboard support
- [ ] Feedback from backend for user's actions (error, success, failure)
- [ ] Screen reader compatibility (HTML classes, Arial labels, and focus)
- [ ] Downloading json of a word or/and signs
- [ ] Signs frequency of use and reliability of the source (did deaf people actually use this sign, or did hearing people created and misused it?)

### Future
- [ ] Generating video thumbnails with ghost movements from videos
- [ ] Generating files with landmarks from videos
- [ ] Displaying a Three.js motion model moving based on generated landmarks
- [ ] Recognizing a sign from a webcam or video
- [ ] Adding HamNoSys sign transcript
- [ ] Storing multiple videos for a single sign to share with students who want to teach their ML with many clips of same word
- [ ] User accounts with moderation and voting on new signs and editing old ones
