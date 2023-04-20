import SQLite from './sqlite';
import IMTP from "../imtp/service";

export async function queryMessage(callback) {
    const profile = await IMTP.getInstance().getProfile();
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "message_${profile.id}" ORDER BY "timestamp"`);
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

export async function queryLastMessage() {
    const profile = await IMTP.getInstance().getProfile();
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "message_${profile.id}" ORDER BY "timestamp" DESC limit 1`);
    return results.rows.item(0);
}

export async function addMessage(message, callback) {
    const profile = await IMTP.getInstance().getProfile();
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`INSERT into "message_${profile.id}" VALUES (?,?,?,?,?,?)`,
        [message.id, message.state, message.timestamp, message.profile_id, message.is_send, message.content],
    );
    if (callback) {
        callback(message);
    }
}