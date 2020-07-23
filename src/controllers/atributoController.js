const { request } = require("express");

const controller = {};

controller.vista = (req, res) => {
    const { id } = req.params;
        req.getConnection((err, conn) => {
            const querys = [
                `SELECT * FROM clase where id =${id}`,
                `SELECT * FROM tipo_dato`,
                `SELECT a.id , a.nombre, c.nombre as clase,t.nombre as tipo from atributo a inner join clase c on a.id_clase = c.id inner join tipo_dato t on a.id_tipo=t.id where id_clase=${id}`,
                `SELECT id FROM diagrama`
            ];
            conn.query(`${querys[0]};${querys[1]};${querys[2]};`, (err, sql) => {
                if (err) throw err;
                res.render('atributo', {
                    clases: sql[0],
                    tipos:sql[1],
                    atributos: sql[2],
                    ruta:id
                });
            })
        })
};


controller.save = (req, res) => {
    const data = req.body;
    const id = data.id_clase;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO atributo set ?', [data], (err, row) => {
            if (err) throw err;
            res.redirect(`/atributo/${id}`);
        });
    });
};

controller.delete = (req,res) =>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        const querys = [
            `SELECT id_clase FROM atributo WHERE id = ${id}`,
            `DELETE FROM atributo WHERE id = ${id}`
        ];
        conn.query(`${querys[0]};${querys[1]};`,(err, sql)=>{
            if (err) throw err;
            res.redirect(`/atributo/${sql[0][0].id_clase}`);
        });
    })
};

controller.update = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        const querys = [
            `SELECT * FROM atributo WHERE id = ${id}`,
            `SELECT * FROM tipo_dato`
        ];
        conn.query(`${querys[0]};${querys[1]};`,(req, sql) => {
            if (err) {
                res.json(err);
            }
            res.render('atributoPUT', {
                data: sql[0],
                tipos:sql[1]
            });
        });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      } else {
        conn.query(
          "UPDATE atributo set ? WHERE id = ?;SELECT id_clase  FROM atributo WHERE id = ?",
          [data, id, id],
          (err, rows) => {
            if (err) {
              res.json(err);
            } else {
              res.redirect(`/atributo/${rows[1][0].id_clase}`);
            }
          }
        );
      }
    });
  }

module.exports = controller;