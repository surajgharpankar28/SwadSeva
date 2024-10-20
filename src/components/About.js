import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent Component Did Mount");
  }

  componentWillUnmount() {
    console.log("Parent Component Did Un-Mount");
  }
  render() {
    console.log("Parent Render");
    return (
      <div>
        <h1>About</h1>
        <h3>This is Namaste React Web Series</h3>
        {/* <User name={"Suraj SG (function)"} /> */}

        <UserClass />
      </div>
    );
  }
}

export default About;
