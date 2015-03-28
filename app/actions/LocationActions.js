var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationConstants = require('../constants/LocationConstants');

var LocationActions = {

	create: function(loc) {
        console.log('called LocationActions.create()');
		AppDispatcher.dispatch({
			actionType: LocationConstants.ADD_LOCATION,
			loc: loc
		});
	},

	remove: function(loc) {
		AppDispatcher.dispatch({
			actionType: LocationConstants.REMOVE_LOCATION,
			loc: loc
		});
	}
};

module.exports = LocationActions;