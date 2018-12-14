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

  saveFriend(friend) {
    //sendToAPI

    return {
      ...friend,
      ...{ id: 3, friend_id: null, friend: null }
    };
  }

  removeFriend(friend_id) {
    //sendToAPI
  }

  drawSecretFriend() {
    //sendToAPI

    return [...mockDrawList];
  }
}

export default new FriendSecretService();
