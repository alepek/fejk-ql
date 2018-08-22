# fejk-ql

A stateless GraphQL mock with stateful capabilities.

This library serves to act as a mock of one or many GraphQL graphs. It does so by making a small extension to the API of [graphql-tools](https://www.apollographql.com/docs/graphql-tools/mocking.html), and adding a cookie-based mechanism for keeping a small state representation on the client.


# Table of contents

  * [fejk-ql](#fejk-ql)
  * [Table of contents](#table-of-contents)
  * [Why fejk-ql](#why-fejk-ql)
    * [How fejk-ql is different from built in graph-ql-tools mocking](#how-fejk-ql-is-different-from-built-in-graph-ql-tools-mocking)
  * [Requirements](#requirements)
  * [Getting started](#getting-started)
  * [Mock folder](#mock-folder)
  * [Specifying a mock in your graphql query](#specifying-a-mock-in-your-graphql-query)
  * [Mock format](#mock-format)
    * [Deltas](#deltas)
  * [Running the example](#running-the-example)


# Why fejk-ql

This library is built with two use cases in mind:
* Developing a web app that depends on a GraphQL API
* Testing a web app that depends on a GraphQL API

For development you may or may not have an API available to you. If you have the GraphQL schema setting up a rich mock is simple with fejk-ql.

For testing you might not want to depend on other services than the application you are testing. fejk-ql can be run in the same process as your web app, or side by side, to make application testing without dependencies to other services simple.

## How fejk-ql is different from built in graph-ql-tools mocking

This library offers client-driven statefulness and a mock format, and saves you the time to configure graphql-tools yourself. If you're fine with configuring graphql-tools and don't have a need for faking statefulness, this library might not be for you.

# Requirements

To use this library:

* A graphql schema string
* Proficiency in [graphql-tools mocking](https://www.apollographql.com/docs/graphql-tools/mocking.html)
* Node.js `>= 8`
* [Express.js](https://expressjs.com/)
  * A body-parser middleware
  * A cookie-parser middleware

To develop this library:

* Proficiency in [graphql-tools mocking](https://www.apollographql.com/docs/graphql-tools/mocking.html)
* Proficiency in [Express.js](https://expressjs.com/)
* Node.js `>= 8`
* Yarn `>= 1.0`

# Getting started

* Set up an express server with a body parser and cookie parser of your choice.
* Add a mock, or default mock - see [Mock folder](#mock-folder).
* Designate the mock folder in the environment variable `FEJK_QL_MOCK_PATH`.
* (optional) Configure a mock header name - see [Specifying a mock in your graphql query](#specifying-a-mock-in-your-graphql-query)
* Mount the fejk-ql middleware on a path of your choice - e.g. `app.use('/gql-mock', fejk-ql);`.
* Start your server and start querying! See [Specifying a mock in your graphql query](#specifying-a-mock-in-your-graphql-query) for more info on how to pick a mock per query.

See [Running the example](#running-the-example) for an example and tips for getting started.

# Mock folder

fejk-ql supports exactly one mock folder, with no subfolders. The mock folder contains all graph mocks, according to the [Mock format](#mock-format). The file name will denote the unique name of your mock, e.g `mocks/my-mock.js` will be given the unique name `my-mock`.

When starting your app, the mock folder is designated by the mandatory `FEJK_QL_MOCK_PATH` env variable.

# Specifying a mock in your graphql query

To specify which mock to use when responding to a query, the **optional** `fejk-ql-graph-name` can be set to the mocks name. If you want to change the header name, set the environment `FEJK_QL_HEADER_NAME` to your desired name.

How the graph name is chosen is described in [Mock folder](#mock-folder).

If the header is not set, a mock named `default` will be used. If the header is not set and there is no mock named `default` the service will respond with a `500`.

One way of doing this in your client per query is to use [the apollo client context](https://www.apollographql.com/docs/link/links/http.html#context)

# Mock format

The mock format is inspired by the parameters provided when setting up a graphql mock in [graphql-tools](https://www.apollographql.com/docs/graphql-tools/mocking.html). A mock file must export a single object with the following fields:

* `typeDefs` - the graphql schema string to mock.
* `resolvers` - any resolvers to include. May be an empty object.
* `mocks` - The mocks to use, according to the format specified in [Customizing mocks](https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks).
* `deltas` - An array of deltas to apply, giving the mock client-driven statefulness. Specifying deltas will allow the mock to respond to the same query in different ways to simulate statefulness. See [Deltas](#deltas) for more info.
* `deltasCumulative` (optional) - A boolean indicating whether to apply deltas in a cumulative fashion. If true, all deltas up until, and including, the current delta index will be applied before sending the response, instead of only the delta at the delta index.

## Deltas

Each delta will override the mocking specified in the `mocks` field. The `deltas` will be merged with the `mocks`, overriding only what you specify in the deltas.

The deltas will be served round-robin, starting at index `0`. Once the last delta is served, the mock will serve one delta-free response and then start applyting deltas again.

The delta functionality stores a cookie in the client to indicate which delta to serve next. If the client does not support cookies the initial state will always be served.

# Running the example

The example is a separate node project found under `/example`. To start it:

* Check out the repo.

In the example folder:

* `yarn`
* `yarn start`
* visit [http://localhost:4000/](http://localhost:4000/) to run examples, or [http://localhost:4000/graphiql](http://localhost:4000/graphiql) to run graphiql against the default mock.
