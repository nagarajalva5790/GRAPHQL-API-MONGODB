const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = 'mongodb+srv://nagarajalva5790:uHMCV5cpDXbL6OZA@cluster0.o1i63zh.mongodb.net/?retryWrites=true&w=majority';

//Apollo setver
//typeDefs: GraphQL Type DEfinitions
//resolvers: How do we resolve queries/ mutations'

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connection Successful');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
