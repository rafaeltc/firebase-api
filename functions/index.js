const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const serviceAccount = require("./serviceAccountKey.json");
const app = express();
app.use(cors({ origin: true }));

//FireStore
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://api-project-673435869573.firebaseio.com"
});
const db = admin.firestore()


//ROUTES

app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
});

app.post('/api/create', (req, res) => {
    (async() => {
        try {
            await db.collection('items').doc('/' + req.body.id + '/')
                .create({ item: req.body.item });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

exports.app = functions.https.onRequest(app);