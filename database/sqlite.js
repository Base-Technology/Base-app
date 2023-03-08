import SQLiteStorage from 'react-native-sqlite-storage';
import sql from 'react-native-sqlite-storage';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

const database_name = "base.db";
const database_version = "1.0";
const database_displayname = "Base";
const database_size = -1;

export default class SQLite {

    static db;

    static getInstance() {
        return new SQLite();
    }

    async open() {
        if (SQLite.db) {
            return SQLite.db;
        }

        sql.enablePromise(true);
        SQLite.db = await SQLiteStorage.openDatabase(
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
        return SQLite.db;
    }

    async initDatabase() {
        await this.executeSql(`CREATE TABLE IF NOT EXISTS "message" (
            "id" text NOT NULL,
            "state" integer,
            "timestamp" DATE,
            "profile_id" text,
            "is_send" integer,
            "content" text,
            PRIMARY KEY ("id")
          )`);
        await this.executeSql(`CREATE TABLE IF NOT EXISTS "profile" (
            "id" text NOT NULL,
            "private_key" TEXT,
            PRIMARY KEY ("id")
          )`);

        // TODO: insert test data
        await this.insertTestData();
    }

    async insertTestData() {
        const messageCount = await this.executeSql(`SELECT count(*) AS count FROM "message"`);
        if (messageCount.rows.item(0).count == "0") {
            await this.executeSql(`INSERT INTO "message" VALUES ('0', 0, 1677594062000, '0x123', 0, 'Hello?')`);
            await this.executeSql(`INSERT INTO "message" VALUES ('1', 0, 1677594062001, '0x123', 1, 'Hello!')`);
            await this.executeSql(`INSERT INTO "message" VALUES ('2', 0, 1677594062001, '0x123', 0, 'Metting?')`);
            await this.executeSql(`INSERT INTO "message" VALUES ('3', 0, 1677594062001, '0x123', 1, 'Metting!')`);
            await this.executeSql(`INSERT INTO "message" VALUES ('4', 0, 1677594062002, '0x123', 0, 'An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label?')`);
            await this.executeSql(`INSERT INTO "message" VALUES ('5', 0, 1677594062002, '0x123', 1, 'An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label!')`);
        }
        const profileCount = await this.executeSql(`SELECT count(*) AS count FROM "profile"`);
        if (profileCount.rows.item(0).count == "0") {
            console.log(`start to genreate private key, please wait`);
            const privateKey = ethers.Wallet.createRandom().privateKey;
            console.log(`generate private key completed, the key is ${privateKey}`);
            this.executeSql(`INSERT INTO "profile" VALUES ('0x111', ?)`, [privateKey]);
        }
    }

    async executeSql(sql, params) {
        if (!SQLite.db) {
            await this.open();
        }
        const result = await SQLite.db.executeSql(sql, params);
        return result[0];
    }

    async close() {
        if (SQLite.db) {
            await SQLite.db.close();
            console.log(`sqlite close success`);
        } else {
            console.log(`sqlite not open`);
        }
        SQLite.db = null;
    }
};