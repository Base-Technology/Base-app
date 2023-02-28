import SQLiteStorage from 'react-native-sqlite-storage';

const database_name = "base.db";
const database_version = "1.0";
const database_displayname = "Base";
const database_size = -1;

export default class SQLite {

    static db;

    static getInstance() {
        return new SQLite();
    }

    open() {
        if (SQLite.db) {
            return SQLite.db;
        }

        SQLite.db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                console.log(`sqlite open success`);
            },
            (err) => {
                console.log(`sqlite open failed: ${err}`);
            });

        this.initDatabase();
        return SQLite.db;
    }

    initDatabase() {
        sql = `CREATE TABLE IF NOT EXISTS "message" (
            "id" text NOT NULL,
            "state" integer,
            "timestamp" DATE,
            "profile_id" text,
            "is_send" integer,
            "content" text,
            PRIMARY KEY ("id")
          )`;
        this.executeSql(sql);
    }

    executeSql(sql, params, callback) {
        if (!SQLite.db) {
            this.open();
        }

        SQLite.db.transaction((tx) => {
            tx.executeSql(sql, params, callback);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log(`sql: ${sql}, params: ${params} execute success`)
        });
    }

    close() {
        if (SQLite.db) {
            SQLite.db.close();
            console.log(`sqlite close success`);
        } else {
            console.log(`sqlite not open`);
        }
        SQLite.db = null;
    }
};