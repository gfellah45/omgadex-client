import { baseUrl } from "./apiUrl";
import SecureLS from "secure-ls";

export const makeRequest = (url: string, method: string, body?: any) => {
  const ls = new SecureLS();
  const token = ls.get("token");
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token ? token : ""}`,
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(`${baseUrl}${url}`, options).then((response) => response.json());
};
