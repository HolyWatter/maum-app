import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { useRecoilValue } from "recoil";
import { userLocalId } from "../state/Atom";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const userId = useRecoilValue(userLocalId);
  const router = useRouter();

  const toMain = () => {
    router.push("/home");
  };

  useEffect(() => {
    const q = query(collection(db, "chatMessage"), orderBy("created", "asc"))
    onSnapshot(q, (snapshot) => {
      const newMessagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessagesArray);
    });
  }, []);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  async function addMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let date = new Date();
    if(text !== ""){
      const docRef = addDoc(collection(db, "chatMessage"), {
        text,
        created: Intl.DateTimeFormat("kr", { timeStyle: "medium" }).format(date),
        userId,
      });
      setText("");
    }else return
  }

  return (
    <>
      <button onClick={toMain}>메인으로</button>
      <div className="flex flex-col items-center pb-20 overflow-y-auto">
        <p>Chats</p>
        <div className="flex flex-col w-[430px] space-y-1">
          {messages.map((items) =>
            items.userId === userId ? (
              <div key={items.id} className="flex items-center justify-end space-x-3">
                <p className="text-[7px]">{items.created}</p>
                <p className="max-w-[200px] px-3 bg-gray-500 rounded-md text-white font-light">{items.text}</p>
              </div>
            ) : (
              <div key={items.id} className="flex items-center justify-start space-x-3">
                <p className="max-w-[200px] px-3 font-light">{items.text}</p>
                <p className="text-[7px]">{items.created}</p>
              </div>
            )
          )}
        </div>
        <form onSubmit={addMessage} className="fixed bottom-0 flex items-center z-10">
          <input
            value={text}
            onChange={handleTextInput}
            placeholder="메세지를 입력하세요"
            className="w-[350px] h-16 border focus:outline-origin resize-none"
          />
          <button className="w-[80px] h-16 bg-origin text-white text-center rounded-md">
            전송
          </button>
        </form>
      </div>
    </>
  );
}
