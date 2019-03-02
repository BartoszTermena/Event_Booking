const Event = require('../..//models/event')
const { transformEvent } = require('./merge')


module.exports = {
    events: () => {
        return Event.find()
        .then(events => {
            return events.map(event => {
                return transformEvent(event);
            });
        })
        .catch(err => {
            throw err;
        });
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,  
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c7a8a4b30e22c2874b8ecd9'
        });
        let createdEvent;
        return event
            .save()
            .then(res => {
                createdEvent = transformEvent(res);
                return User.findById('5c7a8a4b30e22c2874b8ecd9')
            })
            .then(user => {
                if(!user) {
                    throw new Error("User not found.")
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(res => {
                return createdEvent;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }   
};