import * as React from "react";
import {
  List,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  Box,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import moment from "moment";

import { useGetTodosQuery, useDeleteTodoMutation } from "../../services/todos";

import { Todo } from "../../types";

export const TodoList = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todoId: string
  ) => {
    event.preventDefault();
    try {
      await deleteTodo(todoId);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" />
        </Box>
      ) : (
        <Card
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <CardContent>
            {(todos || []).length <= 0 ? (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemText primary={"등록된 목록이 없습니다."} />
                </ListItem>
              </List>
            ) : (
              <>
                {todos?.map((todo, index) => {
                  return (
                    <List
                      key={todo.id}
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={(event) => handleDelete(event, todo.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={todo.text}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {moment().format("YYYY-MM-DD")}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  );
                })}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
