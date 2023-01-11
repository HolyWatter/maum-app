import React from "react";
import { useRouter } from "next/router";
import { loginState } from "../state/Atom";
import { useRecoilValue } from "recoil";

function Home() {
  const router = useRouter();
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


  return (
    <>
      <div className="flex flex-col space-y-5">메인페이지 입니다.</div>
      <div className="w-96 h-10 border rounded-md border-gray-300 focus:outline-origin">
        <button onClick={toLogin} className="bg-origin text-white">
          로그인페이지로
        </button>
        <button onClick={toSignUp}>회원가입페이지로</button>
        <button onClick={toChat}>채팅앱</button>
        <button onClick={toUserList}>유저목록</button>

      </div>
    </>
  );
}

export default Home;
