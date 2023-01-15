import { db } from "../components/firebase";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  orderBy,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loginEmail, userLocalId } from "./state/Atom";
import { useRecoilValue } from "recoil";
import Alert from "./Alert";

interface User {
  email: string;
  uid: string;
}

export default function GroupModal({ setIsGroupModal }) {
  const localId = useRecoilValue(userLocalId);
  const email = useRecoilValue(loginEmail);
  const [userList, setUserList] = useState([]);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [checkedArr, setCheckedArr] = useState<string[]>([]);
  const [inviteUserList, setInviteUserList] = useState<User[]>([
    {
      uid: localId,
      email,
    },
  ]);
  const router = useRouter();

  const getUserList = async () => {
    const q = query(collection(db, "userList"), orderBy("email", "asc"));
    const docs = await getDocs(q);
    const user = docs.docs.map((doc) => ({
      ...doc.data(),
    }));
    setUserList(user);
  };
  useEffect(() => {
    getUserList();
  }, []);

  const selectUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedArr([...checkedArr, e.target.value]);
      setInviteUserList([
        ...inviteUserList,
        {
          email: e.target.name,
          uid: e.target.value,
        },
      ]);
    } else {
      setCheckedArr(checkedArr.filter((item) => e.target.value !== item));
      setInviteUserList(
        inviteUserList.filter((item) => e.target.value !== item.uid)
      );
    }
  };
  const clickCreateRoom = async () => {
    if (inviteUserList.length > 2) {
      const combinedUid = inviteUserList
        .map((item) => item.uid)
        .sort()
        .join("");
      const response = await getDoc(doc(db, "chats", combinedUid));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedUid), { messages: [] });
        inviteUserList.forEach(function async(item) {
          updateDoc(doc(db, "chatRooms", item.uid), {
            [combinedUid + ".userInfo"]: inviteUserList,
          });
        });
      }
      router.push(`/chatroom/${combinedUid}`);
    } else {
      setAlertMessage("두명 이상의 유저를 선택해주세요");
      setIsAlert(true);
    }
  };

  const clickClose = () => {
    setIsGroupModal((prev) => !prev);
  };

  const closeAlert = () => {
    setIsAlert((prev) => !prev);
    if (alertMessage === "로그인 되었습니다.") {
      router.push("/home");
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border  rounded-sm w-[300px] min-h-[200px] space-y-2 bg-white z-10">
      <div className="flex flex-col items-center space-y-3">
        <p className="w-full py-2 text-center border-b">유저목록</p>
        {userList.map((item) =>
          item.uid !== localId ? (
            <label
              key={item.uid}
              className="flex items-center space-x-2 w-full justify-start"
            >
              <input
                checked={checkedArr.includes(item.uid)}
                className="hidden"
                onChange={selectUser}
                type="checkbox"
                name={item.email}
                value={item.uid}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p>{item.email}</p>
              <div
                className={
                  checkedArr.includes(item.uid)
                    ? "w-3 h-3 rounded-full bg-origin"
                    : "w-3 h-3 border rounded-full"
                }
              >
                {checkedArr.includes(item.uid) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </div>
            </label>
          ) : null
        )}
      </div>
      <div className="flex space-x-3 justify-center py-3 border-t">
        <button
          onClick={clickCreateRoom}
          className="w-[80px] py-1 rounded-sm bg-origin text-white"
        >
          생성하기
        </button>
        <button
          onClick={clickClose}
          className="w-[80px] py-1 rounded-sm bg-gray-500 text-white"
        >
          닫기
        </button>
      </div>
      {isAlert && (
        <div>
          <div
            className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-gray-800/30"
            onClick={closeAlert}
          ></div>
          <Alert messages={alertMessage} closeAlert={closeAlert} />
        </div>
      )}
    </div>
  );
}
