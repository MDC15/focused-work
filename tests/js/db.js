

var request = indexedDB.open("myDatabase", 1);
request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("users", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = function (event) {
  var db = event.target.result;
  var transaction = db.transaction(["users"], "readwrite");
  var objectStore = transaction.objectStore("users");
  var request = objectStore.add({ id: 1, name: "John Doe" });
  request.onsuccess = function (event) {
    console.log("Data added successfully");
  };
};

request.onerror = function (event) {
  console.log("Error creating database");
};
