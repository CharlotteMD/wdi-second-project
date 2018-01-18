const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Wedding = require('../models/wedding');
const User = require('../models/user');

Wedding.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Meghan',
    lastName: 'Morgan',
    email: 'megz@hotmail.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Ameelah',
    lastName: 'Qazi',
    email: 'meela@gmail.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Callie',
    lastName: 'Jones',
    email: 'callie@hotmail.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Kate',
    lastName: 'Barnes',
    email: 'kate@btinternet.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Sunshine',
    lastName: 'Liu',
    email: 'liu.sun@yahoo.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Shawn',
    lastName: 'Patel',
    email: 'shawn@yahoo.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Kelly',
    lastName: 'Jonsdottir',
    email: 'kelz@gmail.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Lucy',
    lastName: 'Wales',
    email: 'lucy@hotmail.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Hussein',
    lastName: 'Akhtar',
    email: 'h.akhtar@gmail.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  },{
    firstName: 'Alfred',
    lastName: 'Carter',
    email: 'alf@ga.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Wedding
      .create([{
        ref: '5632',
        createdBy: users[0].id,
        partner1: 'Meghan',
        partner2: 'Harry',
        date: '19/05/2018',
        venue: 'Kensington Palace',
        imageMain: 'http://www.telegraph.co.uk/content/dam/news/2017/11/27/TELEMMGLPICT000147760164_1_trans_NvBQzQNjv4BqV3C1UnCI5Mv8_2dPMNAOY8ANH7Gr-PkkbrviVOit6VE.jpeg?imwidth=450',
        guests: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
        questions: [{
          content: 'what is cool?',
          createdBy: users[1].id,
          answers: [{
            answer: 'rane',
            createdBy: users[0].id
          }]
        }]
      },{

      }]);
  })
  .then((weddings) => console.log(`${weddings.length} weddings created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
