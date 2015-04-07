var React = require('react/addons');
var GoogleMap = require('./GoogleMap.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');


var StopSetup = React.createClass({

    getInitialState: function() {
        return {
            viewState: 'gettingStarted'
        };
    },

    render: function() {

        return (
            <div>
                <h1>I am the StopSetup parent</h1>
                <GoogleMap />
                <RouteHandler />
            </div>
        )
    }
});


var ChooseRoutes = React.createClass({

    mixins: [Router.Navigation],

    render: function() {

        return (
            <h1>Choose Routes</h1>
        )
    }
});


var ChooseStops = React.createClass({

    mixins: [Router.Navigation],

    render: function() {

        return (
            <h1>Choose Stops</h1>
        )
    },

    handleClick: function() {
        this.props.callback(this)
    }
});

function getLocationStoreState() {
    return {
        loc: LocationStore.getAll()
    };
}

function locationGeocodingSuccessful() {
    return LocationStore.initialSetupSuccess()
}

var EnterLocation = React.createClass({

    mixins: [
        Router.Navigation,
        React.addons.LinkedStateMixin
    ],

    getInitialState: function() {
        return {
            zipCode: ""
        }
    },

    componentDidMount: function() {
        LocationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LocationStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getLocationStoreState());
        this.setState({ locationSet: locationGeocodingSuccessful() })
    },


    render: function() {

        if (this.state.locationSet == true) {
            this.transitionTo('chooseRoutes')
        }
        return (
            <div>
                <h1>Enter Location</h1>
                <p>First, we need to get your location. Enter your address code below.</p>
                <div className="form-group">
                <label htmlFor="address">SourceID</label>
                <input name="address" valueLink={this.linkState('address')}
                    type="text" className="login form-control" id="address" />
                <br />
                <button type="submit" className="btn btn-default btn-lg btn-block"
                    onClick={this.handleClick}>Submit</button>
                </div>
            </div>
        )
    },

    handleClick: function() {
        var loc = {
            id: "Default",  // Default to "Default" from setup screen
            address: this.state.address
        };
        LocationActions.create(loc)
    }
});


var GettingStarted = React.createClass({

    mixins: [Router.Navigation],

    render: function() {
        var message = 'Let\'s Go!';
        return (
            <div>
                <h1>Getting Started</h1>
                <p>It looks like you don't have any bus stops configured. Let's change that!</p>
                <button onClick={this.handleClick}>{'YEAH BABY'}</button>
            </div>
        )
    },

    handleClick: function() {
        this.transitionTo('enterLocation');
    }
});


var exported = {
    EnterLocation: EnterLocation,
    ChooseRoutes: ChooseRoutes,
    ChooseStops: ChooseStops,
    GettingStarted: GettingStarted,
    StopSetup: StopSetup
};


module.exports = exported;