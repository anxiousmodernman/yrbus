var React = require('react');
var LocationStore = require('../stores/LocationStore');



function getActiveLocationFromLocationStore() {
    var location = LocationStore.getActiveLocation();
    return { activeLocation: location }
}

var GoogleMap = React.createClass({

    centerMapOnActiveLocation: function() {
        var latLon = this.getLatLongFromActiveLocation();
        this.state.map.panTo(latLon);
    },

    componentDidMount: function() {
        this.initializeMap();
        LocationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LocationStore.removeChangeListener(this._onChange);
    },

    getInitialState: function () {
        return {
            activeLocation: {
                initialZoom: 10,  // 10 see all of DC
                lat: 38.93047,
                lon: -77.02283190000003 }
        };
    },

    getLatLongFromActiveLocation: function() {
        var state = this.state.activeLocation;
        return new google.maps.LatLng(state.lat, state.lon);
    },

    initializeMap: function() {
        console.log('calling initializeMap');
        var mapOptions = {
            center: this.getLatLongFromActiveLocation(),
            zoom: this.state.activeLocation.initialZoom
        };
        var map = new google.maps.Map(this.getDOMNode(), mapOptions);
        this.setState({map: map});  // just access the map obj from this.state.map
    },

    _onChange: function() {
        this.setState(getActiveLocationFromLocationStore());
        this.centerMapOnActiveLocation();
    },


    render: function() {
        var styles = {
            backgroundColor: 'purple',
            width: '100%',
            height: '200px'
        };

        return (
            <div style={styles}></div>
        )
    }
});


module.exports = GoogleMap;