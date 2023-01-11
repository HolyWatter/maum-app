import { atom } from "recoil";

export const loginState = atom<boolean | undefined>({
  key: "loginStatus",
  default: false,
});

export const userLocalId = atom<string | undefined>({
  key: "userLocalId",
  default: "",
});
