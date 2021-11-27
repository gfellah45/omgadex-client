import { baseUrl } from "./apiUrl";

export const makeRequest = (url: string, method: string, body?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(`${baseUrl}${url}`, options).then((response) => response.json());
};
