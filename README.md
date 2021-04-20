# Update - April 2021: Version 1.40.1

# Tabler React

> React implementation of the [Tabler Dashboard UI Kit](https://github.com/tabler/tabler)

[![NPM](https://img.shields.io/badge/github-v.1.40.1-blue)](https://www.github.com/santiagocasasrey/tabler-react) ![Type definitions](https://img.shields.io/badge/type%20definitions-flow-green.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/tabler/tabler-react.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Install

There's no package of this Fork. If you want to try it type:
```npm install santiagocasasrey/tabler-react```

## Example

```jsx
import React, { Component } from "react";

import "tabler-react/dist/Tabler.css";

import { Card, Button } from "tabler-react";

class MyCard extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Button color="primary">A Button</Button>
        </Card.Body>
      </Card>
    );
  }
}
```

For more examples and documentation see the [demo website](http://tabler-react.com)

## Setup

The package is made up of 2 main folders:

- /src contains all the Tabler React components
- /example is our [create-react-app](https://github.com/facebook/create-react-app/) based demo website

To setup and run a local copy:

1.  Clone this repo with `git clone https://github.com/santiagocasasrey/tabler-react`
2.  Run `yarn install` in the root folder
3.  Run `yarn install` in the example folder
4.  In seperate terminal windows, run `yarn start` in the root and example folders.

You should now be up and running with live browser reloading of the example website while you work on Tabler React components in the /src folder.

## License

MIT © [santiagocasasrey](https://github.com/santiagocasasrey), [jonthomp](https://github.com/jonthomp), [AaronCoplan](https://github.com/AaronCoplan) and [the contributors](https://github.com/tabler/tabler-react/graphs/contributors).
