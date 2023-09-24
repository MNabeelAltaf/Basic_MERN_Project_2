const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')


const reg_tab = require('./model/registeration.model');

const bycrypt = require('bcrypt')

app.use(cors())
app.use(express.json());


const PORT = 3001;

// mongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/mern-website-db').then(() => {
    console.log("Mongo Connected");
}).catch((e) => {
    // start Mongo from system services 
    // press windoe key  + R then services.msc then search and start MongoDB.exe
    console.log("Connection Error");
    console.log(e)
})

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

// route for dealing registeration data
// entering Registeration data to Mongo
app.post('/api/register', async (req, res) => {

    // email must be unique
    // column (key) name here
    let email = req.body.email;


    try {

        const user_registereation = await reg_tab.findOne({
            email
        });

        // if email exists then send status 500
        if (user_registereation) {
            res.json({ status: 500 })
            return
        }
        else {

            // for password encryption
            const hashedPassword = await bycrypt.hash(req.body.password, 10);

            await reg_tab.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            res.json({ status: 200 });
        }

    } catch (error) {
        console.log(error);
        res.json({ status: 402 })
    }
})


// api route for getting data
app.get('/api/getusers', async (req, res) => {

    try {
        const all_users = await reg_tab.find({});
        // console.log(all_users);

        // send response (data) in json format
        res.json(all_users)
    } catch (err) {
        res.status(500).send("Error in getting data");
    }
})

// route for dealing login data
app.post('/api/login', async (req, res) => {


    const user = await reg_tab.findOne({
        email: req.body.email,

    })

    if (user) {

        const password = await bycrypt.compare(req.body.password, user.password);

        if (password) {
            res.json({ status: 'ok', user: true })

        } else {
            res.json({ status: 404 })

        }

    } else if (!user) {
        res.json({ status: 404 })
        return;
    }
    else {
        res.json({ status: 'error', user: false })
    }

})


// api for deleting user
app.delete('/api/delete', async (req, res) => {

    let ID = req.body.id;

    if (ID) {
        try {
            const result = await reg_tab.findByIdAndDelete((ID));
            if (result) {
                // console.log("Record Deleted Sucessfully");
                res.json({ status: 200 })
            } else if (result) {
                // console.log("Record not Found");
                res.json({ status: 404 })
            }
        } catch (error) {
            // console.log("Error in deleting record");
            // console.log(error);
            res.json({ status: 500 })
        }

    } else {
        console.log("No Record Found");
        res.json({ status: 404 })
    }

})


app.listen(PORT, () => {
    console.log("Running on Port", PORT);
})