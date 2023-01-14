import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "../../state/Atom";
import ChatRoomList from "../../components/ChatRoomList";

export default function Chatroom() {
  const loginStatus = useRecoilValue(loginState)
  const router = useRouter();
  useEffect(()=>{
    if(!loginStatus){
      router.push("/login")
      alert('로그인이 필요한 서비스입니다.')
    }
  } ,[])
  return (
    <div className="flex h-full">
      <ChatRoomList />
      <div className="w-full bg-gray-900 flex flex-col items-center py-[250px]">
        <p className="text-origin text-5xl font-bold">Maum</p>
        <p className="text-white">채팅방을 선택해 주세요</p>
      </div>
    </div>
  );
}
