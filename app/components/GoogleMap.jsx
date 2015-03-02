var React = require('react');


var GoogleMap = React.createClass({

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