import React from "react";

const About = props => {
  return (
    <div>
      <h1>About us</h1>
      <h1>{props.match.params.id}</h1>
    </div>
  );
};

export default About;
