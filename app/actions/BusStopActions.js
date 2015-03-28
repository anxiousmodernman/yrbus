var AppDispatcher = require('../dispatcher/AppDispatcher');
var BusStopConstants = require('../dispatcher/BusStopConstants');

var BusStopActions = {

	create: function(stopId) {
		AppDispatcher.dispatch({
			actionType: BusStopConstants.ADD_STOP,
			stopId: stopId
		});
	},

	remove: function(stopId) {
		AppDispatcher.dispatch({
			actionType: BusStopConstants.REMOVE_STOP,
			stopId: stopId
		});
	}
};

module.exports = BusStopActions;