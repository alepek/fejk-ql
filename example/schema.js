// Courtesy of https://github.com/apollographql/starwars-server/blob/master/data/swapiSchema.js
// but simplified to not use interfaces

const schemaString = `
  schema {
    query: Query
    mutation: Mutation
  }
  # The query type, represents all of the entry points into our object graph
  type Query {
    reviews(episode: Episode!): [Review]
    search(text: String): [SearchResult]
    droid(id: ID!): Droid
    humanoid(id: ID!): Humanoid
    starship(id: ID!): Starship
  }
  # The mutation type, represents all updates we can make to our data
  type Mutation {
    createReview(episode: Episode, review: ReviewInput!): Review
  }
  # The episodes in the Star Wars trilogy
  enum Episode {
    # Star Wars Episode IV: A New Hope, released in 1977.
    NEWHOPE
    # Star Wars Episode V: The Empire Strikes Back, released in 1980.
    EMPIRE
    # Star Wars Episode VI: Return of the Jedi, released in 1983.
    JEDI
  }
  # Units of height
  enum LengthUnit {
    # The standard unit around the world
    METER
    # Primarily used in the United States
    FOOT
  }
  # A humanoid creature from the Star Wars universe
  type Humanoid {
    # The ID of the human
    id: ID!
    # What this human calls themselves
    name: String!
    # The home planet of the human, or null if unknown
    homePlanet: String
    # Height in the preferred unit, default is meters
    height(unit: LengthUnit = METER): Float
    # Mass in kilograms, or null if unknown
    mass: Float
    # This human's friends, or an empty list if they have none
    humanoidFriends: [Humanoid]
    # This human's droid friends
    droidFriends: [Droid]
    # The movies this human appears in
    appearsIn: [Episode]!
    # A list of starships this person has piloted, or an empty list if none
    starships: [Starship]
  }
  # An autonomous mechanical character in the Star Wars universe
  type Droid {
    # The ID of the droid
    id: ID!
    # What others call this droid
    name: String!
    # This droid's friends, or an empty list if they have none
    friends: [Droid]
    # This droids human friends
    humanoidFriends: [Humanoid]
    # The movies this droid appears in
    appearsIn: [Episode]!
    # This droid's primary function
    primaryFunction: String
  }
  # Represents a review for a movie
  type Review {
    # The number of stars this review gave, 1-5
    stars: Int!
    # Comment about the movie
    commentary: String
  }
  # The input object sent when someone is creating a new review
  input ReviewInput {
    # 0-5 stars
    stars: Int!
    # Comment about the movie, optional
    commentary: String
    # Favorite color, optional
    favorite_color: ColorInput
  }
  # The input object sent when passing in a color
  input ColorInput {
    red: Int!
    green: Int!
    blue: Int!
  }
  type Starship {
    # The ID of the starship
    id: ID!
    # The name of the starship
    name: String!
    # Length of the starship, along the longest axis
    length(unit: LengthUnit = METER): Float
    coordinates: [[Float!]!]
  }
  union SearchResult = Humanoid | Droid | Starship
`;

module.exports = schemaString;
