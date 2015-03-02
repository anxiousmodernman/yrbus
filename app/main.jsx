var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;


React.initializeTouchEvents(true);

var BusStops = require('./components/busStops.jsx');
var TopNavbar = require('./components/topNavbar.jsx');
var StopSetup = require('./components/StopSetup.jsx');

var App = React.createClass({

    render: function() {
        return <div>
        <TopNavbar />
        <div className="container-fluid row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 col-xs-12">
                        <RouteHandler/>
                    </div>
                    <div className="col-md-2"></div>
        </div>
        </div>
    }
});


var routes = (
        <Route handler={App}>
            <DefaultRoute handler={BusStops} />
            <Route name="setup" handler={StopSetup}>
            </Route>
        </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
