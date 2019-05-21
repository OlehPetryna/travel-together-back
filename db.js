const client = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'travel-together';
const collectionName = 'tours';

class DB {
    constructor() {
        this.client = new client(url, {useNewUrlParser: true});
    }

    async find({query, limit, skip, orderBy}) {
        let findQuery = this.collection().find(query);

        if (limit) {
            findQuery.limit(limit)
        }

        if (skip) {
            findQuery.skip(skip);
        }

        if (orderBy) {
            findQuery.sort(orderBy.key, orderBy.dir);
        }

        return await findQuery.toArray();
    }

    async insert (docs) {
        if (!docs.length) {
            docs = [docs];
        }

        return await this.collection().insertMany(docs);
    }

    collection() {
        return this.db().collection(collectionName);
    }

    db() {
        return this.client.db(dbName);
    }

    async connect() {
        await this.client.connect()
    }
}

module.exports = DB;
