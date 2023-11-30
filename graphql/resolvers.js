const Recipe = require('../models/Recipe');

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createRecipe(_, {recipeInput: { name, description }}) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsDown: 0,
        thumbsUp: 0,
      });

      const res = await createdRecipe.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      // 1if something was deleted. 0 if nothing was deleted
      return wasDeleted;
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (await Recipe.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
      // 1 if something was edited. 0 if nothing was edited

      return wasEdited;
    },
  },
};
