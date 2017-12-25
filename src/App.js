import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import moment from "moment";

class App extends Component {

    state = {
        incaTrailDays: 4,
        year: moment().year(),
        month: moment().month(),
    };

    componentWillMount() {
        this.fetchAvailabilities();
    }

    fetchAvailabilities() {
        fetch("https://api.inca-trail-availabilities.work", {method: 'GET'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(json => this.setState({availabilities: json.availabilities}))
            .catch(error => {
                console.log(error);
            });
    }

    monthAvailabilities() {
        let cloneMonthAvailabilities;
        let montAvailabilities = this.state.availabilities.find(availability =>
            (availability.year === this.state.year) && (availability.month === (this.state.month + 1))
        );

        cloneMonthAvailabilities = JSON.parse(JSON.stringify(montAvailabilities));

        cloneMonthAvailabilities.dayAvailabilities
            .sort(function (a, b) {
                return a.day - b.day;
            })
            .reverse();
        for (let i = 0; i < moment(new Date(this.state.year, this.state.month, 1)).day(); i++) {
            cloneMonthAvailabilities.dayAvailabilities.push({});
        }
        cloneMonthAvailabilities.dayAvailabilities.reverse();

        return cloneMonthAvailabilities.dayAvailabilities
            .reduce(function (week, day, index) {
                if (index % 7 === 0) {
                    week.push([]);
                }
                week[week.length - 1].push(day);
                return week;
            }, []);
    }

    previous() {
        let year = this.state.year;
        let month = this.state.month;

        if (month === 0) {
            year = year - 1;
            month = 11;
        } else {
            month = month - 1;
        }

        let montAvailabilities = this.state.availabilities.find(availability =>
            (availability.year === year) && (availability.month === (month + 1))
        );

        if (montAvailabilities) {
            this.setState({
                year: year,
                month: month,
            })
        }
    }

    next() {
        let year = this.state.year;
        let month = this.state.month;

        if (month === 11) {
            year = year + 1;
            month = 0;
        } else {
            month = month + 1;
        }

        let montAvailabilities = this.state.availabilities.find(availability =>
            (availability.year === year) && (availability.month === (month + 1))
        );

        if (montAvailabilities) {
            this.setState({
                year: year,
                month: month,
            })
        }
    }

    dayAvailability(day) {
        return this.state.incaTrailDays === 2 ? day.two : day.four;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img width="100px" src="/Machu-Picchu.png"/>
                    <h1 className="App-title">INCA TRAIL AVAILABILITIES</h1>
                </header>
                <h1>
                    Get day by day actualized inca trail availabilities from the Regional Direction of Culture of Cusco.
                </h1>
                <h2>
                    Integrate the availabilities on your web site through our JSON API:
                </h2>
                <div className="container" style={{marginTop: "50px"}}>
                    <div className="row">
                        <div
                            className="col-lg-6 col-xs-12"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                            <div style={{marginBottom: "20px"}}>
                                <select value={this.state.incaTrailDays}
                                        onChange={event => this.setState({incaTrailDays: parseInt(event.target.value)})}>
                                    <option value={4}>Inca Trail 4 days</option>
                                    <option value={2}>Inca Trail 2 days</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-xs-2 glyphicon glyphicon-chevron-left"
                                     onClick={() => this.previous()}
                                     style={{cursor: "pointer"}}>
                                </div>
                                <div className="col-xs-8">
                                    {
                                        moment(new Date(this.state.year, this.state.month, 1)).format("MMMM YYYY")
                                    }
                                </div>
                                <div className="col-xs-2 glyphicon glyphicon-chevron-right"
                                     onClick={() => this.next()}
                                     style={{cursor: "pointer"}}>
                                </div>
                            </div>
                            <div>
                                <table cellSpacing="20" width="100%">
                                    <thead>
                                    <tr>
                                        <th>
                                            <div className="dayTitle">SUN</div>
                                        </th>
                                        <th>
                                            <div className="dayTitle">MON</div>
                                        </th>
                                        <th>
                                            <div className="dayTitle">TUE</div>
                                        </th>
                                        <th>
                                            <div className="dayTitle">WED</div>
                                        </th>
                                        <th>
                                            <div className="dayTitle">THU</div>
                                        </th>
                                        <th>
                                            <div className="dayTitle">FRI</div>
                                        </th>
                                        <th>
                                            <div className="dayTitle">SAT</div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody id="availability">
                                    {
                                        this.state.availabilities &&
                                        this.monthAvailabilities().map(monthAvailabilities =>
                                            (
                                                <tr style={{borderTop: "solid 1px"}}>
                                                    {
                                                        monthAvailabilities.map(weekAvailabilities =>
                                                            (
                                                                <td>
                                                                    <p>
                                                                        {
                                                                            weekAvailabilities.day
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <small
                                                                            style={{color: (this.dayAvailability(weekAvailabilities) > 0) ? "green" : "red"}}>
                                                                            {
                                                                                this.dayAvailability(weekAvailabilities)
                                                                            }
                                                                        </small>
                                                                    </p>
                                                                </td>
                                                            )
                                                        )
                                                    }
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12" style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <div style={{
                                width: "400px",
                                padding: "50px",
                                border: "solid 1px lightGrey",
                                boxShadow: "5px 5px 5px rgba(0, 0, 0, .5)"
                            }}>
                                <h1>Price:</h1>
                                <h1>
                                    $49
                                </h1>
                                <p>
                                    / month
                                </p>
                                <p>
                                    Annual subscription required
                                </p>
                                <p>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => window.location = "mailto:info@inca-trail-availabilities.work"}
                                    >
                                        CONTACT SELLER
                                    </button>
                                </p>
                                <p>
                                    info@inca-trail-availabilities.work
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <p style={{padding: "20px"}}>
                            <code>GET https://api.inca-trail-availabilities.work => <a
                                href="/inca-trail-availabilities.json">inca-trail-availabilities.json</a></code>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
