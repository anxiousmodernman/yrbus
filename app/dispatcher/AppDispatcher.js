var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

	handlePayload: function(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		})
	}
});

module.exports = AppDispatcher;