const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-lo20j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Started listening at ${PORT}`)
    })
})
.catch(err => console.log(err));