const mockList = [
  {
    id: 1,
    name: "João",
    email: "joao@gmail.com",
    friend_id: null,
    friend: null
  },
  {
    id: 2,
    name: "Melissa",
    email: "melissa@gmail.com",
    friend_id: null,
    friend: null
  }
];

const mockDrawList = [
  {
    id: 1,
    friend_id: 2,
    friend: "Melissa"
  },
  {
    id: 2,
    friend_id: 1,
    friend: "João"
  }
];

class FriendSecretService {
  async getFriends() {

    const res = await fetch('/api/friends');

    return await res.json()
    
  }

  async addFriend(friend) {
    
    const res = await fetch('/api/friends', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(friend), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const friendRet = await res.json();
    
    return {...friendRet};
  }

  async updateFriend(friend) {
    
    const res = await fetch(`/api/friends/${friend._id}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(friend), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const friendRet = await res.json();
    
    return {...friendRet};
  }

  async removeFriend(friend_id) {
    //sendToAPI
    const res = await fetch(`/api/friends/${friend_id}`, {
      method: 'DELETE'
    })

    const friendRet = await res.json();
    
    return {...friendRet};
  }

  drawSecretFriend() {
    //sendToAPI

    return [...mockDrawList];
  }
}

export default new FriendSecretService();
