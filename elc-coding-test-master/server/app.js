/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const express = require('express');
const app = express();
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;
const data      = require('./data');

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
function getProducts(term){
    const results = data.filter(x => {
        const tags = x.tags.join('');
        if (x.name.toLowerCase().includes(term) || x.about.toLowerCase().includes(term) || tags.includes(term)) {
            return true;
        }
    });
    return results;
}

app.get('/product/:term', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const term = req.params.term;
    const results = getProducts(term);
    results ? res.json(results) : res.status(404).json({message: 'Product not found.'})
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("ELC app listening at http://%s:%s", host, port)
});



console.log(`[Server running on ${hostname}:${port}]`);
