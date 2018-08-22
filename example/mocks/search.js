const { humanoids, droids, starships } = require('../mockData');
const schema = require('../schema');

const firstResult = [
  {
    ...humanoids[1],
    __typename: 'Humanoid',
  },
  {
    ...droids[0],
    __typename: 'Droid',
  },
];

const secondResult = [
  {
    ...starships[0],
    __typename: 'Starship',
  },
  {
    ...starships[1],
    __typename: 'Starship',
  },
];

module.exports = {
  typeDefs: schema,
  resolvers: {},
  mocks: {
    Query: () => ({
      search: firstResult,
    }),
  },
  deltas: [
    {
      Query: () => ({
        search: () => secondResult,
      }),
    },
  ],
};
