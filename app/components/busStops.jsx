var React = require('react');
var BusStopStore = require('../stores/BusStopStore');
var GoogleMap = require('./GoogleMap.jsx');
var Router = require('react-router');


function getBusStopsState() {
	return {
		stops: BusStopStore.getAll()	
	};
}

function init() {
	return BusStopStore.initialize();
}

var BusStops = React.createClass({

    mixins: [Router.Navigation],

	getInitialState: function() {
		init();
		return getBusStopsState();
	},

	componentDidMount: function() {
		BusStopStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		BusStopStore.removeChangeListener(this._onChange);
	},

    render: function() {
    	var arrayLength = this.state.stops.length;
        if (arrayLength == 0) {
           this.transitionTo('setup');
        }
        return <div>
            <GoogleMap />
            <h1>BusStops</h1>
            <h2>{arrayLength}</h2>
        </div>
    },

    _onChange: function () {
    	this.setState(getBusStopsState());
    }
});


module.exports = BusStops;