import React, {Component} from "react";
import "./App.css";
import {Redirect, Route} from "react-router";
import IncaTrailAvailabilities from "./IncaTrailAvailabilities";
import ContactForm from "./ContactForm";
import BookingForm from "./BookingForm";

const APP_ROOT = "https://steady-course-191300.appspot.com";

export default class App extends Component {

    render() {
        return (
            <div>
                <Route exact path="/" render={(route) =>
                    <Redirect to="/inca-trail-availabilities"/>
                }
                />
                <Route exact path="/inca-trail-availabilities" render={(route) =>
                    <IncaTrailAvailabilities
                        appRoot={APP_ROOT}
                        route={route}
                    />
                }
                />
                <Route exact path="/contact-form" render={(route) =>
                    <ContactForm
                        appRoot={APP_ROOT}
                        route={route}
                    />
                }
                />
                <Route exact path="/booking-form" render={(route) =>
                    <BookingForm
                        appRoot={APP_ROOT}
                        route={route}
                    />
                }
                />
            </div>
        );
    }
}
