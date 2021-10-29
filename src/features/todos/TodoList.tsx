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
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store";
import moment from "moment";
import { deleteTodo, patchTodo, TodoItem } from "./todosSlice";

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

  const handleUpdate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: TodoItem,
    index: number
  ) => {
    event.preventDefault();
    dispatch(patchTodo({ index, task: todo.task }));
  };

  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        {todos.items.length <= 0 ? (
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
            {todos.items.map((todo, index) => {
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
                          onClick={(event) => handleUpdate(event, todo, index)}
                          color="info"
                        >
                          <CreateIcon />
                        </IconButton>
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
                </List>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};
