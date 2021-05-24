# Update - May 2021: Version 1.41.0

# Tabler React

> React implementation of the [Tabler Dashboard UI Kit](https://github.com/tabler/tabler)

[![NPM](https://img.shields.io/badge/github-v.1.41.0-blue)](https://www.github.com/santiagocasasrey/tabler-react) ![Type definitions](https://img.shields.io/badge/type%20definitions-flow-green.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/tabler/tabler-react.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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

For more examples and documentation see the [demo website](https://santiagocasasrey.github.io/tabler-react)

## Setup

The package is made up of 2 main folders:

- /src contains all the Tabler React components
- /example is our [create-react-app](https://github.com/facebook/create-react-app/) based demo website

To setup and run a local copy:

1.  Clone this repo with `git clone https://github.com/santiagocasasrey/tabler-react`
2.  Run `yarn install` in the root folder
3.  Run `yarn install` in the example folder
4.  In seperate terminal windows, run `yarn start` in the root and example folders.
5.  If you see an error with react-hooks and two copies of react or react-dom execute: `npm link .\example\node_modules\react\` and `npm link .\example\node_modules\react-dom\`

You should now be up and running with live browser reloading of the example website while you work on Tabler React components in the /src folder.

## Deploy

1. In main package.json execute `prepare` script in order to build tabler-react.
2. (Optional) Execute `deploy` script if you want to deploy the web example to github pages. You will locate your deploy [here](https://santiagocasasrey.github.io/tabler-react).


## License

MIT © [santiagocasasrey](https://github.com/santiagocasasrey), [jonthomp](https://github.com/jonthomp), [AaronCoplan](https://github.com/AaronCoplan) and [the contributors](https://github.com/tabler/tabler-react/graphs/contributors).
