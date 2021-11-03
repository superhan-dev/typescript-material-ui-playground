import React from "react";
import { TodoForm } from "../features/todos/TodoForm";
import { makeStyles } from "@mui/styles";
import { TodoList } from "../features/todos/TodoList";
import { Box, Container } from "@mui/material";
import { Posts } from "../features/posts/Posts";

export const Todos: React.FC = () => {
  return (
    <Container>
      <Box my={3} display="flex" justifyContent="center" alignItems="center">
        <TodoForm />
      </Box>

      <Box my={3} display="flex" justifyContent="center" alignItems="center">
        <TodoList />
      </Box>
    </Container>
  );
};
