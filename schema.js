export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platforms: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        games: [Game]
        game(id: ID!): Game

        reviews: [Review]
        review(id: ID!): Review

        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        addGame(game: AddGameInput!): Game
        updateGame(id: ID!, edits: EditGameInput!): Game
        deleteGame(id: ID!): [Game]
    }
    input AddGameInput {
        title: String!,
        platforms: [String!]!
    }
    input EditGameInput {
        title: String,
        platforms: [String!]
    }
`;

// int, float, string, boolean, ID
