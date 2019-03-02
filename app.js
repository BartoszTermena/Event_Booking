const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
    
        type RootMutation {
            createEvent(name: String): String
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Event1', 'Event2', 'Event3']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName
        },
    },
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Started listening at ${PORT}`)
})