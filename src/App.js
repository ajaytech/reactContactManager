import React from "react";
import Contacts from "./components/contacts/Contacts";
import Header from "./components/layout/Header";
import AddContact from "./components/contacts/AddContact";
import { Provider } from "./context";
import About from "./components/layout/About";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./components/pages/NotFound";
import EditContact from "./components/contacts/EditContact";

class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/Add" component={AddContact} />
                <Route exact path="/About" component={About} />
                <Route exact path="/Edit/:id" component={EditContact} />
                <Route component={NotFound} />
                <Contacts />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
