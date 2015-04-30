/*
The MIT License (MIT)

Copyright (c) 2015 Jonathan Smith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function showIndexedDbSize() {
  "use strict";
  var db;
  var storesizes = new Array();
 
  function openDatabase() {
    return new Promise(function(resolve, reject) {
      //prompt for DB name
      var dbname = prompt('Please enter your Database Name', '');

      if (dbname !== null) {
        var request = window.indexedDB.open(dbname);
        request.onsuccess = function (event) {
          db = event.target.result;
          resolve(db.objectStoreNames);
        };
      }
      
    });
  }
 
  function getObjectStoreData(storename) {
    return new Promise(function(resolve, reject) {
      var trans = db.transaction(storename, IDBTransaction.READ_ONLY);
      var store = trans.objectStore(storename);
      var items = [];
      trans.oncomplete = function(evt) {
        var szBytes = toSize(items);
        var szMBytes = (szBytes / 1024 / 1024).toFixed(2);
        storesizes.push({'Store Name': storename, 'Items': items.length,  'Size': szMBytes + 'MB (' + szBytes + ' bytes)'});
        resolve();
      };
      var cursorRequest = store.openCursor();
      cursorRequest.onerror = function(error) {
        reject(error);
      };
      cursorRequest.onsuccess = function(evt) {                   
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        }
      }
    });
  }
 
  function toSize(items) {
    var size = 0;
    for (var i = 0; i < items.length; i++) {
        var objectSize = JSON.stringify(items[i]).length;
        size += objectSize * 2;
    }
    return size;
  }
 
  openDatabase().then(function(stores) {
    var PromiseArray = [];
    for (var i=0; i < stores.length; i++) {
      PromiseArray.push(getObjectStoreData(stores[i]));    
    }
    Promise.all(PromiseArray).then(function() {
       console.table(storesizes);
    });
  });
}());