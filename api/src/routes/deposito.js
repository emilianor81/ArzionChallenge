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
   //declaro el array que me sirvara para cargar los datos que necesito de cada deposito para poder hacer los calculos
   let ArrayDepositosDistancias = [];
    try{
        //me traigo los datos de la tabla depositos
        const depositos = await Deposito.findAll();
        for(i = 0; i < depositos.length ; i++){
            let direccion = depositos[i].dataValues.direccion
            let nombre = depositos[i].dataValues.name
            let limite = depositos[i].dataValues.limite
            let id = depositos[i].dataValues.id
            let stock = depositos[i].dataValues.stock
            //hacer un string concat con todas las direcciones de depositos y | para hacer una sola llamada a la api
            // let direccion = direccion1 + '|'
            //calculo la distancia entre el destino del paquete y cada uno de los depositos y lo guardo en un array para poder tener los datos que necesito
            const distanciaADeposito = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&destinations=${destino}&origins=${direccion}`);
            let distancia = distanciaADeposito.data.rows[0].elements[0].distance.text; 
            distancia = distancia.split(' ')
            distancia = distancia[0];
            distancia = distancia.replace(/,/g, '')
            distancia = parseInt(distancia)
            //Cargo todos los datos que necesito en el array, incluida la distancia entre cada deposito y el destino del paquete
            const NuevaDistancia = {id, nombre, limite, direccion, stock, distancia };
            ArrayDepositosDistancias.push(NuevaDistancia)
          }
          //ordeno el array en forma ascendente por la distancia el deposito hasta el destino del paquete
          ArrayDepositosDistancias.sort((a, b) => {return a.distancia - b.distancia}); 
          //Recorro el array para ver en que deposito me conviene enviar el paquete
          for(let i = 0 ; i < ArrayDepositosDistancias.length ; i++){
              //calculo la variable para la alerta, para ver si esta disponible ese deposito o tengo que enviar a otro, o pagar la multa
              let alerta = Math.ceil(ArrayDepositosDistancias[i].limite * 0.95)
              //compruebo si cada uno de los depositos tiene espacio para un paquete mas, recorriendo de acuerdo la distancia mas optima
              if(ArrayDepositosDistancias[i].stock < alerta){
                  // si entra a este if automaticamente lo guardo ahi y corto la ejecucion, previo actualizar el stock
                  let id = ArrayDepositosDistancias[i].id
                  let stock = ArrayDepositosDistancias[i].stock
                const depositoAmodificar = await Deposito.findByPk(id)
                await depositoAmodificar.update({stock: stock + 1})
                 return res.json(ArrayDepositosDistancias[i])
              }else{
                  if (ArrayDepositosDistancias[i+1].distancia > 350){
                    //este es el caso que me conviene pagar la multa
                    let id1 = ArrayDepositosDistancias[i].id
                    let stock = ArrayDepositosDistancias[i].stock
                    const depositoAmodificar = await Deposito.findByPk(id1)
                    await depositoAmodificar.update({stock: stock + 1})
                    return res.json(ArrayDepositosDistancias[i+1])

                  }else{
                    //en este caso me conviene enviar al mas cercano
                    let ids2 = ArrayDepositosDistancias[i+1].id
                    let stock = ArrayDepositosDistancias[i+1].stock
                  const depositoAmodificar = await Deposito.findByPk(ids2)
                  await depositoAmodificar.update({stock: stock + 1})
                   return res.json(ArrayDepositosDistancias[i])
                  }
              }
          }
    }
    catch(err){
        res.send('err')
    }
});

module.exports = addShipping;

  
