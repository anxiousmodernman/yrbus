# YrBus README

An web app that tells helps you _not_ miss the bus. Built with Django REST Framework and React.

## Frontend (JavaScript) project setup

Assuming you have node, npm, gulp, and bower installed.

```bash
$ git clone https://github.com/anxiousmodernman/yrbus
$ cd yrbus
$ npm install     # maybe sudo if you're on Linux :(
$ bower install
$ gulp setup      # one-time copy of front-end libs to django /static
$ gulp build
```

## Backend (Python) project setup

Create and activate a *yrbus* python virtualenv, then run:

```bash
$ pip install -r requirements.txt
```

Once the dependencies are installed, do the initial database setup (migration), and start the test server.

```
$ ./manage.py migrate
$ ./manage.py runserver
```

Your website should be running on `localhost:8000`

### Test data and various notes
home location lat and long coords (for testing)
* lat 38.9305561
* lon -77.0230006


WMATA key (please don't steal this):
e38370ac538a456f86383f286bfe17bb

### Wmata API reference
API call to get stops associated with Lat and Lon. Radius required w/ Lat/Lon

```json

https://api.wmata.com/Bus.svc/json/jStops?Lat=38.9305561&Lon=-77.0230006&Radius=100&api_key=e38370ac538a456f86383f286bfe17bb

{
    "Stops": [{
        "Lat": 38.930946,
        "Lon": -77.023387,
        "Name": "GEORGIA AVE + LAMONT ST",
        "Routes": ["70"],
        "StopID": "1002068"
    }, {
        "Lat": 38.931305,
        "Lon": -77.023674,
        "Name": "GEORGIA AVE + LAMONT ST",
        "Routes": ["70"],
        "StopID": "1002076"
    }]
}
```





