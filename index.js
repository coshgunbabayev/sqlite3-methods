const sqlite3 = require("sqlite3").verbose(); let sqlcommand;
const { OPEN_READWRITE } = require("sqlite3");

const connection = async (file) => {
    const db = await new sqlite3.Database(file,
        sqlite3 / OPEN_READWRITE,
        (err) => { if (err) return new Error("Error: file is not a database") });
    return db
};

module.exports = {connection};