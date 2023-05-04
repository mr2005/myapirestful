import express from 'express';
import propiedadesRoutes from './routes/propiedades.routes.js';
import {PORT} from './config.js';
import cors from 'cors';

const app = express();


app.use(express.json());

app.use(cors({
    origin: '*'
}
));

//CONFIGURAR RUTA Y ARCHIVO DE RUTAS
app.use('/api', propiedadesRoutes);


//BLOQUEAR EL RESTO DE SOLICITUDES
app.use ((req, res, next) => {
    res.status(404).json({
        message: 'Recurso no encontrado, revise su petición'
    })
})


app.listen(PORT);
console.log('El servidor se está ejecutando en el puerto', PORT);