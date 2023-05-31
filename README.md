# Regov
THis application was developed with Nodejs and Typescript.

The application comprises of 3 models. The User, Event and Review models

#Backend
The backend was developed with Express Js and MongoDB for the database. 
The express backend was written with typescript and I took the class approach for writing my comonents. No direct injection of components or interfaces through the
constructor due to the fact that, no IOC container was used.
The class methods are all static methods.

Create a .env file at the root of the backend folder, add the following env variables
PORT
DBURL
ACCESS_TOKEN_SECRET

PORT: This is the Port number on which the backend application will run
DBURL: for the DB URL you can use the mongo Atlas DB URL
ACCESS_TOKEN_SECRET: This is required for JWT 

To bootstrap the backend App. npm run start:dev

#Frontend
The Frontend was written in React with Typescript.
Create a .env file at the root of the frontend folder, add the following env variables
VITE_SECRET

VITE_SECRET: This is required for encrypting the localstorage data.

To bootstrap the frontend App. npm run start:dev

![uml](https://github.com/olasunkanmi-SE/Regov/assets/60177090/b244d736-b4fd-4203-b6e0-6d8c5f9617a6)
