// Dependencies
const express = require('express');
const mongo_client = require('mongodb').MongoClient;
const path = require('path');

// Application variables
const app = express();
const port = 3000;
const artist = "The Beatles";
const mongodb_uri = "mongodb+srv://[username]:[password]@[url to mongodb database]/test?retryWrites=true&w=majority";

// Load View Engine
app.set('view engine', 'pug')
app.set('/views', path.join(__dirname, 'views'));
app.use("/images", express.static(path.join(__dirname, 'images')));

// Main Application Entry Path
app.get('/', function (req, res) 
{
	// Connect to MongoDB
	mongo_client.connect(mongodb_uri, function(err, client) 
	{
		// If Connection OK	
		response = res;			
  		if(!err) 
  		{
  			// Get the Albums Collection from the Music Database
    		console.log("Connected on MongoDB.");
    		var collection = client.db("music").collection("albums");
    		
    		// Run the Query
    		collection.find({}).toArray(function(err, items) 
    		{
    			// Filter and sort the Albums 
    			var albums = items[0].albums;
    			albums = albums.filter(function(a){return a.artist === artist});
    			albums.sort(function(a, b){return a.year - b.year});
				console.log("Finished getting all the albums");
				
				// Display the Albums in a View
				displayAlbums(response, albums);
			});			
			client.close();
  		}
  		else
  		{
  			console.log("We failed to connect");
  		}
	});
});

// Start the Server
app.listen(port, function ()
{
	console.log('MongoDB Test App listening on port ' + port);
});

// ***** Helper Functions *****

// Display the Albums in the View
function displayAlbums(res, albums)
{
	console.log("I am going to display the albums");
//	res.write('\nNumber of albums is ' + albums.length);
	for(var album of albums)
	{
//		res.write("\n" + album.title);
		console.log("The album is " + album.title);
	}
//	res.end("\nDone");
	res.render('index', { albums: albums, message: 'Hello there!' })
}
