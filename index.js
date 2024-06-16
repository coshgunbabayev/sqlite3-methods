const sqlite3 = require("sqlite3").verbose();
const { OPEN_READWRITE } = require("sqlite3");

async function connection(file) {
    const db = await new sqlite3.Database(file,
        sqlite3 / OPEN_READWRITE,
        (err) => { if (err) return new Error("Error: file is not a database") });
    return db
};

async function createTable(
    {
        db,
        tableName,
        cols: [
            {
                name,
                type,
                primaryKey,
                unique,
                required
            }
        ]
    }) {
    if (typeof (arguments[0].tableName) !== "string") { throw new Error("tableName's type is not string") }
    else if (arguments[0].tableName.length === 0) { throw new Error("tableName's area is required") };

    let colsCommonds = "id INTEGER PRIMARY KEY ";

    arguments[0].cols.forEach(col => {
        if (col.name === "" || col.name === undefined) { throw new Error("col's colunmName value is invalid") };
        if (col.name === "id") { throw new Error("You do not need to create the id column, it is created automatically") }
        if (col.type === undefined || col.type === "" || !(col.type === "string" || col.type === "number")) { throw new Error("col's type value is invalid, choose 'string' or 'number'") };
        let colCommond = `, ${col.name} `;

        switch (col.type) {
            case "string":
                colCommond += "TEXT ";
                break;

            case "number":
                colCommond += "INTEGER ";
                break;
        };

        switch (col.primaryKey) {
            case true:
                colCommond += "PRIMARY KEY ";
                break;

            case false || undefined:
                break;
        };

        switch (col.unique) {
            case true:
                colCommond += "UNIQUE ";
                break;

            case false || undefined:
                break;
        };

        switch (col.required) {
            case true:
                colCommond += "NOT NULL ";
                break;

            case false || undefined:
                break;
        };

        colsCommonds += colCommond;
    });

    try {
        await db.run(`CREATE TABLE ${tableName} (${colsCommonds})`);
    } catch (err) {
        return err
    };
};

async function dropTable(
    {
        db,
        tableName
    }) {
    if (typeof (arguments[0].tableName) !== "string") { throw new Error("tableName's type is not string") }
    else if (arguments[0].tableName.length === 0) { throw new Error("tableName's area is required") };

    try {
        await db.run(`DROP TABLE ${arguments[0].tableName}`);
    } catch (err) {
        return err
    };
};

async function createRow(
    {
        db,
        tableName,
        values: [
            {
                name,
                value
            }
        ]
    }) {
    if (typeof (tableName) !== "string") { throw new Error("tableName's type is not string") }
    else if (tableName.length === 0) { throw new Error("tableName's area is required") };

    let columns = "";
    let valuesAmount = "";
    let values = new Array();

    arguments[0].values.forEach(element => {
        columns += element.name;
        if (arguments[0].values.indexOf(element) !== arguments[0].values.length - 1) {
            columns += ",";
        };

        valuesAmount += "?";
        if (arguments[0].values.indexOf(element) !== arguments[0].values.length - 1) {
            valuesAmount += ",";
        };

        values.push(element.value)
    });

    try {
        await db.run(`INSERT INTO ${tableName} (${columns}) VALUES(${valuesAmount})`, values);
    } catch (err) {
        return err
    };
};

module.exports = { connection, createTable, dropTable, createRow };