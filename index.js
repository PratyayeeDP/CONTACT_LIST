//We need to require express just like other libraries.
const express=require('express');

//we require the module path which is inbuilt.
const path=require('path');
const port=8000;

//we connect to the database through db:
const db=require('./config/mongoose');

//we need to require the collection of schemas defined by a constant name:
const Contact=require('./models/contact');

//to get all the functionalities of express: the naming convention is app;
const app=express();

//we set up our template engine that is EJS like a key value pair;
app.set('view engine','ejs');

//__dirname makes the path dynamic.
app.set('views',path.join(__dirname,'views'));

//app.use signifies middleware: parser
app.use(express.urlencoded());

//to access static files from folder assets using middleware.
app.use(express.static('assets'));

// // middleware1
// app.use(function(req,res,next){
//     //console.log('middleware 1 called');
//     next();
// });

// // middleware2
// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();
// });
var contactList=[
    {
        name:"Christy Plunkett",
        phone:"1111111111"
    },
    {
        name:"Jessica Pearson",
        phone:"2222222222"
    },
    {
        name:"Prince Sewells",
        phone:"3333333333"
    }
]

//app.get to fetch data:
app.get('/', function(req,res){
    //we render the home.ejs from folder views.
    //return res.render('home');

    //fetch contacts from database:
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{title:"Contacts list",
        contact_list:contacts
    });
    // //We make our title dynamic by inserting it as key-value pairs:
    // return res.render('home',{title:"Contacts list",
    // contact_list:contactList //to send our contactList(on top) to our home page as key value pairs.
});
});


app.get('/practice',function(req,res){
    //We make our title dynamic by inserting it as key-value pairs:
    return res.render('practice',{
        title:"Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    //To push the new contact inside the contact list
    //contactList.push(req.body);

    //To push the new contact into the database:
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
    
    //we go back to home:
    // return res.redirect('back');

    // contactlist.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // return res.redirect('/');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    //return res.redirect('/practice');
});


//for deleting a contact:
app.get('/delete-contact', function(req,res){
    //console.log(req.query);

    //get query from the ul:
    //let phone=req.query.phone;
    let id=req.query.id;

    //we find the index of the phone number:
    //let contactindex=contactList.findIndex(contact=>contact.phone==phone);

    //find the id of the contact in the databaseusing id and delete:
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the contact from database');
            return;
        }
        return res.redirect('back');
    });
    //if index is -1 then contact has not been found:
    // if(contactindex!=-1){
    //     contactList.splice(contactindex,1);
    // }
    // return res.redirect('back');
});


//To rum the server:
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup! My express server is running on port:',port);
});