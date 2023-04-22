import SQLiteStorage from 'react-native-sqlite-storage';
import sql from 'react-native-sqlite-storage';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { profiles } from '../constants/imtp';

const database_name = "base.db";
const database_version = "1.0";
const database_displayname = "Base";
const database_size = -1;

export default class SQLite {

    static instance;

    static getInstance() {
        if (!SQLite.instance) {
            SQLite.instance = new SQLite();
        }
        return SQLite.instance;
    }

    async open() {
        if (!this.openCompleted) {
            this.openCompleted = true;

            sql.enablePromise(true);
            this.db = await SQLiteStorage.openDatabase(
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

            await this.initDatabase();
        }
    }

    async initDatabase() {
        await this.executeSql(`CREATE TABLE IF NOT EXISTS "profile" (
            "id" text NOT NULL,
            "private_key" TEXT,
            "address" TEXT,
            PRIMARY KEY ("id")
          )`);
        await this.executeSql(`CREATE TABLE IF NOT EXISTS "identity" (
            "mail" text NOT NULL,
            "password" text NOT NULL,
            PRIMARY KEY ("mail")
          )`);

        // TODO: insert test data
        // await this.insertTestData();
    }

    async insertTestData() {
        profiles.forEach((profile) => {
            this.executeSql(`CREATE TABLE IF NOT EXISTS "message_${profile.id}" (
                "id" text NOT NULL,
                "state" integer,
                "timestamp" DATE,
                "profile_id" text,
                "is_send" integer,
                "content" text,
                PRIMARY KEY ("id")
              )`);
            this.executeSql(`INSERT OR IGNORE INTO "profile" VALUES (?, ?, ?)`, [profile.id, profile.private_key, profile.address]);
        })
    }

    async executeSql(sql, params) {
        if (!this.openCompleted) {
            await this.open();
        }
        const result = await this.db.executeSql(sql, params);
        return result[0];
    }

    async close() {
        if (this.openCompleted) {
            await this.db.close();
            console.log(`sqlite close success`);
        } else {
            console.log(`sqlite not open`);
        }
        this.db = null;
    }
};