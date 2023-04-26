# Notely
Notely is an all-in-one productivity app for students and professionals allowing them to take notes, make lists, set timers, and use flashcards to manage their work and stay organised.

## Requirements
- Firebase Authentication
- Firebase Firestore Database

## Setup
- Clone the repository
- Install packages with `npm install`
- Setup an environment file `.env.local` in the root folder using this layout:
  ```env
  REACT_APP_FIREBASE_API_KEY=
  REACT_APP_FIREBASE_AUTH_DOMAIN=
  REACT_APP_FIREBASE_PROJECT_ID=
  REACT_APP_FIREBASE_STORAGE_BUCKET=
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
  REACT_APP_FIREBASE_APP_ID=
  ```
- Run `npm run postinstall`
- The project can be built with `npm run build`