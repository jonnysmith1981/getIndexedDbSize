#getIndexedDbSize
##Description
This Javascript function is used to iterate over all object stores for a given database name, and for each store it will list the number of bytes. It makes use of the proposed ECMAScript 6 Promise object to manage the asynchronous calls to IndexedDB.

The function has been wrapped in a closure so that it can easily be used as a Snippet in Google Chrome without worrying about leaking the code's variables into the global namespace.


##Usage
In order to run the function, you will need to set the database name in the 'openDatabase' inner function call e.g.:

 var request = window.indexedDB.open("myDatabase");

 To avoid inadvertantly triggering an IndexedDB upgrade, I do not pass a version number when calling indexedDB.open().

##Notes
The current version of this function makes use of console.table() to display the results. As such it only really works in Google Chrome.
