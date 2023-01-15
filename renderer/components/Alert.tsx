export default function Alert({ messages, closeAlert }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] px-10 py-5 bg-white rounded-sm space-y-5 text-center">
      <p>{messages}</p>
      <button
        className="w-full rounded-md py-1 bg-origin text-white"
        onClick={closeAlert}
      >
        확인
      </button>
    </div>
  );
}
