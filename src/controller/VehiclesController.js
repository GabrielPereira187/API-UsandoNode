import { openDatabase } from "../database.js";


export const listVehicles = async(request,response) => {
    const db = await openDatabase();
    const vehicles = await db.all('SELECT * FROM vehicles');
    db.close();
    response.send(vehicles)
}

export const insertVehicles = async(request,response) => {
    const db = await openDatabase();
    const vehicles = await db.all('SELECT * FROM vehicles');
    db.close();
    response.send(vehicles)
}

export const updateVehicles = async (request,response) =>{
    const {model,label,type,owner,observation} = request.body;
    const db = await openDatabase();
    const {id} = request.params;

    const vehicle = db.get('select * from vehicles where id=?',[id]);

    if(id){
        const vehicles = await db.run('update vehicles set model = ?, label = ?,type = ?,owner = ?,observation = ? where id = ?',
        [model,label,type,owner,observation,id]);
    }
    db.close();
    response.send(vehicle || {})
}

export const deleteVehicles = async(request,response) => {
    const db = await openDatabase();
    const {id} = request.params;

    const vehicle = db.get('select * from vehicles where id=?',[id]);

    if(id){
        const vehicles = await db.run('delete from vehicles where id = ?',
        [id]);
    }
    db.close();
    response.send({
        id,
        message: `Veiculo [${id}] removido com sucesso`
    })
}