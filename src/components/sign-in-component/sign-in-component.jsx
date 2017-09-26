import React, {Component} from 'react';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
    }

    _onChange(name, ev) {
        const {user, onChange} = this.props;
        onChange(Object.assign({}, user, {[name]: ev.target.value}));
    }

    render() {
        const {onSubmit} = this.props;

        return (
            <div className="popup">
                <h1>Sign In</h1>
                <form method="post" action="/auth/signin" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={this._onChange.bind(this, 'username')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={this._onChange.bind(this, 'password')}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            </div>
        );
    }
}

export default SignInComponent;
