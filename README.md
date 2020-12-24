# MankBot App

Discord bot for Mankalor's Discord Server. Based on [VylBot Core](https://github.com/getgravitysoft/vylbot-core)

## Installation

Download the latest version from the [releases page](https://github.com/Vylpes/mankbot-app/releases).

Copy the config template file and fill in the strings.

See `config.template.json`

## Usage

Implement the client using something like:

```js
const vylbot = require('vylbot-core');
const config = require('./config.json');

const client = new vylbot.client(config);
client.start();
```