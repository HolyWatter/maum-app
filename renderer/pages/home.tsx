import React, { useState } from "react";
import { useRouter } from "next/router";
import GroupModal from "../components/GroupModal";

function Home() {
  const router = useRouter();
  const [isGroupModal, setIsGroupModal] = useState<boolean>(false);
  const toLogin = () => {
    router.push("/login");
  };
  const toSignUp = () => {
    router.push("/signup");
  };
  const toChat = () => {
    router.push("/chat");
  };
  const toUserList = () => {
    router.push("/userlist");
  };
  const createGroupChat = () =>{
    setIsGroupModal((prev) => !prev)
  }

  return (
    <div>
      <div className="flex flex-col space-y-5">메인페이지 입니다.</div>
      <div className="w-96 h-10 border rounded-md border-gray-300 focus:outline-origin">
        <button onClick={toLogin} className="bg-origin text-white">
          로그인페이지로
        </button>
        <button onClick={toSignUp}>회원가입페이지로</button>
        <button onClick={toUserList}>유저목록</button>
        <button onClick={createGroupChat}>단체채팅생성</button>
        <button onClick={()=> {router.push("/chatroom")}}>챗앱</button>   
      </div>
      {isGroupModal && <GroupModal />}
    </div>
  );
}

export default Home;
