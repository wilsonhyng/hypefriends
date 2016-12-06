import React from 'react';
import ReactDOM from 'react-dom';
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
    this.state = {
      value: '',
      favorites: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.favorites = this.favorites.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    console.log(this.state.value);
    axios.post('/addFriend', {
      data: this.state.value
    })
    .then((response) => {
      console.log('THE END REPONSE', response);
      if (response.data !== '') {
        // console.log(response.data[0]);
        const favorites = response.data;
        this.setState({ favorites });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({value: ''});
    });
    this.setState({value: ''});
    event.preventDefault();
  }


      //   {unreadMessages.length > 0 &&
      //   <h2>
      //     You have {unreadMessages.length} unread messages.
      //   </h2>
      // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input name="friend" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      

        <div>
          <ul>

            {this.state.favorites !== '' &&

              this.state.favorites.map(favorite => 
                <li>{favorite.artist} + {favorite.title}</li> 
                )



            }




          </ul>
        </div>
      </div>

    );
  }






}

export default AddFriend;