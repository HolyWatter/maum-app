import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userLocalId, loginEmail } from "../components/state/Atom";
import { db } from "../components/firebase";

interface Users {
  email: string;
  uid: string;
}

export default function UserList() {
  const localId = useRecoilValue(userLocalId);
  const email = useRecoilValue(loginEmail);
  const [userList, setUserList] = useState<Users[]>([]);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [clickedUserInfo, setClickedUserInfo] = useState<Users>({
    email: "",
    uid: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (localId === "") {
      router.push("/login");
      alert("로그인이 필요한 서비스입니다.");
    }
    const q = query(collection(db, "userList"), orderBy("email", "asc"));
    onSnapshot(q, (snapshot) => {
      const user = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserList(user as any);
    });
  }, []);

  const clickUser = (uid: string, email: string) => {
    setUserModal((prev) => !prev);
    setClickedUserInfo({
      uid: uid,
      email: email,
    });
  };
  const clickClose = () => {
    setUserModal((prev) => !prev);
  };

  const clickChatWithUser = async () => {
    const combinedUid =
      localId > clickedUserInfo.uid
        ? clickedUserInfo.uid + localId
        : localId + clickedUserInfo.uid;

    try {
      const response = await getDoc(doc(db, "chats", combinedUid));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedUid), { messages: [] });
        await updateDoc(doc(db, "chatRooms", localId), {
          [combinedUid + ".userInfo"]: {
            email: clickedUserInfo.email,
            uid: clickedUserInfo.uid,
          },
        });
        await updateDoc(doc(db, "chatRooms", clickedUserInfo.uid), {
          [combinedUid + ".userInfo"]: {
            email,
            uid: localId,
          },
        });
      }
      router.push(`/chatroom/${combinedUid}`);
    } catch {}
  };

  return (
    <div className="flex flex-col min-w-[300px]">
      <div className="py-2 border-b text-center">
        <p className="text-lg">maum app에 가입된 유저목록입니다</p>
        <p className="text-xs text-gray-400">유저를 클릭하면 대화를 시작할 수 있습니다.</p>
      </div>
      {userList.map((user) =>
        user.uid !== localId ? (
          <button
            key={user.uid}
            className="flex items-center p-3 border-b space-x-3"
            onClick={() => {
              clickUser(user.uid, user.email);
            }}
          >
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
            <p>{user.email}</p>
          </button>
        ) : null
      )}
      {userModal && (
        <div>
          <div
            onClick={clickClose}
            className="absolute top-0 right-0 left-0 bottom-0 w-screen h-screen bg-gray-800/40"
          ></div>
          <div className="flex flex-col items-center justify-center space-y-5 py-3 w-[300px] h-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border rounded-md bg-white">
            <p>{clickedUserInfo.email}</p>
            <div className="space-x-4">
              <button
                onClick={clickChatWithUser}
                className="w-[100px] h-[40px] bg-origin text-white rounded-md"
              >
                1:1로 채팅하기
              </button>
              <button
                onClick={clickClose}
                className="w-[100px] h-[40px] bg-gray-500 text-white rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
