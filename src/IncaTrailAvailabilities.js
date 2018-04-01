import React, {Component} from "react";
import "./App.css";
import moment from "moment";
import {Button} from "react-bootstrap";
import qs from "query-string";

export default class IncaTrailAvailabilities extends Component {

    state = {
        incaTrailDays: qs.parse(this.props.route.location.search).two === null ? 2 : 4,
        year: moment().year(),
        month: moment().month(),
    };

    componentWillMount() {
        this.fetchAvailabilities();
    }

    fetchAvailabilities() {
        fetch(this.props.appRoot, {method: 'GET'})
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

    toggleIncaTrailDays() {
        this.setState({incaTrailDays: this.state.incaTrailDays === 4 ? 2 : 4});
    }

    render() {
        return (
            <div
                className="App"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div>
                    <Button
                        bsStyle="primary"
                        active={this.state.incaTrailDays === 4}
                        onClick={() => this.toggleIncaTrailDays()}
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        {
                            this.state.incaTrailDays === 4 ?
                                "4 days" :
                                "2 days"
                        }
                    </Button>
                </div>
                <div className="row">
                    <div className="col-xs-2 glyphicon glyphicon-chevron-left"
                         onClick={() => this.previous()}
                         style={{cursor: "pointer"}}>
                    </div>
                    <div className="col-xs-8">
                        <b>
                            {
                                moment(new Date(this.state.year, this.state.month, 1)).format("MMMM YYYY")
                            }
                        </b>
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
                                                        <span
                                                            style={{
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {
                                                                weekAvailabilities.day
                                                            }
                                                        </span>
                                                        <br/>
                                                        <span
                                                            style={{
                                                                color: (this.dayAvailability(weekAvailabilities) > 0) ? "green" : "red"
                                                            }}
                                                        >
                                                            {
                                                                this.dayAvailability(weekAvailabilities)
                                                            }
                                                        </span>
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
                <small
                    style={{
                        marginTop: "10px",
                    }}
                >
                    Ⓒ Copyright <a href="http://www.southernperuexplorers.com">Southern Peru Explorers</a>
                </small>
            </div>
        );
    }
}
