# Async Race
This SPA was created as part of the [RS School JavaScript course](https://rs.school/js/). The goal of this project is to create a Single Page Application (SPA) that manages a collection of cars, operates their engines, and shows race statistics.

[Task link](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md)

[Deploy](https://aniamarkh.github.io/async-race/dist/)

To view the deployed application, clone the [server repository](https://github.com/mikhama/async-race-api) and keep the server running while playing with the app.

## Key Skills
- Server communication (fetch, REST API)
- Async coding / Promises
- JS Animations
- DOM API

## Non-functional Requirements
- Do not use libraries or frameworks (except Bootstrap CSS)
- Must use TypeScript
- Divide application into logical modules/layers
- Generate all HTML content via JavaScript
- SPA architecture
- Use Webpack or another bundler
- Use Eslint with Airbnb style guide
- Divide code into small functions (<= 40 lines)

## Functional Requirements
- Two views: "Garage" and "Winners"
- Save view state when switching between views
### Garage View
- CRUD operations for cars (name and color attributes)
- Select car color from RGB-Palette
- Display car's image with selected color and name
- Buttons to update car attributes or delete it
- Pagination (7 cars per page)
- Button to create random cars (100 cars per click)
### Car Animation
- Buttons for starting / stopping the car engine
- Animate the car based on engine state
- Disable buttons based on engine state
- Display a message with the winning car's name
### Race Animation
- Button to start the race
- Button to reset the race
- Display a message with the winning car's name
### Winners View
- Display winning cars in the "Winners" table
- Pagination (10 winners per page)
- Sort cars by wins number and best time (ASC, DESC)