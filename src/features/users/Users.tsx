import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchData } from "./usersSlice";

export const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return <div></div>;
};
