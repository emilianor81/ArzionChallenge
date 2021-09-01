const { Router } = require('express');
const {Deposito} = require('../db');
const axios = require('axios');
// const router = Router();
const express = require('express');


require('dotenv').config();
const {API_KEY} = process.env;

const router = Router();

const addShipping = router.post('/', async (req, res)=>{
   const {destino}=req.body
   let ArrayDepositosDistancias = [];
    try{
        const depositos = await Deposito.findAll();
        for(i = 0; i < depositos.length ; i++){
            let direccion = depositos[i].dataValues.direccion
            let nombre = depositos[i].dataValues.name
            let limite = depositos[i].dataValues.limite
            let id = depositos[i].dataValues.id
            let stock = depositos[i].dataValues.stock
        //     //hacer un string concat con todas las direcciones de depositos y | para hacer una sola llamada a la api
        // let direccion = direccion1 + '|'
        //     //calculo la distancia entre el destino del paquete y cada uno de los depositos y lo guardo en un array para poder tener los datos que necesito
         const distanciaADeposito = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&destinations=${destino}&origins=${direccion}`);
         let distancia = distanciaADeposito.data.rows[0].elements[0].distance.text; 
         distancia = parseInt(distancia.split(''));
         console.log(distancia)
         const NuevaDistancia = {id, nombre, limite, direccion, stock, distancia };
         ArrayDepositosDistancias.push(NuevaDistancia)
          }
          ArrayDepositosDistancias.sort((a, b) => {return a.distancia - b.distancia}); // --> 3, 12, 23
          console.log(ArrayDepositosDistancias)
          //UNA VEZ QUE TENGO TODO ORDENADO POR DISTANCIA, RECORRO Y PREGUNTO SI TIENE MENOS DEL 95% OCUPACION
        ArrayDepositosDistancias?res.send('hola'):res.send('no se encontro la localidad de destino')
    }
    catch(err){
        res.send('err')
    }
});

module.exports = addShipping;

  
