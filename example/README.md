# Fejk-ql example

The example uses a slightly simplified version of the [Star Wars API Schema](https://github.com/apollographql/starwars-server/blob/master/data/swapiSchema.js) and provides a few examples for mocking types/queries.

## Examples

* `default` - overrides none of the graphql-tools mocking features.
* `random` - responds with a random `Humanoid`, `Droid`, `Starship` on every query.
* `rotating` - contains three deltas, responding with a different `Humanoid` on the first, a different `Droid` on the second, and a different `Starship` on the third.
* `cumulative` - as `rotating` but the changes are cumulative.
* `search` - an example of how to override an entire query, with a single delta.

## Getting started

* `yarn`
* `yarn start`
* visit [http://localhost:4000/](http://localhost:4000/) to run examples, or [http://localhost:4000/graphiql](http://localhost:4000/graphiql) to run graphiql against the default mock.
