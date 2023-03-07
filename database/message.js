import SQLite from './sqlite';
import uuid from 'react-native-uuid';
import moment from 'moment';

export async function queryMessage(callback) {
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "message" ORDER BY "timestamp"`);
    const messages = [];
    for (let i = 0; i < results.rows.length; i++) {
        const message = results.rows.item(i);
        messages.push(message);
    }
    if (callback) {
        callback(messages);
    }
    return messages;
}

export async function addMessage(message, callback) {
    const sqlite = SQLite.getInstance();
    // TODO: mock data
    message.id = uuid.v4();
    message.state = 0;
    message.timestamp = moment().valueOf();
    message.profile_id = '0x123';
    message.is_send = 1;
    const results = await sqlite.executeSql(`INSERT into "message" VALUES (?,?,?,?,?,?)`,
        [message.id, message.state, message.timestamp, message.profile_id, message.is_send, message.content],
    );
    if (callback) {
        callback(message);
    }
}