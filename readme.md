#SPIS TREŚCI
- [Dane komputera](#dane-komputera)
- [Zadanie 1a](#zadanie-1a)
- [Zadanie 1b](#zadanie-1b)
- [Zadanie 1c](#zadanie-1c)
- [Zadanie 1d](#zadanie-1d)

#Dane komputera
CPU: AMD Phenom X6 1090T 3.2 GHz, 3,6 Turbo, 6MB cache<br>
RAM: 8GB Kingston HyperX 1600MHz<br>
HDD: 750 GB SATA 6GB/s 7200RPM 64MB cache<br>
OS: Windows 10 Enterprise Insider Preview 10565 x64<br>
Postgesql: 9.4 x64<br>
Mongodb: 3.0.7 x64

#Zadanie 1a

Import bazy reddit:

Mongodb:

```sh

mongoimport -d zadanie1 -c Zadanie1 --type json --file "E:\RC_2015-01.json"

1:16:30

```

![alt tag](https://github.com/mralexx/nosql/blob/master/mongo_cpu.png "")
![alt tag](https://github.com/mralexx/nosql/blob/master/mongo_disc.png "")



PosgreSQL:

```sh

pgfutter_windows_amd64.exe --pw "alex" json "E:\RC_2015-01.json"

1:35:04

```

![alt tag](https://github.com/mralexx/nosql/blob/master/pg_cpu.png "")
![alt tag](https://github.com/mralexx/nosql/blob/master/pg_disc.png "")



#Zadanie 1b

Zliczanie rekordów:

Mongodb:

```sh

db.Zadanie1.count()
53851542
00:13:44

```

PostgreSQL:

```sh

SELECT COUNT(*) from BAZA;
53851542
00:11:11

```

#Zadanie 1c

Mongodb:

```sh

db.Zadanie1.find({"edited" : false}).count()
52233268
00:26:08

db.Zadanie1.find({"edited" : false, "score" : {$gt: 10}}).count()
3379738
00:27:01

```

PosgreSQL:

```sh

SELECT count(*) FROM IMPORT.RC_2015_01 WHERE edited=false;
52233268
00:18:34

SELECT count(*) FROM IMPORT.RC_2015_01 WHERE edited=false AND score<10;
3379738
00:14:34

```




#Zadanie 1d

Operacje na bazie danych MC Donald's w Europie<br>
<br>
Link do bazy:<br>
[Link](http://www.go2poi.com/partner/download.php?p=mcdonalds&c=navman&f=McDonald%27s%20UK.csv)<br>

Import bazy:

```sh

mongoimport -d alex -c xela --type csv --file "E:\McDonaldUK.csv" --headerline
00:01:39

```

Ułożenie danych po zaimportowaniu danych:

```sh

db.xela.findOne()
{
        "_id" : ObjectId("56736eb33bf4b4227aef648b"),
        "coordinate1" : 42.50525,
        "cooordinate2" : 1.52792,
        "type" : "MCDONALD'S (MCDRIVE)",
        "adress" : "AD500 ANDORRA LA VELLA",
        "city" : "ANDORRA"
}

```

Skrypt dopasowujący do odpowiedniego formatu:

[skrypt](https://github.com/mralexx/nosql/blob/master/script.js)


Uruchomienie skryptu:

```sh

load("script.js")
Ułożenie po uruchomieniu skryptu:

```

Ulożenie po uruchomieniu skryptu:

```sh

db.example.findOne()
{
        "_id" : ObjectId("56736eb33bf4b4227aef648b"),
        "city" : "ANDORRA",
        "loc" : {
                "type" : "Point",
                "coordinates" : [
                        42.50525,
                        1.52792
                ]
        }
}

```

Kilka przykładowych zapytań:

```sh

var amsterdam = { "type": "Point", "coordinates": [52.36, 4.90] };

db.xela.find({
loc: {
$geoWithin: {
$center: [[amsterdam.coordinates[0], amsterdam.coordinates[1]], 1.25]}}
}).toArray();


var rotterdam = { "type": "Point", "coordinates": [51.92, 4.50] };
db.xela.find({ loc: { $near: { $geometry: rotterdam }, $maxDistance: 15000 } }).toArray();

var line = {"type": "LineString","coordinates": [[52.36, 4.90], [51.92, 4.50]]}
db.xela.find({
loc: {$geoIntersects: {$geometry: line}}
})).toArray();

```































