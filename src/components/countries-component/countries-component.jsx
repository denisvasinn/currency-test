import './countries-component.styl';

import React, {Component} from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
import CountryComponent from 'components/country-component/country-component';

class CountriesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="two-column">
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
                <div>
                    <Route path={`/countries/:id`} component={CountryComponent} />
                </div>
            </div>
        );
    }
}

export default CountriesComponent;
