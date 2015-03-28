var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var BusStopConstants = require('../constants/BusStopConstants');


var CHANGE_EVENT = 'change';

_stops = [];  // todo make this more complex

function createStop(stopId) {
	_stops.push(stopId);
}

function removeStop(stopId) {
	var i = _stops.indexOf(stopId);
	if (i > -1) {
		_stops.splice(i, 1);
	}
}


var BusStopStore = assign({}, EventEmitter.prototype, {

    initialize: function(user) {
        //createStop(123);  // todo server call implementation
        console.log('BusStopStore initialize()');
    },

	getAll: function() {
		return _stops;
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
		var stopId;

		switch(payload.actionType) {
			case BusStopConstants.ADD_STOP:
                stopId = action.stopId;
                createStop(stopId);
                BusStopStore.emitChange();
                break;
            case BusStopConstants.REMOVE_STOP:
                stopId = action.stopId;
                removeStop(stopId);
                BusStopStore.emitChange();
                break;
		}

	})

});


module.exports = BusStopStore;
