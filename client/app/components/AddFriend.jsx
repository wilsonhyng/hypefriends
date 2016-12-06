import React from 'react';

const AddFriend = () => (

    // <a href='/addFriend'>Add Friend</a>
// html button


    <form action='/addFriend' method='post'>

      <input name="friend" defaultValue="wily6"></input>
      <button>Add a Friend</button>
    </form>



);

export default AddFriend;