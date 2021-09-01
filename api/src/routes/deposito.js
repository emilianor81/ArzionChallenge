const { Router } = require('express');
const {Deposito} = require('../db');
require('dotenv').config();
const {API_KEY} = process.env;

const router = Router();
var distance = {
    "destination_addresses" : [ "s2000, Junín 501, S2000 Rosario, Santa Fe, Argentina" ],
    "origin_addresses" : [ "C1063 CABA, Argentina" ],
    "rows" : [
       {
          "elements" : [
             {
                "distance" : {
                   "text" : "302 km",
                   "value" : 302224
                },
                "duration" : {
                   "text" : "3h 35 min",
                   "value" : 12874
                },
                "status" : "OK"
             }
          ]
       }
    ],
    "status" : "OK"
 }

const addShipping = router.post('/', async (req, res)=>{
   const {destino}=req.body
   let ArrayDistancias = [];
    try{
        const depositos = await Deposito.findAll();
        for(i = 0; i < depositos.length ; i++){
            let direccion = depositos[i].dataValues.direccion
            let nombre = depositos[i].dataValues.name
            let limite = depositos[i].dataValues.limite
            let id = depositos[i].dataValues.id
            const NuevaDistancia = {nombre, limite, direccion };
            //hacer un string concat con todas las direcciones de depositos y | para hacer una sola llamada a la api
            //calculo la distancia entre el destino del paquete y cada uno de los depositos y lo guardo en un array para poder tener los datos que necesito
            const distanciaADeposito = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&destinations=${destino}&origins=${direccion}`);
         const NuevaDistancia = {nombre, limite, direccion , distanciaADeposito};
         ArrayDistancias.push(NuevaDistancia)
          }
        ArrayDistancias.sort((a, b) => {return a.distanciaADeposito - b.distanciaADeposito}); // --> 3, 12, 23
        //UNA VEZ QUE TENGO TODO ORDENADO POR DISTANCIA, RECORRO Y PREGUNTO SI TIENE MENOS DEL 95% OCUPACION

        ArrayDistancias.forEach(e=> {
            if(e.stock < e.limite* 0.95){
                const deposito = await Deposito.findByPk(e.id)
                await deposito.update({
                    stock: stock - 1
                })
                return deposito
            }else{

            }
        })

        
        // ArrayDistancias.sort((a, b) => {return b.limite - a.limite}); // --> 3, 12, 23
        console.log(ArrayDistancias)
        res.json(distance.rows[0].elements[0].distance.text)
        //una vez que tenga la distancia del destino a cada deposito, comprobar que el deposito no haya llegado al limite. de 95%,
        // si el deposito llego al limite de 95% hay que hacer el calculo de que conviene, haciendo la multiplicacion por cada km extra o la multa

        // si llego al limite, enviar al mas cercano


    }
    catch(err){
        res.send(err)
    }
});

module.exports = addShipping

    // https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&destinations=${destino}&origins=37.50630334%2C15.11786942
//    https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101,-73.89188969999998&destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyAYwym2fI_Ums6pVrpDAVyLv9ZqTPoeyr0
//ver donde esta el destino mas cercano de lo que tengo en la BD de depositos

    // console.log('22',req.body)
    // const {id , title, city, description, adress, picture} = req.body
    // const newRestaurant = { id: id, nombre: title, descripcion: description, ciudad: city, direccion: adress, foto: picture }
    // console.log('23',newRestaurant)

    // try{
    //     const createRestaurant= await Restaurant.create(newRestaurant)
    //     res.send(newRestaurant)
    //     console.log(createRestaurant)
    // }
    // catch(err){
    //     res.send(err)
    // }

// })


// var distance = require('google-distance-matrix');

// var origins = ['San Francisco CA', '40.7421,-73.9914'];
// var destinations = ['New York NY', 'Montreal', '41.8337329,-87.7321554', 'Honolulu'];

// distance.key('<Your API key here>');
// distance.units('imperial');

// distance.matrix(origins, destinations, function (err, distances) {
//     if (err) {
//         return console.log(err);
//     }
//     if(!distances) {
//         return console.log('no distances');
//     }
//     if (distances.status == 'OK') {
//         for (var i=0; i < origins.length; i++) {
//             for (var j = 0; j < destinations.length; j++) {
//                 var origin = distances.origin_addresses[i];
//                 var destination = distances.destination_addresses[j];
//                 if (distances.rows[0].elements[j].status == 'OK') {
//                     var distance = distances.rows[i].elements[j].distance.text;
//                     console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
//                 } else {
//                     console.log(destination + ' is not reachable by land from ' + origin);
//                 }
//             }
//         }
//     }
// });
