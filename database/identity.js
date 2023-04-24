import SQLite from './sqlite';

export async function queryIdentity() {
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "identity"`);
    return results.rows.length > 0 ? results.rows.item(0) : undefined;
}

export async function addIdentity(mail, password) {
    const sqlite = SQLite.getInstance();
    await sqlite.executeSql(`INSERT into "identity" VALUES (?,?)`,
        [mail, password],
    );
}
