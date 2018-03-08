import React, {Component} from "react";
import "./App.css";
import {
    Checkbox,
    DatePicker,
    Dialog,
    FlatButton,
    FloatingActionButton,
    MenuItem,
    RadioButton,
    RadioButtonGroup,
    RaisedButton,
    SelectField,
    TextField
} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index";
import moment from "moment";


export default class BookingForm extends Component {

    state = {
        addTravellerOpened: false,
        travellers: [],
    };

    componentDidMount() {
        document.getElementById("bookingForm").addEventListener("submit", event => {
            this.book(event);
        }, false);
    }

    addTraveller(event) {
        event.preventDefault();

        this.state.travellers.push({
            firstName: this.state.temporaryFirstName,
            lastName: this.state.temporaryLastName,
            passport: this.state.temporaryPassport,
            nationality: this.state.temporaryNationality,
            birthDate: this.state.temporaryBirthDate,
            email: this.state.temporaryEmail,
        });

        this.setState({
            addTravellerOpened: false,
        });
    }

    book(event) {
        event.preventDefault();

        this.setState({
            submitting: true,
            submitted: false,
            error: false,
        });

        fetch(this.props.appRoot, {
            method: "POST",
            body: {
                email: this.state.email,
                message: this.state.message,
            },
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
    }

    render() {
        return (
            <form
                id="bookingForm"
            >
                <div className="formSection">
                    <label>Point of Contact Email *</label>
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
                    <label>Tour Start Date *</label>
                    <DatePicker
                        id="tourStartDate"
                        required
                        fullWidth={true}
                        value={this.state.startDate}
                        onChange={(event, value) => this.setState({startDate: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Group or Private Tour *</label>
                    <RadioButtonGroup
                        name="tourType"
                        valueSelected={this.state.tourType}
                        defaultSelected={this.state.tourType}
                        onChange={(event, value) => this.setState({tourType: value})}
                    >
                        <RadioButton
                            required
                            key="P"
                            value="P"
                            label="Private"
                        />
                        <RadioButton
                            key="G"
                            value="G"
                            label="Group"
                        />
                    </RadioButtonGroup>
                </div>
                <div className="formSection">
                    <label>Clients Passport Information</label>
                    <div>
                        <FloatingActionButton
                            mini={true}
                            onClick={() => {
                                this.setState({
                                    addTravellerOpened: true,
                                    temporaryFirstName: undefined,
                                    temporaryLastName: undefined,
                                    temporaryPassport: undefined,
                                    temporaryNationality: undefined,
                                    temporaryBirthDate: undefined,
                                    temporaryEmail: undefined,
                                });

                                setTimeout(() => {
                                    document.getElementById("travellerForm").addEventListener("submit", event => {
                                        this.addTraveller(event);
                                    }, false);
                                }, 300);
                            }}
                        >
                            <ContentAdd/>
                        </FloatingActionButton>
                        <p/>
                        <ol>
                            {
                                this.state.travellers.map(t =>
                                    (
                                        <li>
                                            {
                                                t.firstName + " " + t.lastName + " (" + t.passport + ", " + t.nationality + ", " + moment(t.birthDate).format("DD/MM/YYYY") + ")"
                                            }
                                        </li>
                                    )
                                )
                            }
                        </ol>
                        <Dialog
                            title="Add Traveller"
                            modal={true}
                            open={this.state.addTravellerOpened}
                        >
                            <form
                                id="travellerForm"
                            >
                                <div className="formSection">
                                    <label>First Name *</label>
                                    <TextField
                                        required
                                        autoFocus
                                        fullWidth={true}
                                        value={this.state.temporaryFirstName}
                                        onChange={(event, value) => this.setState({temporaryFirstName: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Last Name *</label>
                                    <TextField
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryLastName}
                                        onChange={(event, value) => this.setState({temporaryLastName: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Passport Number *</label>
                                    <TextField
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryPassport}
                                        onChange={(event, value) => this.setState({temporaryPassport: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Nationality *</label>
                                    <TextField
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryNationality}
                                        onChange={(event, value) => this.setState({temporaryNationality: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Birth Date *</label>
                                    <DatePicker
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryBirthDate}
                                        onChange={(event, value) => this.setState({temporaryBirthDate: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Email *</label>
                                    <TextField
                                        required
                                        type="email"
                                        fullWidth={true}
                                        value={this.state.temporaryEmail}
                                        onChange={(event, value) => this.setState({temporaryEmail: value})}
                                    />
                                </div>
                                <FlatButton
                                    label="Submit"
                                    type="submit"
                                    primary={true}
                                />
                                <FlatButton
                                    label="Cancel"
                                    onClick={() => this.setState({addTravellerOpened: false})}
                                />
                            </form>
                        </Dialog>
                    </div>
                </div>
                <div className="formSection">
                    <label>Choose your Tour *</label>
                    <SelectField
                        id="tour"
                        required
                        fullWidth={true}
                        value={this.state.tour}
                        onChange={(event, key, value) => this.setState({tour: value})}
                    >
                        <MenuItem value="INU" primaryText="Ultimate Inca Trail 8D/7N"/>
                        <MenuItem value="INT" primaryText="Trailblazing Inca Trail 5D/4N"/>
                        <MenuItem value="INC" primaryText="Classic Inca Trail 4D/3N"/>
                        <MenuItem value="INT" primaryText="A Taste of Inca Trail 2D/1N"/>
                        <MenuItem value="BPE" primaryText="The Best of Peru 12D/11N"/>
                        <MenuItem value="TAM" primaryText="Tambopata Jungle 4D/3N"/>
                        <MenuItem value="SAL" primaryText="Salkantay Trek 5D/4N"/>
                        <MenuItem value="LAR" primaryText="Lares Trek 4D/3N"/>
                        <MenuItem value="EXT" primaryText="Extreme Adventure to Machu Picchu 4D/3N"/>
                        <MenuItem value="CHO" primaryText="Choquequirao Trek 5D/4N"/>
                        <MenuItem value="AUS" primaryText="Ausangate Trek 5D/4N"/>
                    </SelectField>
                </div>
                <div className="formSection">
                    <label>Where is the hotel we have to pick you up? *</label>
                    <TextField
                        id="hotel"
                        required
                        type="text"
                        fullWidth={true}
                        value={this.state.hotel}
                        onChange={(event, value) => this.setState({hotel: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Let us know if anyone has food restrictions</label>
                    <TextField
                        id="foodRestriction"
                        fullWidth={true}
                        value={this.state.foodRestriction}
                        multiLine={true}
                        onChange={(event, value) => this.setState({foodRestriction: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Let us know any other information we should know</label>
                    <TextField
                        id="anyInformation"
                        fullWidth={true}
                        value={this.state.anyInformation}
                        multiLine={true}
                        onChange={(event, value) => this.setState({anyInformation: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Where do you know us *</label>
                    <SelectField
                        id="knowUsFrom"
                        required
                        fullWidth={true}
                        value={this.state.knowUsFrom}
                        onChange={(event, key, value) => this.setState({knowUsFrom: value})}
                    >
                        <MenuItem value="FRD" primaryText="Friends"/>
                        <MenuItem value="GOO" primaryText="Google"/>
                        <MenuItem value="OTH" primaryText="Other"/>
                    </SelectField>
                </div>
                <div className="formSection">
                    <Checkbox
                        required
                        checked={this.state.termsAndConditionsAccepted}
                        onCheck={(event, checked) => this.setState({termsAndConditionsAccepted: checked})}
                        label="I have read and accepted the terms and conditions of Southern Peru Explorers *"
                    />
                </div>
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
