const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

MongoClient.connect('mongodb+srv://maceWindu:NcFBvYscEmv1cuSl@cluster0.peozeft.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('starQuotes');
        const quotesCollection = db.collection('quotes');
   
        app.get('/', (req, res) => {
            //res.sendFile(__dirname + '/index.html');
            const cursor = db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', { quotes: results});
                //console.log(results);
            })
            .catch(error => {
                console.error(error);
            });
        });

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/');
            })
            .catch(error => {
                console.error(error);
            })
        });

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                //query,
                {
                    // find a quote by yoda
                    name: 'Yoda' 
                },
                //update,
                {
                    // set it to a quote by vadar
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                //options
                {
                    //if no yoda quotes, create vadar quote anyways
                    upsert: true
                }
            )
            .then(result => {
                res.json('Success');
                //console.log(result);
            })
            .catch(error => {
                console.error(error)
            });
            //console.log(req.body);
        });

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                //query,
                { name: req.body.name },
                //options

            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete');
                }
                res.json('Deleted Darth Vadar Quote');
            })
            .catch(error => {
                console.error(error)
            });
        });
    })
    .catch(error => {
        console.error(error)
    });

app.listen(3000, function() {
    console.log('listening on 3000');
});