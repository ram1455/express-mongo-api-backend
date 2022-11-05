const mongoose = require('mongoose')
const database = process.env.MONGO_URI
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('server database terhubung'));