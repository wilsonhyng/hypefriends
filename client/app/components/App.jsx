import React from 'react';
import ReactDOM from 'react-dom';


import AwesomeComponent from './AwesomeComponent.jsx';
import GetAPI from './GetAPI.jsx';
import AddFriend from './AddFriend.jsx';


class App extends React.Component {
  constructor(props) {
    this.state = {};
  }


  render () {
    return (
      <div>
        <p> Hello React!! COOOOL</p>
      
      <div>
        <AwesomeComponent />
      </div>

      <div>
        <GetAPI / >
      </div>
      
      <div>
        <AddFriend />
      </div>

      </div>
    );
  }
}

export default App;