import mongoose from 'mongoose';

export default (dbUrl: string) => {
    const connect = () => {
        return mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected to database');
        }).catch((err) => {
            console.error('Unable to connect to mongodb');
            console.error(err);
            return process.exit(1);
        });
    };

    connect().then(() => {
        mongoose.connection.on('disconnected', connect);
    });
    
};
