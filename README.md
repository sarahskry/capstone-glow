
# GLOW: your movie tracking app

Glow is a way for movie enthusiast and cinephiles alike to keep tack of what they have watched.

A simple and uncluttered movie tracking application for easy return watching. You can track what you're watching in a list for your own personal use. Create different lists, rate and find what to watch next based on your own personal library.


## Tech Stack

**Client:** 
- React
- React Router DOM
- Axios
- Sass
- Vite

**Server:** 
- Node.js
- Express
- Knex
- MySQL
- bcryptjs
- jsonwebtoken
- Cors
- dotenv


## API Reference

#### Register and Login

```http
  POST /Register | add user information into users table
```
```http
  POST /login | grab the username and password and find corresponding items in the users table to verify
```
```http
  GET /dashboard | take user to personalized dashboard page
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get movie list id
```http
  GET /list/ | get all of the user's movie lists
```
```http
  GET /lists/:id/movies | get the movie lis, list id and the corresponding movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to fetch |




## Backend Installation

git clone git@github.com:sarahskry/capstone-glow.git

Navigate to the server directory and install dependencies

```bash
  cd server
  npm install
```

Database Setup:
- Ensure MySQL is installed and running on your machine
- Check the sample env and fill in accordingly
- Create a MySQL database for the project

Run Migrations:
Use Knex.js to run the migrations and create database schema

```bash
  npm run migrate
```
Run Seed Data:
```bash
npm run seed
```

Start the Backend Server:
```bash
npm start
```

## Frontend Installation

Navigate to the client directory and install dependencies

```bash
  cd client
  npm install
```
Start the Development Server:
```bash
  npm run dev
```

As a note: Because the client side and server side are in the parent folder of "Capstone-Glow" have two separate terminals open, one for client and one for server.
## Usage 
- should be viewed only at 1280px wide

'/' route takes you to the splash page of the application. You can click on the pointing finger to take you to the '/register'

- You can register, all fields are required
- Once you do that you can click login. 
- That will take you to '/login'
- Enter the username you previously provided and your created password
- Click the login button and you will be redirected to your personalized user dashboard '/dashboard'



## Examples
```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Features

- Search Bar: you can enter in the title of a movie and add the applicable film to your default Watched list. Upon login a default Watched list was created for you.

- Nav Bar: 
    - you can click on the Watched link in the navigation menu and it will take you to a page that displays all of the movies you've added to your watched list by title
    - you can click on the Lists link in the navigation menu and it will take you to a page where you will see how many lists you have and the titles of the lists
    - when you click on a list it will return the id for the movies in that list




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_LOCALHOST`
`VITE_API_KEY`
`VITE_BASE_URL`
`VITE_IMAGE_BASE_URL`


Backend sample.env

`PORT`
`SECRET`

`DB_HOST`
`DB_NAME`
`DB_USER`
`DB_PASSWORD`