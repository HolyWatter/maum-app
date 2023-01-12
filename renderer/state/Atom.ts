import { atom } from "recoil";

export const userLocalId = atom({
  key: "localUserId",
  default : ""
})

export const loginState = atom({
  key : "loginState",
  default : false
})