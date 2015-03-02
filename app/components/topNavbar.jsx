var React = require('react');


var TopNavbar = React.createClass({

    render: function () {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header"></div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});


module.exports = TopNavbar;