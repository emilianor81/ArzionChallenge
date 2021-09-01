const server = require('./src/app.js');
const { conn, Deposito } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const WH01 = Deposito.create({
      name: 'Buenos Aires',
      id: 1,
      limite:200,
      stock: 0,
      direccion: 'C1063 CABA'
    });
    const WH02 = Deposito.create({
      name: 'Rosario',
      id: 2,
      limite: 70,
      stock: 0,
      direccion: 'Junín 501, S2000 Rosario, Santa Fe'

    });
    const WH03 = Deposito.create({
      name: 'Córdoba',
      id: 3,
      limite:150,
      stock: 0,
      direccion: 'Av. Vélez Sarsfield 361, X5000JJD Córdoba'

    });
    const WH04 = Deposito.create({
      name: 'Trelew',
      id: 4,
      limite:140,
      stock: 0,

      direccion: 'Rivadavia 390, Trelew, Chubut'

    });
    const WH05 = Deposito.create({
      name: 'Mendoza',
      id: 5,
      limite: 150,
      stock: 0,
      direccion: 'Gral. Espejo 300, M5502 AVJ, Mendoza'

    });
    const WH06 = Deposito.create({
      name: 'La Plata',
      id: 6,
      limite: 100,
      stock: 0,
      direccion: 'Paseo del Bosque s/n, B1900 La Plata, Provincia de Buenos Aires'

    });
    const WH07 = Deposito.create({
      name: 'San Miguel de Tucumán',
      id: 7,
      limite:120,
      stock: 0,

      direccion: 'IEC, Congreso de Tucumán 141, T4000 San Miguel de Tucumán, Tucumán'
    });
    const WH08 = Deposito.create({
      name: 'Mar del Plata',
      id: 8,
      limite:180,
      stock: 0,
      direccion: 'Mar del Plata, Provincia de Buenos Aires'
    });
    const WH09 = Deposito.create({
      name: 'Salta',
      id: 9,
      limite:140,
      stock: 0,

      direccion: 'Caseros 500, Salta'
    });
    const WH10 = Deposito.create({
      name: 'Santa Fe',
      id: 10,
      limite: 70,
      stock: 0,

      direccion: 'Col. Cavour, Santa Fe'
    });
    Promise.all([WH01, WH02, WH03, WH04,
      WH05, WH06, WH07, WH08, WH09, WH10])
      .then(res => console.log('Depositos created'))
  });
});