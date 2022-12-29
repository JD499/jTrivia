# JeopardyAPI
A trivia API built with Express, PostgreSQL, and inspired by jService.io.

## Features
28,923 questions & 5035 categories

## API Usage

### /Clues
Url: `/api/clues`

Options:

- value (int): the value of the clue in dollars
- category (int): the id of the category you want to return
- min_date (date): earliest date to show, based on original air date
- max_date (date): latest date to show, based on original air date
- offset (int): offsets the returned clues. Useful in pagination

### /Random
Url: `/api/random`

Options:

- count (int): amount of clues to return

### /Final

Presents random final jeopardy question. Note: all final jeopardy questions have **null** value

Url: `/api/final`

Options:

- count (int): amount of clues to return

### /Categories
Url: `/api/categories`

Options:

- count (int): amount of categories to return
- offset (int): offsets the starting id of categories returned. Useful in pagination.

### /Category
Url: `/api/category`

Options:

- id (int): **Required** the ID of the category to return.
### About
This API was built to learn Express, PostgreSQL, and to support a future trivia game. Thanks to jService.io for providing heavy inspiration as well as the Category and Clues data. This API is offered free of charge, on a railways instance. **Production use is at your own risk.**


Content provided from jarchive and jService.io. All clue content © jeopardy productions, inc. This is not associated with jeopardy productions, inc. This is not associated with jService.io.
