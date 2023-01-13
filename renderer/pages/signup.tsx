import { useRouter } from "next/router";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { UserInfo } from "./interface";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

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
      const response = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password,
      );
      await addDoc(collection(db, "userList"), {
        email: userInfo.email,
        uid: response.user.uid,
      });
      await setDoc(doc(db, "chatRooms", response.user.uid) , {})
      alert("회원가입되었습니다.");
      router.push("/login");
    } catch (error) {
      alert(ERROR_MESSAGE[error.code]);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="mt-[100px] font-bold text-origin text-[100px]">Maum</div>
      <p className="text-gray-500">서비스를 이용하기 위해 회원가입해주세요</p>
      <div>
      <AuthForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        buttonText="회원가입"
        onSubmitForm={submitSignUpForm}
      />
      </div>
      <div className="flex space-x-5">
        <p>이미 회원이신가요??</p>
        <button onClick={toLogin} className="text-blue-600 underline">
          로그인
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
