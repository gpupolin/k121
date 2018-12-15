import React, { useState } from "react";
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from "@rmwc/data-table";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { IconButton } from "@rmwc/icon-button";

import { Fab } from "@rmwc/fab";

import styled from "styled-components";

import "@rmwc/data-table/data-table.css";
import { CircularProgress } from "@rmwc/circular-progress";

const DrawFab = styled(Fab)`
  margin: 15px 0;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height:100%;
  overflow:auto;
`;

export default function FriendsList(props) {
  const [friendVisible, setFriendVisible] = useState(false);

  if (!props.friends || props.friends.length <= 0) {
    return (
      <Container>
        <h2>Cadastre agora pelo menos dois amigos</h2>
        <h2> para iniciar o sorteio</h2>
        <h2>🎁🎁🎁</h2>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <DrawFab
          onClick={props.onDrawSecretFriend}
          theme={"background primary"}
          icon='play_arrow'
          label='Sortear'
        />
      </div>
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell alignMiddle>Nome</DataTableHeadCell>
              <DataTableHeadCell alignMiddle>Email</DataTableHeadCell>
              <DataTableHeadCell alignMiddle>
                Amigo{" "}
                {props.friends.some(f => f.friend) && (
                  <IconButton
                    checked={friendVisible}
                    onClick={() => setFriendVisible(!friendVisible)}
                    icon='visibility_off'
                    onIcon='visibility'
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle>
                {props.isFetching && <CircularProgress />}
              </DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {props.friends.map(f => {
              return (
                <FriendItem
                  key={f._id}
                  {...f}
                  friendVisible={friendVisible}
                  onRemoveFriend={props.onRemoveFriend}
                  onFriendUpdate={props.onFriendUpdate}
                />
              );
            })}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </Container>
  );
}

const FriendItem = props => {
  const [isNameEditMode, setNameIsEditMode] = useState(false);
  const [isEmailEditMode, setIsEmailEditMode] = useState(false);

  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);

  function handleEditEmail(evt) {
    if (evt.keyCode === 13) {
      setIsEmailEditMode(false);
      props.onFriendUpdate({
        _id: props._id,
        name: name,
        email: email
      });
    }
  }

  function handleEditName(evt) {
    if (evt.keyCode === 13) {
      setNameIsEditMode(false);
      props.onFriendUpdate({
        _id: props._id,
        name: name,
        email: email
      });
    }
  }

  return (
    <DataTableRow>
      <DataTableCell onClick={() => !isNameEditMode && setNameIsEditMode(true)}>
        {isNameEditMode ? (
          <TextField
            onKeyDown={handleEditName}
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </DataTableCell>
      <DataTableCell
        onClick={() => !isEmailEditMode && setIsEmailEditMode(true)}
      >
        {isEmailEditMode ? (
          <TextField
            onKeyDown={handleEditEmail}
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
        ) : (
          <span>{email}</span>
        )}
      </DataTableCell>
      <DataTableCell>
        {!props.friend ? " - " : props.friendVisible ? props.friend.name : "🙈"}
      </DataTableCell>
      <DataTableCell>
        <Button onClick={() => props.onRemoveFriend(props._id)}>excluir</Button>
      </DataTableCell>
    </DataTableRow>
  );
};
