const { Types } = require('mongoose');

const admin = {
  _id: new Types.ObjectId('64a9f40167f14d75a521e1f0'),
  email: 'admin@vai.com',
  password: '$2a$10$MQXuzDnheYvK2FJJsuT.EuobxLeaGg2hXh.SLlUdRHQIV7tHAyc7C',
  role: 'ADMIN',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  async up(db) {
    return db.collection('users').insertOne(admin);
  },

  async down(db) {
    return db.collection('users').deleteOne({ _id: admin._id });
  },
};
