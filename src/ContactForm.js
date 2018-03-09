import React, {Component} from "react";
import "./App.css";
import {MenuItem, RaisedButton, SelectField, TextField} from "material-ui";

export default class ContactForm extends Component {

    state = {

    };

    componentDidMount() {
        const form  = document.getElementsByTagName('form')[0];

        form.addEventListener("submit", event => {
            event.preventDefault();

            if(!this.state.knowUsFrom) {
                return;
            }

            this.setState({
                submitting: true,
                submitted: false,
                error: false,
            });

            fetch(this.props.appRoot + "/contact", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    knowUsFrom: this.state.knowUsFrom,
                    message: this.state.message,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    this.setState({
                        submitting: false,
                        submitted: true,
                        error: false,
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
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
                    <label>From where do you know us? *</label>
                    <SelectField
                        id="knowUsFrom"
                        required
                        fullWidth={true}
                        value={this.state.knowUsFrom}
                        onChange={(event, key, value) => this.setState({knowUsFrom: value})}
                    >
                        <MenuItem value="FRIENDS" primaryText="Friends"/>
                        <MenuItem value="GOOGLE" primaryText="Google"/>
                        <MenuItem value="WILD_ROVER" primaryText="Wild Rover"/>
                        <MenuItem value="OTHER" primaryText="Other"/>
                    </SelectField>
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
