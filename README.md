# WatchPotato 

> Have too many shows to watch? Have some free time on certain days? Use WatchBuddy to figure out what episodes to watch for your overloaded shows! 

>Derived from WatchBuddy

### WatchPotato Team
  - Devon Yu
  - Stephanie Wong
  - Ben Stephens
  - Tiffany Barth
### WatchBuddy Team
  - Daniel Tran
  - Helen Tran
  - Brian Kim

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

> new user signs up and creates new account
>
> existing user logs in with credentials
>
> once logged in, user can add a popular show/movie or search for another show/movie
>
> if user searches for a show/movies, app returns matches
>
> user can add show/movie
>
> adding show will allow user to enter survey data, including the last
>
> season user was watching, episode, date user would like to begin
>
> watching show, last date available for viewing show, check off
>
> days user has available for viewing, and number of hours per days
>
> user has free
>
> upon clicking submit, user will see the season and episode selected
>
> from the survey along with the following episode

## Requirements

- body-parser: 1.17.2
- crypto: 1.0.1
- express: 4.15.0
- jquery: 3.1.1
- moment: 2.18.1
- mysql: 2.13.0
- react: 15.4.2
- react-datepicker: 0.55.0
- react-dom: 15.4.2
- request: 2.83.0
- semantic-ui-react: 0.74.2

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g bower
npm install
```

### Tasks

To run the server:

```sh
npm run server-dev
```
Run MongoDB

```sh
sudo mongod
```

To run the webpack:

```sh
npm run react-dev
```


To add the schema to the mysql:

```sh
mysql -u root < schema.sql
```

### Roadmap

View the project roadmap [here](LINK_TO_DOC)


## Contributing

For MovieDB api guidelines to retreive information, use:

https://developers.themoviedb.org/4/getting-started

