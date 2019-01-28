# 📚 Bookworm 🐛

> Library at your fingertips

Built & Tested With:

+ [React](https://reactjs.org/)
+ [Parcel](https://parceljs.org/)
+ [Styled Components](https://www.styled-components.com/)
+ [Jest](https://jestjs.io/)
+ [Enzyme](https://airbnb.io/enzyme/)

## Table of Contents

+ [Getting Started](#Getting-Started)
+ [Available Commands](#Commands)

## Getting Started

Follow these steps to get a copy of this project running locally :~)

1. Install [Node.js](https://nodejs.org)
2. Install [Git](https://git-scm.org)
3. Install [Yarn](https://yarnpkg.com/en/)
4. Run the following commands in your Terminal:  

    1. `git clone https://github.com/darkhist/bookworm.git`  
        * If the clone fails, check out [this](https://help.github.com/articles/https-cloning-errors/) article
    2. `cd bookworm`
    3. `yarn`
    4. `yarn dev`  
        * This will start a local development server via Parcel  
        * For more commands, see [Commands](#Commands)
    5. Visit `http://localhost:1234` to see a live preview of the app! Happy hacking!

## Commands

All commands (and their variants) can be found in `package.json`, under the `"scripts"` section

### Build
```
yarn build
```

> This project uses Parcel's experimental-scope-hoisting build option to reduce build sizes  
> For more info, [check out this article](https://medium.com/@devongovett/parcel-v1-9-0-tree-shaking-2x-faster-watcher-and-more-87f2e1a70f79)

### Lint
```
yarn lint
```

> This project uses [ESLint](https://eslint.org/), and follows [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript)

### Test
```
yarn test
```

> This project uses [Husky](https://github.com/typicode/husky) to automatically lint and test code before every commit