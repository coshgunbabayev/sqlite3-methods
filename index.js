const sqlite3 = require("sqlite3").verbose(); let sqlcommand;
const { OPEN_READWRITE } = require("sqlite3");
const db = new sqlite3.Database("./database/B.db", sqlite3 / OPEN_READWRITE, (err) => { if (err) return console.error(err.message); });

const connection = (file) => {
    const db = new sqlite3.Database(file,
        sqlite3 / OPEN_READWRITE,
        (err) => { if (err) return new Error("Error: file is not a database") });
    return db
};

module.exports = {connection};