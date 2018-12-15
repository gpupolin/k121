import React, { useEffect, useState } from "react";

import { SimpleTopAppBar } from "@rmwc/top-app-bar";
import styled, { css } from "styled-components";

import FriendsList from "./FriendsList";
import FriendsForm from "./FriendsForm";

import friendSecret from "./api/friendSecret";

const App = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  height: calc(100vh - 100px);
  width: 100vw;
  padding-top:50px;
`;

export default function FriendSecretContainer(props) {
  const [friends, setFriends] = useState([]);
  const [isFetchingFriend, setIsFetchingFriend] = useState(false);
  const [isFetchingFriendList, setIsFetchingFriendList] = useState(false);

  useEffect(async () => {
    setFriends(await friendSecret.getFriends());
  }, []);

  return (
    <>
      <SimpleTopAppBar title="Amigo Secreto" dense fixed />
      <App>
        <FriendsForm
          onFriendAdd={handleFriendAdd}
          isFetching={isFetchingFriend}
        />
        <FriendsList
          friends={friends}
          isFetching={isFetchingFriendList}
          onDrawSecretFriend={handleDrawSecretFriend}
          onFriendUpdate={handleFriendUpdate}
          onRemoveFriend={handleRemoveFriend}
        />
      </App>
    </>
  );

  async function handleFriendAdd(friend) {
    setIsFetchingFriend(true);
    const ret = await friendSecret.addFriend(friend);
    setFriends(friends.concat(ret));
    setIsFetchingFriend(false);
  }

  async function handleFriendUpdate(friend) {
    setIsFetchingFriendList(true);
    const ret = await friendSecret.updateFriend(friend);

    

    setIsFetchingFriendList(false);
  }

  async function handleRemoveFriend(friend_id) {
    const ret = await friendSecret.removeFriend(friend_id);
    setFriends(friends.filter(f => f._id !== friend_id));
  }

  async function handleDrawSecretFriend() {
    setIsFetchingFriendList(true);
    const ret = await friendSecret.drawSecretFriend();

    setFriends(
      friends.map(f => {
        return {
          ...f,
          ...ret.filter(r => r._id === f._id)[0]
        };
      })
    );

    setIsFetchingFriendList(false);
  }
}
