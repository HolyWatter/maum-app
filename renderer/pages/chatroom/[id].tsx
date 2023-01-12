import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { userLocalId } from "../../state/Atom";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState(null);
  const userId = useRecoilValue(userLocalId);
  const router = useRouter();

  const toMain = () => {
    router.push("/home");
  };
  useEffect(() => {
    if(userId === ""){
      router.push("/login")
      alert("로그인이 필요한 서비스입니다.")
    }
    const chatPath = router.query.id.toString();
    onSnapshot(doc(db, "chats", chatPath), (snapshot) => {
      snapshot.exists() && setMessages(snapshot.data().messages);
    });
  }, []);

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
          id: Date.now(),
          text,
          created: new Intl.DateTimeFormat("kr", { timeStyle: "short" }).format(
            date
          ),
          userId,
        }),
      });
      setText("");
    } else return;
  }

  return (
    <>
      <button onClick={toMain}>메인으로</button>
      <div className="flex flex-col items-center pb-20 overflow-y-auto">
        <p>Chats</p>
        <div className="flex flex-col w-[430px] space-y-1">
          {messages &&
            messages?.map((items) =>
              items.userId === userId ? (
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
                <div
                  key={items.id}
                  className="flex items-center justify-start space-x-3"
                >
                  <p className="max-w-[200px] px-3 bg-gray-500 rounded-md text-white font-light">
                    {items.text}
                  </p>
                  <p className="text-[7px]">{items.created}</p>
                </div>
              )
            )}
        </div>
        <form
          onSubmit={addMessage}
          className="fixed bottom-0 flex items-center z-10"
        >
          <input
            value={text}
            onChange={handleTextInput}
            placeholder="메세지를 입력하세요"
            className="w-[350px] h-16 pl-2 border focus:outline-origin resize-none"
          />
          <button className="w-[80px] h-16 bg-origin text-white text-center rounded-md">
            전송
          </button>
        </form>
      </div>
    </>
  );
}
