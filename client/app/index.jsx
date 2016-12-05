import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './components/AwesomeComponent.jsx';
import GetAPI from './components/GetAPI.jsx';
import AddFriend from './components/AddFriend.jsx';



class App extends React.Component {
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

render(<App/>, document.getElementById('app'));