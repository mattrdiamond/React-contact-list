import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    // Validation: specify specific types for props - will warn us if something different is passed in. Also specify if required
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  // set state to equal search query and trim any extra white space around search value
  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  // clearing query will cause if statement within render method to return false -> showingContacts = contacts
  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts;
    // will return true if input field contains a value
    if (query) {
      // if there are any special characters in query, escape them so that we can use the special characters as a string literal rather than the special regex characters. 'i' will ignore case
      const match = new RegExp(escapeRegExp(query), "i");
      // filter by contacts name matching our regular expresion
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }
    // sort contacts alphabetically by name
    showingContacts.sort(sortBy("name"));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search contacts"
            // displayed value in input field will be the value of state.query
            value={this.state.query}
            // whenever search value changes, call updateQuery and pass in value from input field
            onChange={event => this.updateQuery(event.target.value)}
          />
          {/*create contact button*/}
          <Link
            // react router += '/create' to end of url when clicked
            to="/create"
            // onClick={this.props.onNavigate}
            className="add-contact"
          >
            Add Contact
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length} total
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {/* map over filtered array for all of contacts that match query */}
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
