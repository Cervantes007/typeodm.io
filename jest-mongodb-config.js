module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.1.10', // Version of MongoDB
            skipMD5: true
        },
        autoStart: false
    }
};
