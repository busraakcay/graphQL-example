// data
import db from "./_db.js";

export const resolvers = {
  Query: {
    // getting all data
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    /*
      QUERY VARIABLES
      functionName(parent, args, context)
      parent: parent resolver in resolver chain
      args: access any query variables that sends with query
      context: auth. info etc.
      */
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },

    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },

    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },

    /*
      query ReviewQuery($id: ID!) {
       review(id:2) {
         id,
         rating,
         content
       }
      }
     */
  },
  /*
      RELATED DATA
      query GameQuery($id: ID!) {
        game(id:$id) {
          id,
          title,
          platforms,
          reviews {
            rating,
            content
          }
        }
      }
      */
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Mutation: {
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
  },
  /*
    MUTATION REQUESTS

    # delete game
        mutation DeleteMutation($id: ID!){
            deleteGame(id: $id) { 
                id,
                title,
                platform
            }
        }    

    # add game
        mutation AddMutation($game: AddGameInput!){
            addGame(game: $game) { 
                id,
                title,
                platforms
            }
        }

        game variables:
        {
            "game" : {
                "title" : "Game 1",
                "platforms" : [
                    "PC",
                    "PS4"
                ]
            }
        }

    # edit game
        mutation EditMutation($id: ID!, $edits: EditGameInput!){
            updateGame(id: $id, edits: $edits) { 
                id,
                title,
                platforms
            }
        }

        edit variables:
        {
            "id" : "1",
            "edits" : {
                // "title" : "Update Game",
                "platforms" : [
                    "Xbox",
                    "PS5"
                ]
            }
        }
    */
};
