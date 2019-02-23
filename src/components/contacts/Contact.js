import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import Axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = (id, dispatch) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res =>
        dispatch({
          type: "DELETE_CONTACT",
          payload: id
        })
      )
      .catch(
        dispatch({
          type: "DELETE_CONTACT",
          payload: id
        })
      );
  };

  showDetails = () => {
    console.log(this.state);
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  render() {
    const { id, name, phone, email } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={this.showDetails}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />

                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`/Edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      marginRight: "1rem",
                      float: "right",
                      color: "grey"
                    }}
                  />
                </Link>
              </h4>
              {this.state.showContactInfo == true ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.protoType = {
  contact: PropTypes.object.isRequired
};

export default Contact;
