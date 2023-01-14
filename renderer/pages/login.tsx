import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "../components/AuthForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { loginEmail, loginState, userLocalId } from "../state/Atom";
import { useSetRecoilState } from "recoil";
import { UserInfo } from "./interface";

export default function login() {
  const setLoginStatus = useSetRecoilState(loginState);
  const setUserLocalId = useSetRecoilState(userLocalId);
  const setLoginEmail = useSetRecoilState(loginEmail)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const toMain = () => {
    router.push("/home");
  };

  const toSignUp = () => {
    router.push("/signup");
  };

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      localStorage.setItem("token", (response.user as any).accessToken);
      setLoginStatus(true);
      setUserLocalId(response.user.uid)
      setLoginEmail(response.user.email)
      router.push("/home");
      alert("로그인 되었습니다.");
    } catch (error) {
      alert(ERROR_MESSAGE[error.code]);
    }
  }
  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="mt-[100px] font-bold text-origin text-[100px]">Maum</div>
      <p className="text-gray-500">서비스를 이용하기 위해 로그인해주세요 </p>
      <AuthForm
        setUserInfo={setUserInfo}
        userInfo={userInfo}
        buttonText="로그인"
        onSubmitForm={submitLoginForm}
      />
      <div className="flex space-x-5">
        <p>아직 회원이 아니신가요?</p>
        <button onClick={toSignUp} className="text-blue-600 underline">
          회원가입
        </button>
      </div>
    </div>
  );
}

const ERROR_MESSAGE = {
  "auth/invalid-email": "이메일 형식을 다시 확인해주세요.",
  "auth/network-request-failed": "네트워크 통신이 원활하지 않습니다.",
  "auth/user-not-found": "존재하지 않는 이메일입니다.",
  "auth/wrong-password": "비밀번호가 일치하지 않습니다.",
  "auth/internal-error": "입력하신 정보를 다시 확인해주세요",
};
