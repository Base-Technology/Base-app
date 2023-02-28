import SQLite from './sqlite';

export function queryMessage(callback) {
    const sqlite = SQLite.getInstance();
    sqlite.open();
    sqlite.executeSql("select * from message", [], (tx, results) => {
        const messages = [];
        for (let i = 0; i < results.rows.length; i++) {
            const message = results.rows.item(i);
            messages.push(message);
        }
        callback(messages);
    });
}