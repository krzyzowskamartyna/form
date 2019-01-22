(() => {
    // 'use strict'

    if (!('indexedDB' in window)) {
        console.log('IndexedDB not supported')
        return
    }
    else {
        console.log('Supported')
    }
    var request = window.indexedDB.open("myDatabase", 1);


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
        var objectStore = db.createObjectStore('inputs', { keyPath: 'id' }, { autoIncrement: true });
        objectStore.createIndex('question', 'question', { unique: false });
        objectStore.createIndex('type', 'type', { unique: true });
    }

    /*  SEND DATA TO INDEXEDDB

    function getRecordsAsync(skip, take) {
        return new Promise((resolve, reject) => {
            var transaction = db.transaction("inputs", "readonly");
            var objectStore = transaction.objectStore("inputs");
            var result = "";
            var request = objectStore.openCursor(IDBKeyRange.bound(skip, skip + take))
                .onsuccess = function (evt) {
                    var cursor = evt.target.result;
                    if (cursor) {
                        result = JSON.stringify(this.state.inputs) + ',';
                        cursor.continue();
                    }
                    resolve(result.substr(0, result.length - 1));
                }
                    .onerror = function (err) {
                        reject(err);
                    };
        });
    }
    getRecordsAsync(1, 10).then(data => {
        console.log(data);
    })
 */
})()