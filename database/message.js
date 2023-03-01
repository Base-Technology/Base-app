import SQLite from './sqlite';
import uuid from 'react-native-uuid';
import moment from 'moment';

export function queryMessage(callback) {
    const sqlite = SQLite.getInstance();
    sqlite.executeSql(`SELECT * FROM "message" ORDER BY "timestamp"`, [], (tx, results) => {
        const messages = [];
        for (let i = 0; i < results.rows.length; i++) {
            const message = results.rows.item(i);
            messages.push(message);
        }
        callback(messages);
    });
}

export function addMessage(message, callback) {
    const sqlite = SQLite.getInstance();
    // TODO: mock data
    message.id = uuid.v4();;
    message.state = 0;
    message.timestamp = moment().valueOf();
    message.profile_id = '0x123';
    message.is_send = 1;
    sqlite.executeSql(`INSERT into "message" VALUES (?,?,?,?,?,?)`,
        [message.id, message.state, message.timestamp, message.profile_id, message.is_send, message.content],
        (tx, results) => {
            callback(message);
        });
}