const { humanoids, droids, starships } = require('../mockData');
const schema = require('../schema');

module.exports = {
  typeDefs: schema,
  resolvers: {},
  mocks: {
    Humanoid: () => humanoids[0],
    Droid: () => droids[0],
    Starship: () => starships[0],
  },
  deltas: [
    {
      Humanoid: () => humanoids[1],
    },
    {
      Droid: () => droids[1],
    },
    {
      Starship: () => starships[1],
    },
  ],
  deltasCumulative: true,
};
