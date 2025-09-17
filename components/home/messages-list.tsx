function MessagesList() {
  return (
    <section className="w-2xs max-w-full mx-auto">
      <h2 className="mb-4 text-gray-500">Messages:</h2>
      <ul className="flex flex-col items-stretch gap-2">
        {new Array(20).fill(null).map((_, index) => (
          <li
            key={index}
            className="bg-blue-100 rounded-xl px-3 py-2 rounded-bl-none flex items-start gap-2"
          >
            <span>{">"}</span>
            <p>Simple Message that longs enough to fill all space</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MessagesList;
