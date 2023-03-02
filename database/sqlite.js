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

        // TODO: insert test data
        this.executeSql(`select count(*) as count from "message"`, [], (tx, results) => {
            if (results.rows.item(0).count == "0") {
                this.insertTestData();
            }
        })
    }

    insertTestData() {
        this.executeSql(`INSERT INTO "message" VALUES ('0', 0, 1677594062000, '0x123', 0, 'Hello?')`);
        this.executeSql(`INSERT INTO "message" VALUES ('1', 0, 1677594062001, '0x123', 1, 'Hello!')`);
        this.executeSql(`INSERT INTO "message" VALUES ('2', 0, 1677594062001, '0x123', 0, 'Metting?')`);
        this.executeSql(`INSERT INTO "message" VALUES ('3', 0, 1677594062001, '0x123', 1, 'Metting!')`);
        this.executeSql(`INSERT INTO "message" VALUES ('4', 0, 1677594062002, '0x123', 0, 'An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label?')`);
        this.executeSql(`INSERT INTO "message" VALUES ('5', 0, 1677594062002, '0x123', 1, 'An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label!')`);
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