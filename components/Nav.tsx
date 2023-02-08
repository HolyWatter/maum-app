import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "./state/Atom";
import MenuModal from "./MenuModal";

export default function Nav() {
  const isLogin = useRecoilValue(loginState);
  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);
  const router = useRouter();

  const clickLogo = ()=>{
    router.push("/")
  }

  const clickLogin = () => {
    router.push("/login");
  };
  const clickSignUp = () => {
    router.push("/signup");
  };

  const clickMenu = () => {
    setIsMenuModal((prev) => !prev);
  };
  return (
    <div className="fixed w-full min-w-[300px] h-[50px] p-2 bg-gray-200 flex justify-between">
      <p onClick={clickLogo} className="text-origin text-xl font-bold">Maum</p>
      {isLogin ? (
        <div>
          <button onClick={clickMenu}>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          {isMenuModal && <MenuModal setIsMenuModal={setIsMenuModal} />}
        </div>
      ) : (
        <div className="space-x-3">
          <button
            onClick={clickSignUp}
            className="w-[80px] bg-gray-500 border text-white py-1 rounded-md"
          >
            회원가입
          </button>
          <button
            onClick={clickLogin}
            value="/login"
            className="w-[80px] bg-origin border text-white py-1 rounded-md"
          >
            로그인
          </button>
        </div>
      )}
    </div>
  );
}
