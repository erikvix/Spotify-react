# Semaninha

**Semaninha** is a web application integrated with Spotify that allows users to view their favorite artists and tracks over different time periods, ranging from 1 month to 1 year.

You can access the project at this link: [Semaninha](https://semaninha.netlify.app)

![Project Image](https://github.com/user-attachments/assets/926f4604-b929-4eba-b8a4-706110a18847)

## Technologies Used
- **Zustand**: State management library for React.
- **JavaScript**: Programming language used in the project.
- **Shadcn UI**: Component library used to build the user interface.
- **Spotify API**: API used to retrieve data about users' listening habits.

## Features

- **Top Tracks and Top Artists**: View your most played tracks and artists over three periods:
  - Last 4 Weeks
  - Last 6 Months
  - Last Year
- **State Management with Zustand**: Zustand is used to manage the state of API requests, user data, and period selection.
- **Modern User Interface**: Uses Tailwind CSS alongside Shadcn UI to provide a clean, responsive, and modern interface.

## How to Run the Project Locally

### 1. Clone the Repository:
```sh
git clone https://github.com/erikvix/spotify-react
cd spotify-react
```
### Install Dependencies:
```sh
npm install
```
### Start the Application:
```sh
npm run dev
```
After starting the server, open your browser and go to https://127.0.0.1:5173 (the dev server uses a self-signed certificate, so accept the browser warning).

### ⚠️ Authentication

The app uses the OAuth 2.0 **Authorization Code flow with PKCE**, which runs entirely in the browser and needs **no client secret**. Tokens are stored in `localStorage` and refreshed automatically when they expire.

1. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Add a Redirect URI, for example `https://127.0.0.1:5173/home` for local development (Spotify does not accept `localhost`; use `127.0.0.1`) and `https://your-site.netlify.app/home` in production.
3. Copy `.env.example` to `.env` and fill in `VITE_CLIENT_ID` and `VITE_REDIRECT_URI`.

> Never put the client secret in a `VITE_*` variable: everything with that prefix is shipped in the public JavaScript bundle.

While your Spotify app is in development mode, only users you add in the dashboard can log in.
