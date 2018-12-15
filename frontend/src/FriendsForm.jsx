import React, { useState } from "react";
import styled, { css } from "styled-components";

import { TextField, TextFieldHelperText } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { CircularProgress } from "@rmwc/circular-progress";

import "@rmwc/circular-progress/circular-progress.css";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  /* align-items: center; */
  /* margin-top: 100px; */
  flex-basis: 35%;
  justify-content: center;

  & button {
    align-self: start;
    & .rmwc-circular-progress {
      margin: 0 0 0 5px;
    }
  }
`;

const FormField = styled.div`
  display: flex;
  flex-flow: column;
  margin: 10px 0;
`;

const TextRequired = styled(TextFieldHelperText)`
  color: red !important;
`;

export default function FriendsForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameRequired, setNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);

  function handleClick() {
    let error = null;

    if (!name || name.trim() === "") {
      setNameRequired(true);
      error = true;
    } else {
      setNameRequired(false);
    }

    if (!email || email.trim() === "") {
      setEmailRequired(true);
      error = true;
    } else {
      setEmailRequired(false);
    }

    if (error) {
      return;
    }

    props.onFriendAdd({
      name: name,
      email: email
    });

    setName("");
    setEmail("");
  }

  return (
    <Container>
      <h2>Cadastre seus amigos para realizar um amigo secreto</h2>
      <FormField>
        <TextField
          outlined
          label="Nome"
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
        <TextRequired persistent validationMsg>
          {nameRequired && "O nome é obrigatório"}
        </TextRequired>
      </FormField>
      <FormField>
        <TextField
          outlined
          label="Email"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />
        <TextRequired persistent validationMsg>
          {emailRequired && "O email é obrigatório"}
        </TextRequired>
      </FormField>
      <div>
        <Button raised onClick={handleClick}>
          Adicionar{" "}
          {props.isFetching && <CircularProgress theme={"onPrimary"} />}
        </Button>
      </div>
    </Container>
  );
}
