import { Component } from "react";

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "dummy",
      },
    };
    //console.log(this.props.name + " Child Constructor");
  }
  async componentDidMount() {
    // console.log(this.props.name + " Child Component Did Mount");

    const data = await fetch("https://api.github.com/users/surajgharpankar28");
    const json = await data.json();

    this.setState({ userInfo: json });
    // console.log(json);
  }
  componentWillUnmount() {
    // console.log("Child Component Did Un-Mount");
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    //console.log(this.props.name + " Child Render");
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name : {name}</h2>
        <h3>Location : {location}</h3>
        <h4>Contact : 8799654321</h4>
      </div>
    );
  }
}

export default UserClass;
