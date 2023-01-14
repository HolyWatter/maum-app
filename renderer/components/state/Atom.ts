import { atom } from "recoil";

export const userLocalId = atom({
  key: "localUserId",
  default : ""
})

export const loginEmail = atom({
  key : "loginEmail",
  default : ""
})

export const loginState = atom({
  key : "loginState",
  default : false
})