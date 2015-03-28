var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationConstants = require('../constants/LocationConstants');


var CHANGE_EVENT = 'change';

_locations = {};

function createLocation(obj) {
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(obj.address, geocoder, function(res, err) {

        if (!_locations.hasOwnProperty(obj.id)) {
            _locations[obj.id] = obj;
            _locations[obj.id].lat = res[0].geometry.location.k;
            _locations[obj.id].lon = res[0].geometry.location.D;
        }

    });

}

function geocodeAddress(address, g, callback) {
    g.geocode({"address": address}, callback);

}


var LocationStore = assign({}, EventEmitter.prototype, {

    initialize: function(user) {
        console.log('LocationStore initialize()');
    },

    getAll: function() {
        return _locations;
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