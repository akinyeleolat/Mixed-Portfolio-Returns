[![Build Status](https://travis-ci.com/akinyeleolat/nodejs-starter.svg?token=cwN91MVvrFcs3q4Up8px&branch=main)](https://travis-ci.com/akinyeleolat/nodejs-starter)
# mixedPlanReturn
Get mixed plan return


# Application Details

## Technologies
Currently,
<ul>
<li>NodeJs </li>
<li>ExpressJs</li>
<li>Sequelize: Database ORM</li>
<li>PostgreSQL Database</li>
<li>Sqlite</li>
<li>Mocha Chai</li>
  </ul>

## Application Set up
Enviroment variables are set in `.env` files and the examples can be seen in `env.examples`.

1. Create `.env` files in the root folder, and set the correct environment variables as stated in `env.examples`
2. Open terminal and navigate to the root folder.
3. Install all dependencies and also set up the `database` and `database migration` by running this command on the terminal
4. Additional migration can be created `NAME=name_of_migration npm run create-migration`

    ```
    - npm install
    - npm run migration
    - npm run seed
    ```

## Running the App (Development)
1. Open terminal and navigate to the root folder.
2. Run this command on terminal 
```
    npm run dev
```
## Running the App (Production Instance)
1. Open terminal and navigate to the root folder.
2. Run this command on terminal 
```
    - npm start
```


## Running the App (Unit testing)
1. Open terminal and navigate to the root folder.
2. Run this command on terminal 
```
    - npm test
```

## API Endpoint Route
Currently,
<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/auth/login</td>
    <td>Login to the application with email and password</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/mixed-plan</td>
    <td>Get mixed plan</td>
  </tr>
  </table>