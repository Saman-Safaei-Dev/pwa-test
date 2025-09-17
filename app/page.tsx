import MessagesList from "@/components/home/messages-list";
import SendMessageForm from "@/components/home/send-message-form";

function Home() {
  return (
    <div className="py-10">
      <h1 className="text-center text-lg font-bold mb-8">Messenger</h1>

      <SendMessageForm />
      <MessagesList />
    </div>
  );
}

export default Home;
