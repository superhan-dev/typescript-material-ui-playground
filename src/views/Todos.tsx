import React from "react";
import { TodoForm } from "../features/todos/TodoForm";
import { makeStyles } from "@mui/styles";
import { TodoList } from "../features/todos/TodoList";
import { Box, Container } from "@mui/material";
import { Posts } from "../features/posts/Posts";

export const Todos = () => {
  return (
    <Container>
      <Box mb={5} display="flex" justifyContent="center" alignItems="center">
        <TodoForm />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <TodoList />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Posts />
      </Box>
    </Container>
  );
};
