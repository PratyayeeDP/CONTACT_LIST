//We need to require the library mongoose:
const mongoose=require('mongoose');

//contacts_list_db is the database name, signifies mongodb server is running on my local system:
//connect to the database:
mongoose.connect('mongodb://localhost/contacts_list_db');

//we need to verify whether it has connected or not:
//db is the connection between mongoose and the database:
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//If there is no error:
db.once('open',function(){
    console.log('Successfully connected to the database');
});
