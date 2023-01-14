import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "../state/Atom";
import GroupModal from "../components/GroupModal";

function Home() {
  const router = useRouter();
  const loginStatus = useRecoilValue(loginState);
  const [isGroupModal, setIsGroupModal] = useState<boolean>(false);

  const toLogin = () => {
    router.push("/login");
  };
  const toSignUp = () => {
    router.push("/signup");
  };
  const toUserList = () => {
    router.push("/userlist");
  };
  const createGroupChat = () => {
    setIsGroupModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center min-w-[440px]">
      <div className="my-[100px] flex flex-col items-center space-y-10">
        <p className="text-3xl">Maum App에 오신 것을 환영합니다</p>
        <p className="text-gray-400">
          Maum app에서는 유저관리와 채팅서비스를 제공합니다.
        </p>
      </div>
      <div className="space-x-5">
        {loginStatus ? (
          <div className="space-x-3">
            <button
              onClick={toUserList}
              className="w-[150px] h-10 rounded-md bg-[#91cbe5] text-white"
            >
              유저목록
            </button>
            <button
              onClick={createGroupChat}
              className="w-[150px] h-10 rounded-md bg-gray-500 text-white"
            >
              단체 채팅 생성
            </button>
            <button
              onClick={() => {
                router.push("/chatroom");
              }}
              className="w-[150px] h-10 rounded-md bg-origin text-white"
            >
              채팅앱
            </button>
          </div>
        ) : (
          <div className="space-x-3">
            <button
              onClick={toLogin}
              className="w-[200px] h-10  rounded-md bg-origin text-white"
            >
              로그인페이지로
            </button>
            <button
              onClick={toSignUp}
              className="w-[200px] h-10  rounded-md bg-gray-500 text-white"
            >
              회원가입페이지로
            </button>
          </div>
        )}
      </div>
      {isGroupModal && (
        <>
          <div
            onClick={createGroupChat}
            className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-gray-800/30"
          ></div>
          <GroupModal setIsGroupModal={setIsGroupModal} />
        </>
      )}
    </div>
  );
}

export default Home;
