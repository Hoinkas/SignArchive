# SignArchive (pl. ArchiwuMig)
Polish Sign Language Dictionary.

Allows user to search, view and manage signs (with media, images or texts), definitions, words ect.

## About me
|I am deaf born in hearing family. I’ve been learning PJM (Polish Sign Language) for years, and I’ve been missing a good sign dictionary.

The available PJM dictionaries are often outdated projects from several years ago that don’t indicate whether a sign is still in use or which region it comes from (Warsaw? Kraków? Poznań?).

So I decided to create my own amateur dictionary, which will be updated regularly and to which anyone will be able to add signs, definitions, and sources.

### Definitions view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveDefinitionsView.png?raw=true)

### Soucres view
![alt text](https://github.com/Hoinkas/SignArchive/blob/main/SignArchiveSourcesView.png?raw=true)

## Dev stack
React.js + Typescript + Node.js + Express + axios + SQLite

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
- [x] Showing form requirements and errors
- [x] Exporting to a webpage using Node.js, Express, Axios
- [x] Default view with links, inspirations and thanks
- [x] Add translations to each source - year. In different years sign could mean different things
- [x] Url substring should contain shown word
- [ ] Add Error Page
- [ ] Reusing sign in new words and creating words based on sign definitions
- [ ] Admin account

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

### Future
- [ ] Generating video thumbnails with ghost movements from videos
- [ ] Generating files with landmarks from videos
- [ ] Displaying a Three.js motion model moving based on generated landmarks
- [ ] Recognizing a sign from a webcam or video
- [ ] Adding HamNoSys sign transcript
- [ ] Storing multiple videos for a single sign to share with students who want to teach their ML with many media of same word
- [ ] User accounts with moderation and voting on new signs and editing old ones
