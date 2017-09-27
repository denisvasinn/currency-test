import React, {Component} from 'react';
import {
    Route,
    Link
} from 'react-router-dom';

class CountriesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Countries:</h1>
                <ul className="list-group">
                    {this.props.countries.slice().map((country, i) =>
                        <li key={i} className="list-group-item list-group-item-action">
                            <Link to={`/countries/${country._id}`}>
                                {country.name}
                            </Link>
                        </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default CountriesComponent;
