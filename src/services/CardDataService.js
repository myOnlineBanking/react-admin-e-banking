import { CARD_URL } from ".";
import http from "../http-common";

export function getList() {
  return fetch(CARD_URL + "getAll").then((data) => data.json());
}
export function getCard(id) {
  return fetch(CARD_URL + "get?id=" + id).then((data) => data.json());
}

export function enabledCard(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  fetch(CARD_URL + "enable", requestOptions).then((response) =>
    response.json()
  );
}

export function disabledCard(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  fetch(CARD_URL + "disable", requestOptions).then((response) =>
    response.json()
  );
}
 
 
export const updateURL = CARD_URL + "update";
