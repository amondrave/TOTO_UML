const controller = {};

controller.list = (req,res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM diagrama', (err, rows) => {
            if (err) throw err;
            res.render('diagrama',{
               data:rows
           });
        });
    });
};


controller.save = (req,res)=>{
    const data = req.body;
    console.log(data);
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO diagrama set ?',[data],(err,row)=>{
            if (err) throw err;
            console.log(row);
            res.redirect('/diagrama');
        });
    });
};

controller.delete = (req,res) =>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("DELETE FROM diagrama WHERE id = ?",[id],(err, row)=>{
            if (err) throw err;
            res.redirect('/diagrama');
        });
    })
};

controller.update = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * from diagrama  WHERE id = ?', id, (req, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('diagramaPUT', {
                data: rows
            });
        });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE diagrama set ? WHERE id = ?', [data, id], (err, rows) => {
            if (err) {
                res.json(err)
            }
            res.redirect('/diagrama');
        });
    });
};

module.exports = controller;