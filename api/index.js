const server = require('./src/app.js');
const { conn, Deposito } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const WH01 = Deposito.create({
      name: 'Buenos Aires',
      id: 1,
      limite:200
    });
    const WH02 = Deposito.create({
      name: 'Rosario',
      id: 2,
      limite: 70
    });
    const WH03 = Deposito.create({
      name: 'Córdoba',
      id: 3,
      limite:150
    });
    const WH04 = Deposito.create({
      name: 'Trelew',
      id: 4,
      limite:140
    });
    const WH05 = Deposito.create({
      name: 'Mendoza',
      id: 5,
      limite: 150
    });
    const WH06 = Deposito.create({
      name: 'La Plata',
      id: 6,
      limite: 100
    });
    const WH07 = Deposito.create({
      name: 'San Miguel de Tucumán',
      id: 7,
      limite:120
    });
    const WH08 = Deposito.create({
      name: 'Mar del Plata',
      id: 8,
      limite:180
    });
    const WH09 = Deposito.create({
      name: 'Salta',
      id: 9,
      limite:140
    });
    const WH10 = Deposito.create({
      name: 'Santa Fe',
      id: 10,
      limite: 70
    });
    Promise.all([WH01, WH02, WH03, WH04,
      WH05, WH06, WH07, WH08, WH09, WH10])
      .then(res => console.log('Depositos created'))
  });
});