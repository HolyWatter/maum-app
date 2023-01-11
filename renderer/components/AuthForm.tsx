import { UserInfo } from "../pages/interface";

interface Props {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userInfo: UserInfo;
  buttonText: string;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function AuthForm({
  setUserInfo,
  userInfo,
  buttonText,
  onSubmitForm,
}: Props) {
  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  return (
    <form onSubmit={onSubmitForm} className="flex flex-col space-y-5">
      <input
        className="w-96 h-10 pl-3 border border-grey rounded-md focus:outline-origin"
        placeholder="이메일을 입력해주세요."
        onChange={handleUserInfo}
        type="email"
        name="email"
        value={userInfo.email}
      />
      <input
        onChange={handleUserInfo}
        className="w-96 h-10 pl-3 border border-grey rounded-md focus:outline-origin"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        name="password"
        value={userInfo.password}
      />
      <button className="w-96 h-10 rounded-md bg-origin text-white">{buttonText}</button>
    </form>
  );
}
