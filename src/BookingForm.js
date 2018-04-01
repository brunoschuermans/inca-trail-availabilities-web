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
            birthDate: moment(this.state.temporaryBirthDate).format("YYYY-MM-DD"),
        });

        this.setState({
            addTravellerOpened: false,
        });
    }

    book(event) {
        event.preventDefault();

        if (!this.state.tour || !this.state.knowUsFrom || this.state.travellers.length === 0) {
            return;
        }

        this.setState({
            submitting: true,
            submitted: false,
            error: false,
        });

        fetch(this.props.appRoot + "/booking", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                tourStartDate: moment(this.state.tourStartDate).format("YYYY-MM-DD"),
                tourType: this.state.tourType,
                tour: this.state.tour,
                hotel: this.state.hotel,
                foodRestriction: this.state.foodRestriction,
                anyInformation: this.state.anyInformation,
                knowUsFrom: this.state.knowUsFrom,
                travellerForms: this.state.travellers,
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
    }

    removeTraveller(index) {
        this.state.travellers.splice(index, 1);
    }

    render() {
        return (
            <form
                id="bookingForm"
            >
                <div className="formSection">
                    <label>Contact Email*</label>
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
                    <label>Tour Start Date*</label>
                    <DatePicker
                        id="tourStartDate"
                        required
                        fullWidth={true}
                        value={this.state.tourStartDate}
                        minDate={new Date()}
                        container="inline"
                        onChange={(event, value) => this.setState({tourStartDate: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Group/Private Tour*</label>
                    <RadioButtonGroup
                        name="tourType"
                        valueSelected={this.state.tourType}
                        defaultSelected={this.state.tourType}
                        onChange={(event, value) => this.setState({tourType: value})}
                    >
                        <RadioButton
                            required
                            key="PRIVATE"
                            value="PRIVATE"
                            label="Private"
                        />
                        <RadioButton
                            key="GROUP"
                            value="GROUP"
                            label="Group"
                        />
                    </RadioButtonGroup>
                </div>
                <div className="formSection">
                    <label>Add Passports Data*</label>
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
                        {
                            this.state.travellers.map((t, index) =>
                                (
                                    <span
                                        key={index}
                                        style={{
                                            display: "block",
                                        }}
                                    >
                                            {
                                                t.firstName + " " + t.lastName
                                            }
                                        <a href="#" onClick={() => this.removeTraveller(index)}><small> remove</small></a>
                                        </span>

                                )
                            )
                        }
                        <Dialog
                            title="Add Traveller"
                            modal={true}
                            open={this.state.addTravellerOpened}
                        >
                            <form
                                id="travellerForm"
                            >
                                <div className="formSection">
                                    <label>First Name*</label>
                                    <TextField
                                        required
                                        autoFocus
                                        fullWidth={true}
                                        value={this.state.temporaryFirstName}
                                        onChange={(event, value) => this.setState({temporaryFirstName: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Last Name*</label>
                                    <TextField
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryLastName}
                                        onChange={(event, value) => this.setState({temporaryLastName: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Passport Number*</label>
                                    <TextField
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryPassport}
                                        onChange={(event, value) => this.setState({temporaryPassport: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Nationality*</label>
                                    <TextField
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryNationality}
                                        onChange={(event, value) => this.setState({temporaryNationality: value})}
                                    />
                                </div>
                                <div className="formSection">
                                    <label>Birth Date*</label>
                                    <DatePicker
                                        required
                                        fullWidth={true}
                                        value={this.state.temporaryBirthDate}
                                        maxDate={new Date()}
                                        container="inline"
                                        onChange={(event, value) => this.setState({temporaryBirthDate: value})}
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
                    <label>Choose your Tour*</label>
                    <SelectField
                        id="tour"
                        required
                        fullWidth={true}
                        value={this.state.tour}
                        onChange={(event, key, value) => this.setState({tour: value})}
                    >
                        <MenuItem value="INCA_TRAIL_ULTIMATE" primaryText="Inca Trail 8D/7N"/>
                        <MenuItem value="INCA_TRAIL_TRAILBLAZING" primaryText="Inca Trail 5D/4N"/>
                        <MenuItem value="INCA_TRAIL_CLASSIC" primaryText="Inca Trail 4D/3N"/>
                        <MenuItem value="INCA_TRAIL_TASTE" primaryText="Inca Trail 2D/1N"/>
                        <MenuItem value="BEST_OF_PERU" primaryText="The Best of Peru 12D/11N"/>
                        <MenuItem value="TAMBOPATA_JUNGLE" primaryText="Tambopata Jungle 4D/3N"/>
                        <MenuItem value="SALKANTAY" primaryText="Salkantay Trek 5D/4N"/>
                        <MenuItem value="LARES" primaryText="Lares Trek 4D/3N"/>
                        <MenuItem value="EXTREME_ADVENTURE" primaryText="Inca Jungle to Machu Picchu 4D/3N"/>
                        <MenuItem value="CHOQUEQUIRAO" primaryText="Choquequirao Trek 5D/4N"/>
                        <MenuItem value="AUSANGATE" primaryText="Ausangate Trek 5D/4N"/>
                    </SelectField>
                </div>
                <div className="formSection">
                    <label>Hotel for pick up*</label>
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
                    <label>Food restrictions</label>
                    <TextField
                        id="foodRestriction"
                        fullWidth={true}
                        value={this.state.foodRestriction}
                        multiLine={true}
                        onChange={(event, value) => this.setState({foodRestriction: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Other comment</label>
                    <TextField
                        id="anyInformation"
                        fullWidth={true}
                        value={this.state.anyInformation}
                        multiLine={true}
                        onChange={(event, value) => this.setState({anyInformation: value})}
                    />
                </div>
                <div className="formSection">
                    <label>Knowing us from*</label>
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
                {
                    !this.state.submitted &&
                    !this.state.error &&
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
                        <strong>Thank you for your booking! Don't forget to go to Step 3</strong>
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
