import { openDatabase } from "../database.js";



export const listActivities = async(request,response) => {
    const db = await openDatabase();
    const vehicles = await db.all('SELECT * FROM activities');
    db.close();
    response.send(vehicles)
}

export const insertActivities = async(request,response) => {
    const {label} = request.body;
    const db = await openDatabase();
    const vehicles = await db.get(
        `select * from vehicles where label=?`,[label]
    )

    if(vehicles){
        const checkin_at = (new Date()).getTime();
        const data = await db.run(
            `INSERT INTO activities(vehicle_id,checkin_at)
            values(?,?)`,[vehicles.id,checkin_at]
        )
        db.close();
        response.send({
            vehicle_id : vehicles.id,
            checkin_at: checkin_at,
            message: `Veiculo entrou no estacionamento`
        })
        return;
    }
    db.close();
        response.status(400).send({
            message: `Veiculo nao cadastrado`
        })
}

export const updateActivities = async(request,response) => {
    const {label} = request.body;
    var price;
    const db = await openDatabase();
    const vehicles = await db.get(
        `select * from vehicles where label=?`,[label]
    )

    if(vehicles){
        const existsAT = await db.get(
            `select * from activities where vehicle_id = ? and checkout_at IS NULL`,[vehicles.id]
        )
        if(existsAT){
            const checkout_at = (new Date()).getTime();
        const data = await db.run(
            `UPDATE activities set checkout_at = ? where id = ?`,[checkout_at,existsAT.id]
        )
        const dataprice = await db.run(
            `UPDATE activities set price = ((checkout_at - checkin_at)/60000) * 0.1 where id = ?`,[existsAT.id]
        )
        db.close();
        response.send({
            vehicle_id : vehicles.id,
            checkout_at: checkout_at,
            message: `Veiculo saiu do estacionamentos`
        })
        return;
    }else{
        response.status(400).send({
            message: `Sem atividades de checkout deste veiculo`
        })
        
    }
    }
    db.close();
    response.status(400).send({
        message: `Veiculo nao cadastrado`
    }) 
}

export const deleteActivities = async(request,response) => {
    const db = await openDatabase();
    const {id} = request.params;

    const vehicle = db.get('select * from activities where id=?',[id]);

    if(id){
        const vehicles = await db.run('delete from activities where id = ?',
        [id]);
    }
    db.close();
    response.status(400).send({
        id,
        message: `Atividade [${id}] removida com sucesso`
    })
}