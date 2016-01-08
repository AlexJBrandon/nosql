var connection = new Mongo();
var db = connection.getDB('place');
var places = db.places.find();
places.forEach(function (result) {
    var loc = {"type": "Point","coordinates": [result.coordinate1, result.coordinate2]}
    db.places.update({_id: result._id},{ $set: { "loc": loc } });
    db.places.update({_id: result._id},{ $unset: { "coordinate1": "", "coordinate2": "", "type": "", "adress": "" } }
    );
});
