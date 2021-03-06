var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationConstants = require('../constants/LocationConstants');
var Q = require('q');

var CHANGE_EVENT = 'change';

_locations = {};

_initialSetupSuccess = false;

function setInitialSetupSuccess(result) {
    _initialSetupSuccess = result;
}

function createLocation(obj) {

    geocodeAddress(obj.address)
        .then(function(res) {
            var locationKey = obj.id;
            var location = {
                lat: res[0].geometry.location.k,
                lon: res[0].geometry.location.D,
                active: true
            };
            _locations[locationKey] = location;
            setInitialSetupSuccess(true);
            LocationStore.emitChange();
        }, function(err){
            console.log("Something messed up in your promise code");
            console.log(err);
        });

}

function geocodeAddress(address) {

    var deferred = Q.defer();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({"address": address}, function(res, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            deferred.resolve(res);
        } else {
            deferred.reject(new Error(status));
        }
    });
    return deferred.promise;
}


var LocationStore = assign({}, EventEmitter.prototype, {

    initialize: function(user) {
        console.log('LocationStore initialize()');
    },

    getAll: function() {
        return _locations;
    },

    getActiveLocation: function() {
        for (var l in _locations) {
            for (var prop in _locations[l]) {
                if (_locations[l].hasOwnProperty(prop) &&
                    prop == "active" &&
                    _locations[l].active == true) {
                    console.log("This object is active:");
                    console.log(_locations[l]);
                    return _locations[l];
                }
            }
        }
    },

    initialSetupSuccess: function() {
        return _initialSetupSuccess;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatchToken: AppDispatcher.register(function(payload) {
        var action = payload.action;
        var location;

        switch(payload.actionType) {
            case LocationConstants.ADD_LOCATION:
                location = payload.loc;
                createLocation(location);
                LocationStore.emitChange();
                break;
        }
    })
});

module.exports = LocationStore;
