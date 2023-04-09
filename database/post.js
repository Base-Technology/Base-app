import SQLite from './sqlite';
import uuid from 'react-native-uuid';
import moment from 'moment';

export async function queryPost(callback) {
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "post" ORDER BY "timestamp"`);
    const posts = [];
    for (let i = 0; i < results.rows.length; i++) {
        const post = results.rows.item(i);
        posts.push(post);
    }
    if (callback) {
        callback(posts);
    }
    return posts;
}
export async function addPost(post, callback) {
    const sqlite = SQLite.getInstance();
    // TODO: mock data
    post.id = uuid.v4();
    post.state = 0;
    post.timestamp = moment().valueOf();
    post.profile_id = '0x123';
    post.is_send = 1;
    const results = await sqlite.executeSql(`INSERT into "post" VALUES (?,?,?,?,?,?)`,
        [post.id, post.state, post.timestamp, post.profile_id, post.is_send, post.content],
    );
    if (callback) {
        callback(post);
    }
}