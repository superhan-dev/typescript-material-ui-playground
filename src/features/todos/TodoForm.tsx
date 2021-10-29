import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Card,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todosSlice";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { v4 as uuid } from "uuid";

import { TodoItem } from "../todos/todosSlice";

const defaultValues: TodoItem = {
  id: "",
  task: "",
};

export const TodoForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<TodoItem>(defaultValues);

  const { control, handleSubmit, reset } = useForm<TodoItem>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TodoItem> = (data, event) => {
    dispatch(addTodo({ id: uuid(), task: data.task }));
    // submit 후 reset을 하기 위해 반드시 useState로 data를 set해주어야 한다.
    setData(data);
    reset(defaultValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {};

  return (
    // <Card sx={{ minWidth: 300, maxWidth: 500 }}>
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            What you want to do?
          </Typography>
        }
      ></CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <Controller
              name="task"
              control={control}
              render={({ field }) => <Input fullWidth {...field} />}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small">
            Create
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
