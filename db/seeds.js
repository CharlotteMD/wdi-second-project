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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJ0vChs3832q2VzcowZ-6FVvBdz-YXADLLcyzoCHB3zW7Gf6rGQ'
  },{
    firstName: 'Ameelah',
    lastName: 'Qazi',
    email: 'meela@gmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BiTvVTD-Z-HIp8fTYVup1Cgyt8Mu7lABvQkJ7iirU1-L4Wi2'
  },{
    firstName: 'Callie',
    lastName: 'Jones',
    email: 'callie@hotmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktdpqq93bqVmiIuozLHHj2sEpFEtz0HdKaqaPw1TgMZuh06tGKA'
  },{
    firstName: 'Kate',
    lastName: 'Barnes',
    email: 'kate@btinternet.com',
    password: 'password',
    image: 'https://static.pexels.com/photos/89779/girl-rustic-grass-meadow-89779.jpeg'
  },{
    firstName: 'Sunshine',
    lastName: 'Liu',
    email: 'liu.sun@yahoo.com',
    password: 'password',
    image: 'https://static.pexels.com/photos/157023/pexels-photo-157023.jpeg'
  },{
    firstName: 'Shawn',
    lastName: 'Patel',
    email: 'shawn@yahoo.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsK364TD-EX7IK3smMyhq5GZKg-rAxfFeGVPeWwdz7MOl5Gk6mA'
  },{
    firstName: 'Kelly',
    lastName: 'Jonsdottir',
    email: 'kelz@gmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc4JoL55tY3P1ye2gWyFWkN1UJJPa926cOXJFKPFr0DXZomc-7vg'
  },{
    firstName: 'Lucy',
    lastName: 'Wales',
    email: 'lucy@hotmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZSUdCaGeUSXHpdve0SSpbKIms7W0xLt29H947oVPUcrpADVXCNw'
  },{
    firstName: 'Hussein',
    lastName: 'Akhtar',
    email: 'h.akhtar@gmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9sAfZIQgABL6AjAi-1K1NVDct5hHN0F4c7MoL_9o_u0ZWQbAO'
  },{
    firstName: 'Alfred',
    lastName: 'Carter',
    email: 'alf@ga.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdePF1usB9IO7F6cIwDh3Ma9-L9VFlLLkrG7NkFN0o4nH_LUm'
  },{
    firstName: 'James',
    lastName: 'Harrison',
    email: 'jamie@hotmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS6gvma6fEZoc286seByGF7a-twmfvNVi0ryIZ8e4FtCaJyR9YMw'
  },{
    firstName: 'Mike',
    lastName: 'Louis',
    email: 'm.louis@gmail.com',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTBExWnX5B3aSSIYdAc7LX5MR6sK8t4pnVjmIJGBX8bn6ioWuv'
  },{
    firstName: 'Harrison',
    lastName: 'Andrews',
    email: 'hazza@gmail.com',
    password: 'password',
    image: 'https://static.pexels.com/photos/428341/pexels-photo-428341.jpeg'
  },{
    firstName: 'Jake',
    lastName: 'McCartney',
    email: 'jm@hotmail.co.uk',
    password: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nDJinn_fGfgLjMsHD-Vd4lbCz9HcEFekvum4DoPTrWM_vNpxTw'
  },{
    firstName: 'Sharon',
    lastName: 'Stuart',
    email: 'sharon@hotmail.com',
    password: 'password',
    image: 'https://static.pexels.com/photos/733872/pexels-photo-733872.jpeg'
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
