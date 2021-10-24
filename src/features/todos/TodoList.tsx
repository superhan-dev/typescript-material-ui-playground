import * as React from "react";
import {
  List,
  Card,
  CardContent,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";

import { deleteTodo } from "./todosSlice";

export const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todoId: string
  ) => {
    event.preventDefault();
    dispatch(deleteTodo(todoId));
  };

  return (
    <>
      {todos.items.length > 0 && (
        <Card>
          <CardContent>
            {todos.items.map((todo) => {
              return (
                <List
                  key={todo.id}
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(event) => handleDelete(event, todo.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={todo.task}
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
                  {/* <Divider /> */}
                </List>
              );
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
};
