import mongodb from 'mongodb';
import {connectionString} from '../config/connection-strings';


//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

export function insert(table, values){
	debugger;
	// Use connect method to connect to the Server
	MongoClient.connect(connectionString, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	  	
	  	// Get the documents collection
	    var collection = db.collection(table);

	    // Insert some users
	    collection.insert(values, function (err, result) {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('Inserted %d documents into the "'+ table +'"" collection. The documents inserted with "_id" are:', result.length, result);
	      }
	      //Close connection
	      db.close();
	    });
	  }
	});
}