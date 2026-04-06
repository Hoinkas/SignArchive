# SignArchive
Sign Language Dictionary.

Allows user to manage signs (with clips, images or texts), definitions, words ect.

The sign language sometimes uses the same sign for different words and/or the same word has different signs for it in various regions and times. It was all taken into consideration while creating this app.

Made for offline use, but will be implemented into webpage.

### Soucres view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveSourcesView.png?raw=true)

### Definitions view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveDefinitionsView.png?raw=true)

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
- [ ] Filtering word search by category and region
- [x] White theme version
- [ ] Add numeral tab in sign view
- [ ] Reusing sign in new words and creating words based on sign definitions
- [ ] Adding screen responsiveness
- [ ] Exporting to a webpage using Node.js, Express, Axios
- [ ] Admin account

###  Version 2.0
- [ ] Font size adjustment
- [ ] Keyboard support
- [ ] Screen reader compatibility (HTML classes, Arial labels, and focus)
- [ ] Signs frequency of use and reliability of the source (did deaf people actually use this sign, or did hearing people created and misused it?)

### Future
- [ ] Generating thumbnails from videos with ghost movements
- [ ] Generating files with landmarks from videos
- [ ] Displaying a Three.js motion model with markers
- [ ] Recognizing a character from a webcam or video
- [ ] Adding HamNoSys sign transcript
- [ ] Storing multiple videos for a single character to share with students who want to teach their ML with many clips of same word
- [ ] User accounts with moderation and voting on new characters and editing old ones
