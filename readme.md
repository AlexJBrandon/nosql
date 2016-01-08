#SPIS TREŚCI
- [Dane komputera](#dane-komputera)
- [Zadanie 1a](#zadanie-1a)
- [Zadanie 1b](#zadanie-1b)
- [Zadanie 1c](#zadanie-1c)
- [Zadanie 1d](#zadanie-1d)

#Dane komputera
**CPU**: AMD Phenom X6 1090T 3.2 GHz, 3,6 Turbo, 6MB cache<br>
**RAM**: 8GB Kingston HyperX 1600MHz<br>
**HDD**: 750 GB SATA 6GB/s 7200RPM 64MB cache<br>
**OS**: Windows 10 Enterprise Insider Preview 10565 x64<br>
**Postgesql**: 9.4 x64<br>
**Mongodb**: 3.0.7 x64

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

Operacje na bazie danych MC Donald's w Londynie i okolicach<br>
<br>


Import bazy:

```sh

mongoimport -d place -c places --type csv --file "E:\McDonaldUK.csv" --headerline
00:01:39

```

Ułożenie danych po zaimportowaniu danych:

```sh

db.places.findOne()
{
        "_id" : ObjectId("56736eb33bf4b4227aef648b"),
        "coordinate1" : 42.50525,
        "coordinate2" : 1.52792,
        "type" : "MCDONALD'S (MCDRIVE)",
        "adress" : "AD500 ANDORRA LA VELLA",
        "city" : "ANDORRA"
}

```

[scrypt](https://github.com/mralexx/nosql/blob/master/script.js) dopasowujący do odpowiedniego formatu:


Uruchomienie skryptu:

```sh

load("script.js")

```

Uklad rekordów po uruchomieniu skryptu:

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

Dodajemy geo-index:

```sh

db.places.ensureIndex({"loc" : "2dsphere"})

```

### 1

MC Donald's blisko Londynu (ograniczenie 20):

```sh

var london = { "type": "Point", "coordinates": [51.5072, 0.1275] };
db.places.find({ loc: {$near: {$geometry: london}} }).limit(20)

```

[mapa](https://github.com/mralexx/nosql/blob/master/1_near.geojson)

### 2

MC Donald's w promieniu 0.1 stopnia od centrum Londynu:

```sh

db.places.find({loc: {$geoWithin: {$center: [[51.5072, 0.1275], 0.10]}}})

```

[mapa](https://github.com/mralexx/nosql/blob/master/2_stopnie.geojson)

### 3

MC Donald's na lini Londyn - Chemsford:

```sh

var line2 = {
    "type": "LineString",
    "coordinates": [[51.5072, 0.1275], [51.73610,0.47980]]
}

db.places.find({
    loc: {
        $geoIntersects: {
            $geometry: line2
        }
    }
}).limit(20)

```

[mapa](https://github.com/mralexx/nosql/blob/master/3_line.geojson)

### 4

MC Donald's w trójkacie na wschód od Londynu



```sh

db.places.find({
    loc: {
        $geoWithin: {
            $geometry: {
                "type": "Polygon",
                "coordinates": [[
                    [51.64477, 0.03845],
                    [51.50720, 0.12750],
                    [51.46375,0.11398],
		        [51.64477, 0.03845]
                ]]
            }
        }
    }
}).limit(20)

```

[mapa](https://github.com/mralexx/nosql/blob/master/4_triangle.geojson)
























