const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

/// graphql 
const typeDefs = require('./graphql/schema');
const { Query } = require('./graphql/resolvers/query');
const { Mutation } = require('./graphql/resolvers/mutation');

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation
    },
    context: ({req}) =>{

        req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjAyMzNmM2NhOTYzZTI1MzhlODJmMmIiLCJlbWFpbCI6InByYWRlZUBnbWFpbC5jb20iLCJpYXQiOjE2NDQzMTE1MzksImV4cCI6MTY0NDkxNjMzOX0.-MN4_WyRNt7dG70sGuHCrMdXwVcaPYRso9_lqbpnp1k'
        return {req}
    }
})

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://graphiql:graphiql@graphql.d21uc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    })
}).catch( err => {
    console.log(err)
})


