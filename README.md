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
- [x] Add word
- [x] View word details
- [x] Edit word
- [x] Delete word
- [x] View sign list
- [x] View media and sign details
- [x] edit sign
- [x] delete sign
- [x] view list of sources
- [x] add source
- [x] view source details
- [x] edit source
- [x] delete source
- [x] view list of definitions
- [x] add definition
- [x] edit definition
- [x] delete definition
- [x] view definition categories
- [x] edit category in definition
- [x] view tags in sign
- [x] add, edit, and delete tags in sign
- [ ] filtering word search by category and place
- [ ] add numeral tab in sign view
- [ ] reusing sign in new words and creating words based on sign definitions
- [ ] saving responsiveness
- [ ] exporting to a webpage using Node.js, Express, Axios
- [ ] admin account

###  Version 2.0
- [ ] White theme version
- [ ] Font size adjustment
- [ ] Keyboard support
- [ ] Screen reader compatibility (HTML classes, Arial labels, and focus)
- [ ] Video slow-motion and fast-forward
- [ ] Signs frequency of use and reliability of the source (did deaf people actually use this sign, or did hearing people created and misused it?)

### Future
- [ ] Generating thumbnails from videos with ghost movements
- [ ] Generating files with landmarks from videos
- [ ] Displaying a Three.js motion model with markers
- [ ] Recognizing a character from a webcam or video
- [ ] Adding HamNoSys sign transcript
- [ ] Storing multiple videos for a single character to share with students who want to teach their ML with many clips of same word
- [ ] User accounts with moderation and voting on new characters and editing old ones
