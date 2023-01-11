import { useRouter } from "next/router";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { UserInfo } from "./interface";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function signup() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const toMain = () => {
    router.push("/home");
  };

  const toLogin = () => {
    router.push("/login");
  };

  async function submitSignUpForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      alert("회원가입되었습니다.");
    } catch (error) {
      console.log(error.code);
      alert(ERROR_MESSAGE[error.code]);
    }
  }
  return (
    <div className="flex flex-col items-center space-y-10">
      <button onClick={toMain}>메인으로</button>
      <div className="mt-[100px] font-bold text-origin text-[100px]">Maum</div>
      <p className="text-gray-500">서비스를 이용하기 위해 회원가입해주세요</p>
      <AuthForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        buttonText="회원가입"
        onSubmitForm={submitSignUpForm}
      />
      <div className="flex space-x-5">
        <p>아직 회원이 아니신가요?</p>
        <button onClick={toLogin} className="text-blue-600 underline">
          회원가입
        </button>
      </div>
    </div>
  );
}

const ERROR_MESSAGE = {
  "auth/invalid-email": "이메일 형식을 다시 확인해주세요.",
  "auth/email-already-in-use": "이미 사용중인 메일입니다.",
  "auth/weak-password": "비밀번호는 6글자 이상이어야 합니다.",
  "auth/network-request-failed": "네트워크 통신이 원활하지 않습니다.",
  "auth/internal-error": "입력하신 정보를 다시 확인해주세요",
};
