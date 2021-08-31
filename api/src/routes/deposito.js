const { Router } = require('express');
const {Deposito} = require('../db');
require('dotenv').config();
const {API_KEY } = process.env;
const router = Router();

const addShipping = router.post('/', async (req, res)=>{
   const {destino}=req.body
    try{
        const depositos = await Deposito.findAll();
        console.log(depositos[0].direccion)
        console.log(depositos[1].direccion)
        let origen = depositos[0].direccion;
        let destino = depositos[1].direccion;
        // const distancia = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&destinations=${destino}&origins=${origen}`);
        // console.log(distancia, 'distancia entre origen y primer deposito')
           // https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&destinations=${destino}&origins=37.50630334%2C15.11786942
           res.send(depositos)

    }
    catch(err){
        res.send(err)
    }
});

module.exports = addShipping

//traer todas las direcciones de cada deposito y el limite que tiene actual => en un objeto, CON UN FINDALL
// hacer un for por cada una de los depositos para ver cual es el mas cercano,
// calcular con la api de la distancia de cada uno de esos depositos y ponerlo en un array


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
