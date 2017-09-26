import React, {Component} from 'react';

class CountryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {}
        }
    }

    componentDidMount() {
        console.log('hello');
        fetch(`/countries/${this.props.match.params.id}`)
            .then((data) => {
                console.log(data);
                return data;
            })
            .then((res) => res.json())
            .then((data) => this.setState({
                country: data
            }))
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div>
                <h1>Country component</h1>
                <p>{JSON.stringify(this.state.country)}</p>
            </div>
        );
    }
}

export default CountryComponent;
