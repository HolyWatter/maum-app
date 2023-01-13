import {
  getDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../pages/firebase";
import { userLocalId } from "../state/Atom";

export default function ChatRoomList() {
  const localId = useRecoilValue(userLocalId);
  const router = useRouter();
  const [chatRoomList, setChatRoomList] = useState([]);

  useEffect(() => {
    getChatRoomList();
  }, []);

  const getChatRoomList = async () => {
    const docs = await getDoc(doc(db, "chatRooms", localId));
    setChatRoomList(Object.entries(docs.data()));
  };

  const clickRoomList = (path) =>{
    router.push(`/chatroom/${path}`)
  }
  return (
    <div className="w-[200px] h-full bg-gray-300 border-r">
      <div className="mb-2">
        <p>채팅방 리스트</p>
      </div>
      <div>
        {chatRoomList.map((chat) => (
          <button key={chat[0]} className="flex items-center space-x-3 border-b py-3" onClick={()=> {clickRoomList(chat[0])}}>
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
            {chat[1].userInfo.email ? 
            <p>{chat[1].userInfo.email}</p> :
             <div>
              <p>단체 채팅</p>
                {chat[1].userInfo.map(item => 
                    <p key={item.uid}>{item.email}</p>
                  )}
              </div>}
          </button>
        ))}
      </div>
    </div>
  );
}
