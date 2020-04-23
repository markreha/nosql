// Dependencies
const express = require('express');
const mongo_client = require('mongodb').MongoClient;
const path = require('path');

// Application variables
const app = express();
const port = 3000;
const artist = "The Beatles";
const mongodb_uri = "mongodb+srv://[username]:[password]@[url to mongodb database]/test?retryWrites=true&w=majority";

// Load View Engine and set its working paths
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
  		if(!err) 
  		{
  			// Get the Albums Collection from the My Music Database
    		console.info("Connected on MongoDB.");
    		var collection = client.db("mymusic").collection("albums");
    		
    		// Run the Query and sort it by year
			collection.find({"artist": artist}).sort({"year":1}).toArray(function(err, albums)
    		{
    			if(!err)
    			{
					// Display the Albums in a View
					console.info("Finished getting all the albums");
					displayAlbums(res, artist, albums);
				}
				else
				{
					// Error
  					console.error("We failed to get the albums from MongoDB");
  					res.end("Exception connecting to database " + err.message);
				}
			});			
			client.close();
  		}
  		else
  		{
  			// Error
  			console.error("We failed to connect to MongoDB");
  			res.end("Exception connecting to database " + err.message);
  		}
	});
});

// Start the Server
app.listen(port, function ()
{
	console.info('MongoDB Test App listening on port ' + port);
});

// ***** Helper Functions *****

// Display the Albums in the View for the Artist
function displayAlbums(res, artist, albums)
{
	// Display debug info
	console.debug("I am going to display the albums");
	console.debug('\nNumber of albums is ' + albums.length);
	for(var album of albums)
	{
		console.debug("The album is " + album.title);
	}
	
	// Render the Albums in the View for this Artist
	res.render('index', { artist: artist, albums: albums })
}
