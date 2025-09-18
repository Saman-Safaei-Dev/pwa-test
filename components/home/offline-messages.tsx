type Props = {
  queue: string[];
};

function OfflineMessages(props: Props) {
  const { queue } = props;

  return (
    queue.length > 0 && (
      <div className="w-2xs max-w-full mx-auto mb-8">
        <h3 className="text-red-600 mb-4">Offline Messages:</h3>
        <ul className="flex flex-col items-stretch gap-2">
          {queue.toReversed().map((item, index) => (
            <li
              key={index}
              className="bg-red-100 rounded-xl px-3 py-2 rounded-bl-none"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default OfflineMessages;
