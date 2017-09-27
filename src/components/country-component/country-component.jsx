import React, {Component} from 'react';

class CountryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: []
        }
    }

    componentDidMount() {
        fetch(`/countries/${this.props.match.params.id}`)
            .then((data) => {
                console.log(data);
                return data;
            })
            .then((res) => res.json())
            .then((data) => this.setState({
                deals: data
            }))
            .catch((err) => console.error(err));
    }

    render() {
        const {deals} = this.state;
        return (
            <div>
                <h1>Country component</h1>
                <table className="table">
                    <thead className="thead-inverse">
                        <tr>
                            <th>#</th>
                            <th>Currency</th>
                            <th>Commission</th>
                            <th>Foreign exchange</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.slice().map((deal, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i}</th>
                                    <td>{deal.abbreviation}</td>
                                    <td>{deal.commission}</td>
                                    <td>{deal.foreignExchange}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CountryComponent;
