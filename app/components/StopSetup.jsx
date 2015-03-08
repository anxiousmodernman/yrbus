var React = require('react');
var GoogleMap = require('./GoogleMap.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var StopSetup = React.createClass({

    getInitialState: function() {
        var state = {
            viewState: 'gettingStarted'
        };
        return state;
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


var EnterLocation = React.createClass({

    mixins: [Router.Navigation],

    render: function() {
        var message = 'Let\'s Go!';
        return (
            <div>
                <h1>Enter Location</h1>

            </div>
        )
    },

    handleClick: function() {
        //this.props.callback(this)
    }
});


var GettingStarted = React.createClass({

    mixins: [Router.Navigation],

    render: function() {
        var message = 'Let\'s Go!';
        return (
            <div>
                <h1>Getting Started</h1>
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