import express, {request} from 'express';
import { deleteActivities, insertActivities, listActivities, updateActivities } from './controller/ActivitiesController.js';
import { deleteVehicles, insertVehicles, listVehicles, updateVehicles } from './controller/VehiclesController.js';
import { openDatabase } from './database.js';

const app = express();


app.use(express.json());
app.get('/api/ping', (request,response) => {
    response.send({
        message: "pong"
    })
}
)


//Endpoints veiculos

app.get('/api/vehicles', listVehicles)

app.post('/api/vehicles', insertVehicles)

app.put('/api/vehicles/:id', updateVehicles)

app.delete('/api/vehicles/:id', deleteVehicles)

//Endpoints atividades

app.get('/api/activities', listActivities);

app.post('/api/activities/checkin', insertActivities);

app.delete('/api/activities/:id', deleteActivities);

app.put('/api/activities/checkout', updateActivities);
app.listen(8000 , () => {
    console.log("Olá servidor")
})

