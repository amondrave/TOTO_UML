const controller = {}

controller.vista = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`select t.nombre as dato, count(*) as cantidad 
        from atributo a join tipo_dato t on a.id_tipo=t.id group by id_tipo`, (err, sql) => {
            if (err) throw err;
            res.render('estadisticas', {
                tipos: sql
            });
        })
    })
};

module.exports = controller;