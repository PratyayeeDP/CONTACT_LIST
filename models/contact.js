//we require the library mongoose:
const mongoose=require('mongoose');

//we want to create a schema that is one contact:
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type: String,
        required:true
    }
});

//we need to specify the name of the collection using the schema:
const Contact=mongoose.model('Contact',contactSchema);

//Finally we need to export the collection:
module.exports=Contact;