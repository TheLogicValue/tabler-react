**[Demo](https://thelogicvalue.github.io/tabler-react/)**

## Install

Para desarrollar la biblioteca y su demo, utiliza [Node.js](https://nodejs.org/) `^20.19.0 || ^22.13.0 || >=24.0.0`; se recomienda Node 24.x y npm 11.x. Ambos proyectos declaran los requisitos en `devEngines`: Node incompatible detiene la operación y otra versión de npm genera un aviso. `packageManager` indica npm 11.19.0 como referencia, sin excluir otras versiones 11.x.

Ejecuta `npm ci` en la raíz para instalar las dependencias del lock y compilar mediante `prepare`. La demo mantiene su instalación independiente con `npm --prefix demo ci`. Consulta [Setup y los comandos de la demo](../README.md#setup) para el flujo completo y la excepción de peers de ESLint. Los requisitos de compilación se aplican también a instalaciones desde Git; los consumidores de un paquete ya compilado mantienen los requisitos de sus propias herramientas.

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
