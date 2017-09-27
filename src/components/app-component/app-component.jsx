import './app-component.styl';

import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import HomeComponent from 'components/home-component/home-component';
import SignInComponent from 'components/sign-in-component/sign-in-component';
import SignUpComponent from 'components/sign-up-component/sign-up-component';
import CountriesComponent from 'components/countries-component/countries-component';
import CountryComponent from 'components/country-component/country-component';

class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: null,
            user: {
                username: '',
                password: ''
            },
            countries: []
        }
    }

    componentDidMount() {
        fetch('/countries')
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    countries: data
                })
            })
            .catch((err) => console.error(err));
    }

    _onChange(name, value) {
        this.setState(Object.assign({}, this.state, {[name]: value}));
    }

    _onSubmit(url, ev) {
        ev.preventDefault();
        fetch(url, {
            method: 'post',
            body: JSON.stringify(this.state.user)
        })
            .then((res) => res.json())
            .then((data) => this.state.auth = data)
            .catch((err) => console.error(err));
    }

    render() {
        const {auth, user, countries} = this.state;

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            {auth ?
                                <div className="collapse navbar-collapse">
                                    <li className="nav-item"><Link className="nav-link" to="/countries">Countries</Link></li>
                                    <li className="nav-item"><a className="nav-link" href="/auth/signout">Sign Out</a></li>
                                </div> :
                                <div className="collapse navbar-collapse">
                                    <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                                </div>
                            }
                        </ul>
                    </nav>

                    <Route exact path="/" component={HomeComponent} />
                    <Route
                        path="/signin"
                        render={() =>
                            <SignInComponent
                                user={user}
                                onChange={this._onChange.bind(this, 'user')}
                                onSubmit={this._onSubmit.bind(this, '/auth/signin')}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        render={() =>
                            <SignUpComponent
                                user={user}
                                onChange={this._onChange.bind(this, 'user')}
                                onSubmit={this._onSubmit.bind(this, '/auth/signup')}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/countries"
                        render={() => <CountriesComponent countries={countries} />}
                    />
                    <Route path='/countries/:id' component={CountryComponent} />
                </div>
            </Router>
        );
    }
}

export default AppComponent;
