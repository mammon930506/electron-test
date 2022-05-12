var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./test.sqlcipher');

db.serialize(function() {
    var stmt, messages;

    db.run("PRAGMA KEY = 'secret'");
    // db.run("PRAGMA key = \"x'2DD29CA851E7B56E4697B0E1F08507293D761A05CE4D1B628663F411A8086D99'\"");
    db.run("PRAGMA CIPHER = 'aes-128-cbc'");
    db.run("CREATE TABLE messages(id INTEGER, user VARCHAR, level VARCHAR, msg TEXT)");

    stmt = db.prepare("INSERT INTO messages(id, user, level, msg) VALUES (?, ?,?, ?)");
    messages = [
        [1, 'coolaj86', 'A','this is test message number one']
        , [2, 'ajthedj','B', 'this is test message number two']
        , [3, 'coolaj86','A', 'this is test message number three']
    ];
    messages.forEach(function (msg) {
        stmt.run(msg);
    });
    stmt.finalize();

    db.get("SELECT * FROM messages WHERE level='A'", function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
    });
    db.all("SELECT * FROM messages WHERE level='A'", function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
    });
});
