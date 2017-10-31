# getIndexedDbSize
## Description
This Javascript function is used to iterate over all object stores for a given database name, and for each store it will list the number of bytes. It makes use of the proposed ECMAScript 6 Promise object to manage the asynchronous calls to IndexedDB.

The function has been wrapped in a closure so that it can easily be used as a Snippet in Google Chrome without worrying about leaking the code's variables into the global namespace.


## Notes
The current version of this function makes use of console.table() to display the results. As such it only really works in Google Chrome.
