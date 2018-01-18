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
    lastName: 'Markle',
    email: 'megz@royals.com',
    password: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Meghan_Markle_3441.jpg'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Wedding
      .create([{
        ref: '5632',
        // createdBy: ,
        partner1: 'Meghan',
        partner2: 'Harry',
        date: '19/05/2018',
        venue: 'Kensington Palace',
        imageMain: 'http://www.telegraph.co.uk/content/dam/news/2017/11/27/TELEMMGLPICT000147760164_1_trans_NvBQzQNjv4BqV3C1UnCI5Mv8_2dPMNAOY8ANH7Gr-PkkbrviVOit6VE.jpeg?imwidth=450',
        guests: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
        questions: [ questionSchema ]
      },{
        
      }]);
  })
  .then((weddings) => console.log(`${weddings.length} weddings created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
