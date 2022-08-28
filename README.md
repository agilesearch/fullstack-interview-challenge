<p align="center">
  <img src="https://user-images.githubusercontent.com/850110/153227453-ee147c59-830b-48ad-930e-7075d3229ae4.png" title="AgileSearch" width="150" style="margin-bottom: 1rem" />
</p>

👋 Hej välkommen på [AgileSearch](agilesearch) fullstack challenge!

My name is Broodar Plawind and I'm living in a far far away solar system located in the Arkanis sector of the Outer Rim Territories, in the Tatooine desert.

I'm would love to spend the next months travelling around the universe, my idea is to visit and stay at least 15 days on the planets that I always dreamed about: Naboo, Mandalore and Hoth.

Could you help me to get the right spaceship tickets for me? I'm afraid that I'm not good enough with today's technology and I don't know where to start.

---

_How would you help Brooday to get the **best experience** for planning his vacations?_
We are going to evaluate everything, but the main focus will be:

- :bulb: Creativity.
- :wrench: Tools.
- :man_technologist: Good practice in the choosen technology.

## Dataset

The `dataset.json` has all the necessary information for searching with the following format:

```js
[
  {
    origin: String,
    destination: String,
    price: Float,
    availability: Number,
    date: String,
  },
];
```

## Planets

The `planets.json` file has the information about the different planets that the starships can travel to.

# How to start

We encourage you to fork this repository and when you are done with the challenge, you can send us the forked URL so we can later review it.

If your solution needs to prepare an environment of any kind, please don't forget to let us know.

###### 🙌 Psst, One more thing!

The challenge is open to any solution. You can use your imagination, creativity and skills to deliver the best of the worlds you like the most.

You can always reach us by writing an email with all your questions and/or feedback about this challenge.

[agilesearch]: https://www.agilesearch.io

## Prerequisite

To run the project you will need the latest/LTS version of Nodejs

## Setting up the project

Clone the repository and install the dependencies using the following command.

```
 yarn install
```

## Development

You can start the project by running the following command.

```
yarn start
```

### Libraries used

The following libraries are used in the project.

- [semantic-ui-react](https://react.semantic-ui.com/) : For UI components
- [react-router-dom](https://reactrouter.com/en/main) : For routing to SPA app
- [react-semantic-ui-datepickers](https://github.com/arthurdenner/react-semantic-ui-datepickers) : Datepicker component with semantic-ui-react touch
- [dayjs](https://day.js.org/) : To deal with complex date tasks (adding dates, checking dates etc.)

### Known issues

- The _Clear_ button in home page doesnt clear the date picker
- The dates selected by _react-semantic-ui-datepickers_ gives a day prior to what the user selects (to mitigate this I add an extra day)

### Demo

You can test the Demo application using the [live site](https://starwars-planet-travel.netlify.app/).
