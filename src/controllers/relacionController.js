const { request } = require("express");

const controller = {};

controller.vista = (req, res) => {
    req.getConnection((err, conn) => {
        const querys = [
            `SELECT * FROM diagrama`,
            `SELECT * FROM clase `,
            `SELECT * FROM multiplicidad`,
            `SELECT r.id, o.nombre as origen, d.nombre as destino, m.desc 
            from relaciones r join clase o on r.clase_origen = o.id 
            join clase d on r.clase_destino=d.id join multiplicidad m on r.id_multiplicidad=m.id`
        ];
        conn.query(`${querys[0]};${querys[1]};${querys[2]};${querys[3]};`, (err, sql) => {
            if (err) throw err;
            res.render('relaciones', {
                diagramas: sql[0],
                origen: sql[1],
                destino: sql[1],
                mult:sql[2],
                relacion:sql[3]
            });
        })
    })               
};

controller.origen = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        const querys = [
            `SELECT * FROM diagrama`,
            `SELECT * FROM clase where id_diagrama=${id}`,
            `SELECT * FROM multiplicidad`,
            `SELECT r.id, o.nombre as origen, d.nombre as destino, m.desc 
            from relaciones r join clase o on r.clase_origen = o.id 
            join clase d on r.clase_destino=d.id join multiplicidad m on r.id_multiplicidad=m.id`
        ];
        conn.query(`${querys[0]};${querys[1]};${querys[2]};${querys[3]};`, (err, sql) => {
            if (err) throw err;
            console.log(typeof(id));
            res.render('relaciones', {
                diagramas: sql[0],
                origen: sql[1],
                destino: sql[1],
                mult:sql[2],
                relacion:sql[3]
            });
        })
    })       
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO relaciones set ?', [data], (err, row) => {
            if (err) throw err;

            res.redirect(`/relacion/0`);
        });
    });
};

controller.delete = (req,res) =>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query( `DELETE FROM relaciones WHERE id = ${id}`,(err, sql)=>{
            if (err) throw err;
            res.redirect(`/relacion/0`);
        });
    })
};

module.exports = controller;