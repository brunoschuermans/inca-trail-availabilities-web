import React, {Component} from "react";
import "./App.css";
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

            fetch(self.props.appRoot + "/contact", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: self.state.name,
                    email: self.state.email,
                    message: self.state.message,
                }),
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
                <div className="formSection">
                    <label>Name *</label>
                    <TextField
                        id="name"
                        required
                        type="name"
                        fullWidth={true}
                        value={this.state.name}
                        onChange={(event, value) => this.setState({name: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Email *</label>
                    <TextField
                        id="email"
                        required
                        type="email"
                        fullWidth={true}
                        value={this.state.email}
                        onChange={(event, value) => this.setState({email: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Message *</label>
                    <TextField
                        id="message"
                        required
                        fullWidth={true}
                        value={this.state.message}
                        multiLine={true}
                        rows={5}
                        rowsMax={5}
                        onChange={(event, value) => this.setState({message: value})}
                    />
                </div>
                {
                    !this.state.submitted &&
                    <RaisedButton
                        type="submit"
                        style={{
                            marginTop: "20px",
                        }}
                        primary={true}
                        fullWidth={true}
                        label="Submit"
                        disabled={this.state.submitting}
                    />
                }
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
