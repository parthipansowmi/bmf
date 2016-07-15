export function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
export function getConnection(url) {
    var db;

    // Initialize DB connection once
    MongoClient.connect(url, function (err, database) {
        db = database;

        if (!err) {
            console.log("Listening on port 27107");
            return db;
        }

        else
            console.log(" Database Server not running")
            return err;
    });
}