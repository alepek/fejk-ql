const schemaString = `
  schema {
    query: Query
  }
  type Query {
    employer: Humanoid
    employee: Humanoid
  }
  type Humanoid {
    id: ID!
    name: String!
  }
`;

module.exports = schemaString;
