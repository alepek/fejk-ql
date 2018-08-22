const { humanoids, droids, starships } = require('../mockData');
const schema = require('../schema');

module.exports = {
  typeDefs: schema,
  resolvers: {},
  mocks: {
    Humanoid: () => humanoids[Math.floor(Math.random() * humanoids.length)],
    Droid: () => droids[Math.floor(Math.random() * droids.length)],
    Starship: () => starships[Math.floor(Math.random() * starships.length)],
  },
  deltas: [
    {
      Query: () => ({
        search: () => [],
      }),
    },
  ],
};
