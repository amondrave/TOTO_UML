const { request } = require("express");

const controller = {};

controller.vista = (req, res) => {
    const { id } = req.params;
        req.getConnection((err, conn) => {
            const querys = [
                `SELECT * FROM diagrama where id =${id}`,
                `select c.id , c.nombre, d.nombre as diagrama from clase c inner join diagrama d on c.id_diagrama = d.id where id_diagrama=${id}`
            ];
            conn.query(`${querys[0]};${querys[1]};`, (err, sql) => {
                if (err) throw err;
                res.render('clases', {
                    diagramas: sql[0],
                    clases: sql[1]
                });
            })
        })
};


controller.save = (req, res) => {
    const data = req.body;
    const id = data.id_diagrama;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO clase set ?', [data], (err, row) => {
            if (err) throw err;
        });
    });
    res.redirect(`/clase/${id}`);
};

controller.delete = (req,res) =>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        const querys = [
            `SELECT id_diagrama FROM clase WHERE id = ${id}`,
            `DELETE FROM clase WHERE id = ${id}`
        ];
        conn.query(`${querys[0]};${querys[1]};`,(err, sql)=>{
            if (err) throw err;
        });
    })
    res.redirect(`/clase/${sql[0][0].id_diagrama}`);
};

controller.update = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * from clase  WHERE id = ?', id, (req, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('clasePUT', {
                data: rows
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
          "UPDATE clase set ? WHERE id = ?;SELECT id_diagrama  FROM clase WHERE id = ?",
          [data, id, id],
          (err, rows) => {
            if (err) {
              res.json(err);
            }
          }
        );
      }
    });
    res.redirect(`/clase/${rows[1][0].id_diagrama}`);
  }

module.exports = controller;