import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loginState, userLocalId } from "./state/Atom";

export default function MenuModal({setIsMenuModal}) {
  const router = useRouter();
  const setIsLogin = useSetRecoilState(loginState);
  const setUserId = useSetRecoilState(userLocalId);

  const clickLogout = () => {
    setIsLogin(false);
    setUserId("");
    localStorage.removeItem('token');
    router.push("/home");
    alert("정상적으로 로그아웃 되었습니다.")
    setIsMenuModal(false)
  };

  const clickChat= () =>{
    router.push("/chatroom")
    setIsMenuModal(false)
  }
  
  return (
    <div className="absolute py-2 px-4 right-0 bg-white border rounded-md space-y-3">
      <button className="flex items-center space-x-4" onClick={clickChat}>
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
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
        <p>채팅하기</p>
      </button>
      <button onClick={clickLogout} className="flex items-center space-x-4">
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
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <p>로그아웃</p>
      </button>
    </div>
  );
}
