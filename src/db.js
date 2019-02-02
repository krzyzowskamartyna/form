/*(() => {
  //

  const request = window.indexedDB.open("myDatabase", 1);

  request.onerror = function () {
      alert("Could not open IndexedDB")
  };
  let db;

  request.onsuccess = function (event) {
      db = request.result;
      console.log('The database is opened successfully');

  };
  request.onupgradeneeded = function (event) {
      db = event.target.result;
      const objectStore = db.createObjectStore('inputs', { keyPath: 'id' }, { autoIncrement: true });
      objectStore.createIndex('question', 'question', { unique: false });
      objectStore.createIndex('type', 'type', { unique: true });
  }

  SEND DATA TO INDEXEDDB

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
 
})()*/

function putSomeData() {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

    let open = indexedDB.open('myDatabase', 1)

    open.onupgradeneeded = function () {
        let db = open.result
        db.createObjectStore('form', { autoIncrement: true })
    }

    open.onsuccess = function () {
        let db = open.result
        let tx = db.transaction('form', 'readwrite')
        let store = tx.objectStore('form')

        store.put({ question: 'John', type: 'Doe' })

        tx.oncomplete = function () {
            db.close()
        }
    }
} putSomeData()