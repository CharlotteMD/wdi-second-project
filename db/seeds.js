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
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJ0vChs3832q2VzcowZ-6FVvBdz-YXADLLcyzoCHB3zW7Gf6rGQ'
  },{
    firstName: 'Ameelah',
    lastName: 'Qazi',
    email: 'meela@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BiTvVTD-Z-HIp8fTYVup1Cgyt8Mu7lABvQkJ7iirU1-L4Wi2'
  },{
    firstName: 'Callie',
    lastName: 'Jones',
    email: 'callie@hotmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktdpqq93bqVmiIuozLHHj2sEpFEtz0HdKaqaPw1TgMZuh06tGKA'
  },{
    firstName: 'Kate',
    lastName: 'Barnes',
    email: 'kate@btinternet.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://static.pexels.com/photos/89779/girl-rustic-grass-meadow-89779.jpeg'
  },{
    firstName: 'Sunshine',
    lastName: 'Liu',
    email: 'liu.sun@yahoo.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://static.pexels.com/photos/157023/pexels-photo-157023.jpeg'
  },{
    firstName: 'Shawn',
    lastName: 'Patel',
    email: 'shawn@yahoo.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsK364TD-EX7IK3smMyhq5GZKg-rAxfFeGVPeWwdz7MOl5Gk6mA'
  },{
    firstName: 'Kelly',
    lastName: 'Jonsdottir',
    email: 'kelz@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc4JoL55tY3P1ye2gWyFWkN1UJJPa926cOXJFKPFr0DXZomc-7vg'
  },{
    firstName: 'Lucy',
    lastName: 'Wales',
    email: 'lucy@hotmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZSUdCaGeUSXHpdve0SSpbKIms7W0xLt29H947oVPUcrpADVXCNw'
  },{
    firstName: 'Hussein',
    lastName: 'Akhtar',
    email: 'h.akhtar@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9sAfZIQgABL6AjAi-1K1NVDct5hHN0F4c7MoL_9o_u0ZWQbAO'
  },{
    firstName: 'Alfred',
    lastName: 'Carter',
    email: 'alf@ga.com',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdePF1usB9IO7F6cIwDh3Ma9-L9VFlLLkrG7NkFN0o4nH_LUm'
  }])
  .then(users => {
    console.log(`${users.length} users created 🎉`);
    return Wedding
      .create([{
        ref: '5632',
        createdBy: users[0],
        partner1: 'Meghan',
        partner2: 'Jake',
        venue: 'Brackenbury Manor',
        imageMain: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMAHRkcnkQuQ-Uk7jiE8WSLCdBeDNohvZ4D44lChOtOTIgnsHtw',
        // guests: [users[0], users[1], users[3], users[5], users[7], users[9], users[12]],
        questions: [{
          content: 'What should we call our first child?',
          createdBy: users[1],
          answers: [{
            comment: 'Alice',
            createdBy: users[3]
          },{
            comment: 'Jasmine',
            createdBy: users[5]
          },{
            comment: 'Henry - name him after Grandad!',
            createdBy: users[7]
          },{
            comment: 'Harrison',
            createdBy: users[9]
          }]
        },{
          content: 'Where should we honeymoon?',
          createdBy: users[0],
          answers: [{
            comment: 'The Bahamas - we went there last Christmas and it was amazing!',
            createdBy: users[1]
          },{
            comment: 'You cant beat Paris for Romance',
            createdBy: users[9]
          },{
            comment: 'Italy',
            createdBy: users[0]
          }]
        },{
          content: 'Who would win in a fight?',
          createdBy: users[9],
          answers: [{
            comment: 'Meg!',
            createdBy: users[9]
          },{
            comment: 'Megsy! Good luck mate!',
            createdBy: users[3]
          },{
            comment: 'Jake can try..',
            createdBy: users[7]
          }]
        },{
          content: 'What advice would you give to make a marriage work?',
          createdBy: users[1],
          answers: [{
            comment: 'Happy wife, happy life',
            createdBy: users[9]
          },{
            comment: 'Communicate',
            createdBy: users[7]
          },{
            comment: 'Keep dating',
            createdBy: users[5]
          }]
        }]
      },{
        ref: '9451',
        createdBy: users[4],
        partner1: 'Sunshine',
        partner2: 'Harrison',
        venue: 'The Sycamore Hotel',
        imageMain: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqpXpYT45URPV0ofSrbw1q2Z5ApFkzkGo-CD0OL7sj3yUlfAi-',
        questions: [{
          content: 'What songs do you want to hear at the reception?',
          createdBy: users[2],
          answers: [{
            comment: 'Shut Up and Dance - Walk The Moon',
            createdBy: users[4]
          },{
            comment: 'Mr Brightside - The Killers. What. A. TUNE!',
            createdBy: users[9]
          },{
            comment: 'I Gotta Feeling - The Black Eyed Peas',
            createdBy: users[8]
          },{
            comment: 'Livin On A Prayer - Bon Jovi',
            createdBy: users[9]
          },{
            comment: 'Firework - Katy Perry',
            createdBy: users[4]
          },{
            comment: 'Cheerleader - OMI',
            createdBy: users[7]
          },{
            comment: 'Sweet Child O Mine - Guns N Roses',
            createdBy: users[2]
          }]
        },{
          content: 'How should Sunshine & Harrison celebrate their first anniversary?',
          createdBy: users[8],
          answers: [{
            comment: 'Dont forget flowers - Harrison!',
            createdBy: users[9]
          },{
            comment: 'You cant beat Paris!',
            createdBy: users[4]
          },{
            comment: 'Its paper so buy her a notepad!',
            createdBy: users[7]
          }]
        },{
          content: 'Who can eat more jaffa cakes?',
          createdBy: users[9],
          answers: [{
            comment: 'Sunny!',
            createdBy: users[9]
          },{
            comment: 'Hazza gives it his best shot!',
            createdBy: users[2]
          }]
        }]
      },{
        ref: '9526',
        createdBy: users[7],
        partner1: 'Lucy',
        partner2: 'Heather',
        venue: 'Hathaway Hall',
        imageMain: 'https://static.pexels.com/photos/260141/pexels-photo-260141.jpeg',
        questions: [{
          content: 'Whose Mum will be first on the dance floor?',
          createdBy: users[0],
          answers: [{
            comment: 'Maggie has some stylish moves! I hope its her! Save me a dance, Mags!',
            createdBy: users[2]
          },{
            comment: 'Its gotta be Mrs Mitch!',
            createdBy: users[5]
          }]
        },{
          content: 'Who will be the grumpiest old lady?',
          createdBy: users[3],
          answers: [{
            comment: 'Haha, Lucy!',
            createdBy: users[1]
          },{
            comment: 'Easily Lucy! Sorry Luce!',
            createdBy: users[5]
          }]
        }]
      },{
        ref: '7829',
        createdBy: users[5],
        partner1: 'Shawn',
        partner2: 'Ameera',
        venue: 'St Frances Cloisters',
        imageMain: 'https://cdn.pixabay.com/photo/2017/08/06/18/05/bokeh-2594745_1280.jpg',
        questions: [{
          content: 'How long till Shawn and Ameera start a family?',
          createdBy: users[3],
          answers: [{
            comment: 'I give them a year.',
            createdBy: users[4]
          },{
            comment: 'Soon we hope! Louise and Aaron cant wait to have some cousins!',
            createdBy: users[6]
          }]
        },{
          content: 'Who has the funkiest moves?',
          createdBy: users[3],
          answers: [{
            comment: 'The best man!',
            createdBy: users[5]
          },{
            comment: 'The bridesmaids will give Dave a run for his money!!',
            createdBy: users[8]
          }]
        }]
      },{
        ref: '5634',
        createdBy: users[9],
        partner1: 'Alfie',
        partner2: 'Ben',
        venue: 'Herriot House',
        imageMain: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpQAQPy8Nw6jMFn2jQM7JcRqMZ4m2KJt68C7GDnQadkYTsgOD',
        questions: [{
          content: 'Who will give the best speech?',
          createdBy: users[0],
          answers: [{
            comment: 'The best man, obviously!',
            createdBy: users[4]
          },{
            comment: 'Alfie has been practising but Ben has much better banter!',
            createdBy: users[8]
          }]
        }]
      }]);
  })
  .then(weddings => {
    console.log(`${weddings.length} weddings created 👰🏽🤵🏿`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
