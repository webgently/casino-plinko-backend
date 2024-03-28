import { MongoClient } from 'mongodb';

import config from '../config.json'
import { setlog } from '../helper';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db(config.database);
export const DEFAULT_GAMEID = 1

export const DUsers = db.collection<SchemaUser>('users');

const lastIds = {
    lastHistoryId: 0,
    lastUserId: 0
}

export const connect = async () => {
    try {
        await client.connect();
        const d1 = await DUsers.aggregate([{ $group: { _id: null, max: { $max: "$_id" } } }]).toArray();
        lastIds.lastUserId = d1?.[0]?.max || 0

        return true
    } catch (error) {
        setlog('mongodb-initialization', error)
        return error
    }
}

export const addUser = async (name: string, user_id: string, balance: number, img: string) => {
    try {
        await DUsers.insertOne({
            _id: ++lastIds.lastUserId,
            userId: user_id,
            username: name,
            balance,
            img,
        })
        return true
    } catch (error) {
        setlog('addUser', error)
        return false
    }
}

export const updateUserBalance = async (userId: string, balance: number) => {
    try {
        await DUsers.updateOne({ userId }, { $set: { balance } });
        return true
    } catch (error) {
        setlog('updateUserBalance', error)
        return false
    }
}