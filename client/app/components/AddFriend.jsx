import React from 'react';
import axios from 'axios';

// const AddFriend = () => (

//     // <a href='/addFriend'>Add Friend</a>
// // html button


//     <form action='/addFriend' method='post'>
//       <input name="friend" defaultValue="wily6"></input>
//       <button>Add a Friend</button>
//     </form>



// );

class AddFriend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    console.log(this.state.value);
    axios.post('/addFriend', {
      data: this.state.value
    });
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="friend" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }






}

export default AddFriend;