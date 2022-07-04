# Test Assignment - Frontend (SPA)

## Краткое описание

Mock API реализован в виде плагина - `currency-data-fixtures`.
Статичные данные собраны в одном файле - `\plugins\currency-data-fixtures\static-data.js`

  - **currencyArray** - перечень всех валют
  - **commissionsPercent** - перечень всех видов комиссий
  - **minRate** - минимальный курс для диапазона валют
  - **maxRate** - максимальный курс для диапазона валют
  - **rateUpdateIntervalMs** - интервал обновления курсов (ms)

## Description

Mock API is done as a plugin - `currency-data-fixtures`.
Static data are collected in one file - `\plugins\currency-data-fixtures\static-data.js` 

  - **currencyArray** - a list of all used currencies
  - **commissionsPercent** - a list of all commissions
  - **minRate** - minimal rate for the rate's delta
  - **maxRate** - maximum rate for the rate's delta
  - **rateUpdateIntervalMs** - interval for rates update (ms)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Screenshots

![Starting](/_images/index-page-empty.png)

![Index with data](/_images/index-page.png)

![Success page](/_images/success-page.png)

![Success page Empty](/_images/success-page-no-data.png)


