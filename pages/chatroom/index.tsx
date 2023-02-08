import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../../components/state/Atom";
import ChatRoomList from "../../components/ChatRoomList";
import Alert from "../../components/Alert";
import { useRouter } from "next/router";

export default function Chatroom() {
  const loginStatus = useRecoilValue(loginState);
  const router = useRouter();
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    if (!loginStatus) {
      setAlertMessage("로그인이 필요한 서비스입니다.");
      setIsAlert(true);
    }
  }, [loginStatus]);

  const closeAlert = () => {
    setIsAlert((prev) => !prev);
    if (alertMessage === "로그인이 필요한 서비스입니다.") {
      router.push("/login");
    }
  };

  return (
    <div className="flex h-full">
      <ChatRoomList />
      <div className="w-full bg-gray-900 flex flex-col items-center py-[250px]">
        <p className="text-origin text-5xl font-bold">Maum</p>
        <p className="text-white">채팅방을 선택해 주세요</p>
      </div>
      {isAlert && (
        <div>
          <div
            className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-gray-800/30"
            onClick={closeAlert}
          ></div>
          <Alert messages={alertMessage} closeAlert={closeAlert} />
        </div>
      )}
    </div>
  );
}
