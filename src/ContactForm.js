import React, {Component} from "react";
import "./App.css";
import moment from "moment";
import {Button} from "react-bootstrap";
import {RaisedButton, TextField} from "material-ui";

export default class ContactForm extends Component {

    state = {

    };

    componentDidMount() {
        const form  = document.getElementsByTagName('form')[0];
        const self = this;

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            self.setState({
                submitting: true,
                submitted: false,
                error: false,
            });

            fetch(self.props.appRoot, {
                method: "POST",
                body: {
                    email: self.state.email,
                    message: self.state.message,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    self.setState({
                        submitting: false,
                        submitted: true,
                        error: false,
                    });
                })
                .catch(error => {
                    console.log(error);
                    self.setState({
                        submitting: false,
                        submitted: false,
                        error: true,
                    });
                });
        }, false);
    }

    render() {
        return (
            <form>
                <TextField
                    id="email"
                    required
                    type="email"
                    fullWidth={true}
                    value={this.state.email}
                    floatingLabelText="Your Email*"
                    floatingLabelFixed={true}
                    onChange={(event) => this.setState({email: event.target.value})}
                />
                <TextField
                    id="message"
                    required
                    fullWidth={true}
                    value={this.state.message}
                    floatingLabelText="Your Message*"
                    floatingLabelFixed={true}
                    multiLine={true}
                    onChange={(event) => this.setState({message: event.target.value})}

                />
                <RaisedButton
                    type="submit"
                    style={{
                        marginTop: "20px",
                    }}
                    primary={true}
                    fullWidth={true}
                    label="Submit"
                    disabled={this.state.submitting || this.state.submitted}
                />
                {
                    this.state.submitted &&
                    <div
                        className="alert alert-success"
                        style={{
                            marginTop: "20px",
                            textAlign: "center",
                        }}
                    >
                        <strong>Thank you for your message!</strong>
                    </div>
                }
                {
                    this.state.error &&
                    <div
                        className="alert alert-danger"
                        style={{
                            marginTop: "20px",
                            textAlign: "center",
                        }}
                    >
                        <strong>An error occured, please try later.</strong>
                    </div>
                }
            </form>
        );
    }
}
