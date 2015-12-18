var connection = new Mongo();
var db = connection.getDB('alex');
var xela = db.xela.find();
xela.forEach(function (result) {
    var loc = {"type": "Point","coordinates": [result.coordinate1, result.coordinate2]}
    db.xela.update({_id: result._id},{ $set: { "loc": loc } });
    db.xela.update({_id: result._id},{ $unset: { "coordinate1": "", "coordinate2": "", "type": "", "adress": "" } }
    );
});
