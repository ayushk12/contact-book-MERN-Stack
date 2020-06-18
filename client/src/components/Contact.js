import React, { Component } from "react";
import addContact from "./addContact";
import { Route, Switch, Link } from " react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import contactList from "./contactList";
import modifyContact from "./modifyContact";

class ContactApp extends Component {
  constructor(props) {
    super(props);
    this.state = { editcontact: "" };
  }
  statetransfer = (data) => {
    this.setState({ editcontact: data });
  };

  render() {
    return (
      <Router>
        <div className="contactNav">
          <h1>Contact App</h1>
          <div className="button">
            <Link to="/contactlist">
              {" "}
              <button type="button" class="btn btn-secondary">
                Contact List
              </button>{" "}
            </Link>
            <Link to="/addcontact">
              {" "}
              <button type="button" class="btn btn-secondary">
                Contact List
              </button>{" "}
            </Link>
          </div>
          <Switch>
            <Route exact path="/addcontact" render={() => <addContact />} />
            <Route
              exact
              path="/contactlist"
              render={() => <contactList transfert={this.statetransfer} />}
            />
            <Route
              exact
              path="/editcontact"
              render={() => <modifyContact edit={this.state.editcontact} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default ContactApp;
