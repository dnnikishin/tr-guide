import 'dotenv/config';
import app from './app';

(async () => app.run())();

// {
//   lastUpdate: Timestamp,
//  places: [{
//   id: Sequelize.INTEGER,
//   address: Sequelize.TEXT,
//   altitude: Sequelize.FLOAT,
//   categoriesIds: [{id: Sequelize.INTEGER},… ],
//   updated: Sequelize.DATE,
//     created: Sequelize.DATE,
//   deleted: Sequelize.DATE
//   description : Sequelize.TEXT,
//     email: Sequelize.TEXT,
//   filesIds: [{id: Sequelize.INTEGER},… ],
//   lat: Sequelize.FLOAT,
//     lng: Sequelize.FLOAT,
//   name: Sequelize.TEXT,
//   phones: [{
//   label: Sequelize.TEXT,
//   value: Sequelize.TEXT
// },… ],
//   price: Sequelize.TEXT,
//     schedule: {},
//   site: Sequelize.TEXT,
//     thumbnailId: Sequelize.INTEGER
// },… ],

//   routes: [{
//     id: Sequelize.INTEGER,
//     categoriesIds: [{id: Sequelize.INTEGER},… ],
  //   updated: Sequelize.DATE,
//     created: Sequelize.DATE,
  //   deleted: Sequelize.DATE
  //   description: Sequelize.TEXT,
//     distance: Sequelize.INTEGER,
  //   name: Sequelize.TEXT,
//   placesInRoute: [{
  //   id: Sequelize.INTEGER,
  //   placeId: Sequelize.INTEGER,
  //   description: Sequelize.TEXT,
  //   order: Sequelize.INTEGER,
  //   updated: Sequelize.DATE,
  //   created: Sequelize.DATE,
  //   deleted: Sequelize.DATE
// },…],

//   thumbnailId: Sequelize.INTEGER,
//     type: Sequelize.ENUM(['prepared', 'thematic']),
// },… ],

//   files: [{
//     id: Sequelize.INTEGER,
//     type: Sequelize.ENUM('image', 'video', 'document'),
//     url: {
//       original: Sequelize.TEXT,
//       thumb: Sequelize.TEXT
//     },
//     updated: Sequelize.DATE,
//     created: Sequelize.DATE,
//     deleted: Sequelize.DATE
//   },… ],

//   categories: [{
//     id: Sequelize.INTEGER,
//     name: Sequelize.TEXT,
//     updated: Sequelize.DATE,
//     created: Sequelize.DATE,
//     deleted: Sequelize.DATE
//   },…]
// }
