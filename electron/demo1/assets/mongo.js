const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Connection URL
const url = 'mongodb://spiderrd:spiderrd@45.32.68.44:37017/bilibili_spider';

const dbName = 'bilibili_spider';

var db_size = 0;
var db_objects = 0 ;
const elem_db_name = document.getElementById('databasename')
const elem_db_size = document.getElementById('databasesize')

elem_db_size.innerHTML( '000' );

async function wrapper () {
   await Promise.all(
      MongoClient.connect(url, function(err, client) {
         assert.equal(null, err);
         console.log("Connected successfully to server");
         const db = client.db(dbName);
         db.command({'dbStats': 1}, function(err, results) {
            console.log(results);
            console.log( (results.dataSize)/1024/1024/1024);
            db_size = (results.dataSize)/1024/1024/1024;
            db_objects = results.objects;
         });
         client.close();
      }
      )
   );

   elem_db_size.innerHTML( db_size );


}