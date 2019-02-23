import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import Axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const res = Axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    ).then(res =>
      this.setState({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone
      })
    );
  }

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({ error: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "Phone is required" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    Axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newContact
    ).then(res => dispatch({ type: "UPDATE_CONTACT", payload: res.data }));

    // clearing the state
    this.setState({
      name: "",
      email: "",
      phone: "",
      error: {}
    });
    this.props.history.push("/");
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    className="form-group"
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <TextInputGroup
                    label="Email"
                    className="form-group"
                    type="text"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    className="form-group"
                    type="text"
                    name="phone"
                    className="form-control form-control-lg"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
