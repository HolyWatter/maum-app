import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../components/firebase";
import { useRecoilValue } from "recoil";
import { loginEmail, userLocalId } from "../../components/state/Atom";
import ChatRoomList from "../../components/ChatRoomList";
import Alert from "../../components/Alert";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState(null);
  const localId = useRecoilValue(userLocalId);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const email = useRecoilValue(loginEmail);
  const router = useRouter();

  useEffect(() => {
    if (localId === "") {
      setAlertMessage("로그인이 필요한 서비스입니다.");
      setIsAlert(true);
    }
    const chatPath = router.query.id.toString();
    onSnapshot(doc(db, "chats", chatPath), (snapshot) => {
      snapshot.exists() && setMessages(snapshot.data().messages);
    });
  }, [router.query.id, localId]);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  async function addMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const date = new Date();
    const chatPath = router.query.id.toString();
    if (text !== "") {
      await updateDoc(doc(db, "chats", chatPath), {
        messages: arrayUnion({
          email,
          id: Date.now(),
          text,
          created: new Intl.DateTimeFormat("kr", { timeStyle: "short" }).format(
            date
          ),
          userId: localId,
        }),
      });
      setText("");
    } else return;
  }

  const closeAlert = () => {
    setIsAlert((prev) => !prev);
    if (alertMessage === "로그인이 필요한 서비스입니다.") {
      router.push("/login");
    }
  };

  return (
    <div className="flex h-full">
      <ChatRoomList />
      <div className="w-full h-full">
        <div className="h-full flex flex-col items-endpb-20">
          <p className="w-full py-3 bg-white border-b text-center">Chats</p>
          <div className="flex flex-col w-full h-full px-2 space-y-1 overflow-y-auto">
            {messages &&
              messages?.map((items) =>
                items.userId === localId ? (
                  <div
                    key={items.id}
                    className="flex items-center justify-end space-x-3"
                  >
                    <p className="text-[7px]">{items.created}</p>
                    <p className="max-w-[200px] px-3 bg-origin rounded-md text-white font-light">
                      {items.text}
                    </p>
                  </div>
                ) : (
                  <div key={items.id} className="space-y-1">
                    <p className="text-xs text-gray-900">{items.email}</p>
                    <div className="flex items-center justify-start space-x-3">
                      <p className="max-w-[200px] px-3 bg-gray-500 rounded-md text-white font-light">
                        {items.text}
                      </p>
                      <p className="text-[7px]">{items.created}</p>
                    </div>
                  </div>
                )
              )}
          </div>
          <form
            onSubmit={addMessage}
            className="w-full right-0 flex items-center z-10"
          >
            <input
              value={text}
              onChange={handleTextInput}
              placeholder="메세지를 입력하세요"
              className="w-full h-16 pl-2 border focus:outline-origin resize-none"
            />
            <button className="w-[80px] h-16 bg-origin text-white text-center rounded-md">
              전송
            </button>
          </form>
        </div>
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
