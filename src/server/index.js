import 'babel-polyfill';

import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/utility/Routes'

import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import reducer from "../shared/utility/Reducer";
import createSagaMiddleware from "redux-saga";
import { watchFetchData } from "../shared/utility/Saga";


const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promiseOne = activeRoute.fetchAmiiboElements
    ? activeRoute.fetchAmiiboElements()
    : Promise.resolve()

  const promiseTwo = activeRoute.fetchAmiiboType
    ? activeRoute.fetchAmiiboType()
    : Promise.resolve()

  const promiseThree = activeRoute.fetchAmiiboUniverse
    ? activeRoute.fetchAmiiboUniverse()
    : Promise.resolve()

  var contextOne = promiseOne
  var contextTwo = promiseTwo
  var contextThree = promiseThree

  promiseOne.then((data) => {
    contextOne = data
  }).catch(next)

  promiseTwo.then((data) => {
    contextTwo = data
  }).catch(next)

  promiseThree.then((data) => {
    contextThree = data
  }).catch(next)

  Promise.all([promiseOne, promiseTwo, promiseThree]).then(values => {

    const context = { contextOne, contextTwo, contextThree }
    
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(watchFetchData);

    const markup = renderToString(
      <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
      </Provider>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Amiibo</title>
          <meta charset="utf-8">
          <link rel="shortcut icon" href="img/mario.ico">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0 shrink-to-fit=no">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">

          <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,400i,700|Roboto:100,300,400,400i,500,700&amp;subset=cyrillic" rel="stylesheet">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(context)}</script>
          <link rel="stylesheet" type="text/css" href="/css/style.css">
          <link rel="stylesheet" type="text/css" href="/css/animation.css">
        </head>

        <body>
          <div class="" id="rootElementLoader"></div>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)


  }).catch(next)

})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/