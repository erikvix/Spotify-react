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

- **Top Artists Visualization**: Allows users to view their top artists over three different periods:
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
After starting the server, open your browser and go to http://localhost:5173.
### Authentication

- The application uses OAuth 2.0 for authentication with the Spotify API. After login, the user's access token is stored in the global state managed by Zustand.

- **To use the application correctly**, you will need to modify some settings in the login component.

  In the component located at `/src/pages/Login.jsx`, update the `handleLogin` function as follows:

  ```javascript
  const handleLogin = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${AUTH_ENDPOINT}&scope=${SCOPES_URL_PARAM}&response_type=token`;
  };
  ```
  Replace the environment variables (CLIENT_ID, CLIENT_SECRET, etc.) with your own clientId and clientSecret, which can be obtained by creating an application on the Spotify API dashboard.

