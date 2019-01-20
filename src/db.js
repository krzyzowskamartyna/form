(() => {
    // 'use strict'

    if (!('indexedDB' in window)) {
        console.log('IndexedDB not supported')
        return
    }
    else {
        console.log('Supported')
    }
    var request = window.indexedDB.open("myPrettyDatabase", 1);


    request.onerror = function (event) {
        console.log('The database is opened failed');
    };
    var db;

    request.onsuccess = function (event) {
        db = request.result;
        console.log('The database is opened successfully');


    };
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        var objectStore = db.createObjectStore('person', { keyPath: 'id' }, { autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    }

})()

//export default db;