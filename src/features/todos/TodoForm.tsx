import React, { useState } from "react";
import {
  Input,
  Button,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Card,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Todo } from "../../types";

import { useAddTodoMutation } from "../../services/todos";

const defaultValues: Todo = {
  id: "",
  text: "",
  active: false,
};

export const TodoForm = () => {
  const [todo, setTodo] = useState<Pick<Todo, "id">>(defaultValues);

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const { control, handleSubmit, reset } = useForm<Todo>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Todo> = async (data, event) => {
    try {
      await addTodo(data).unwrap();
      setTodo(defaultValues);
      reset(defaultValues);
    } catch (error) {
      console.log("error", error);
    }
  };

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
              name="text"
              control={control}
              render={({ field }) => <Input fullWidth {...field} />}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : <p>Create</p>}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
