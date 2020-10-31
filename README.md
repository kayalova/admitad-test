# Admitad test

## Description

Currency service parsed from [Central Bank of Russia](http://www.cbr.ru/scripts/XML_daily.asp)

## Built with

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

```bash
$ git clone git@github.com:kayalova/admitad-test.git
$ npm install
```

## Prerequisites

You need [redis](https://redis.io/) running on your computer
and [pm2](https://pm2.keymetrics.io/) installed globally


## Running the app

```bash
# development
$ npm run nodemon

# production mode
$ npm run prebuild && npm run build && pm2 start ecosystem.config.js
```

## Examples

```bash
To register and to login (save token u got from response)
$ curl -X POST -d 'email=test@test.com&password=123' http://localhost:3000/auth/signup
$ curl -X POST -d 'email=test@mail.com&password=123' http://localhost:3000/auth/signin

To get currencies (query params are optional)
$ curl http://localhost:3000/currencies -H "Authorization: Bearer your.bearer.token"

To get single currency
$ curl http://localhost:3000/currency/R01820 -H "Authorization: Bearer your.bearer.token"
```

All application logs can be found in out.log file. Also check out application documentaion at http://localhost:3000/api

## License

  Nest is [MIT licensed](LICENSE).
