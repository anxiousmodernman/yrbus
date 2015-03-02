var React = require('react');
var GoogleMap = require('./GoogleMap.jsx');


var StopSetup = React.createClass({

    getInitialState: function() {
        var state = {
            viewState: 'gettingStarted'
        };
        return state;
    },

    _determineViewState: function() {
        var view;
        switch(this.state.viewState) {
            case 'gettingStarted':
                view = <GettingStarted />
                break;
        }
        return view;
    },

    render: function() {

        var childView = this._determineViewState();
        return (
            <div>
                <GoogleMap />
                {childView}
            </div>
        )
    }
});


var GettingStarted = React.createClass({

    render: function() {

        return (
            <h1>Getting Started</h1>
        )
    }
});


module.exports = StopSetup;