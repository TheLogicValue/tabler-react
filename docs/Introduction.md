**[Demo](https://thelogicvalue.github.io/tabler-react/)**

## Install

For development, use [Node.js](https://nodejs.org/) `^20.19.0 || ^22.13.0 || >=24` and npm 11. Run `npm ci` in the repository root to install the locked dependencies.

`npm install thelogicvalue/tabler-react`

## Basic Usage Example

```jsx static
import React, { Component } from "react";

import "tabler-react/style.css";

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
