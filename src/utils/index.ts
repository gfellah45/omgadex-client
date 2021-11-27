import { useEffect, useState } from "react";
import SecureLS from "secure-ls";

export const verifyEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const setData = (key: string, value: Iuser) => {
  const ls = new SecureLS();
  ls.set(key, JSON.stringify(value));
};

export const getData = (key: string) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const ls = new SecureLS();
    const data = JSON.parse(ls.get(key));
    setItem(data);
  }, []);

  return item;
};

export const passwordValidator = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
};
