import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: []
  };

  // When component mounts, make API request to get contacts and update state with thosse contacts
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));
    // Remove contact from API
    ContactsAPI.remove(contact);
  };

  render() {
    return (
      <div className="app">
        {/* if url path ends with '/' exactly, show contacts screen */}
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
          )}
        />

        {/* if url ends with '/create', render CreateContact component -> show create contact screen*/}
        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
