import { Button, Input, Label, TextField } from "@/components/client";

function SendMessageForm() {
  return (
    <form className="flex flex-col items-center w-2xs max-w-full mx-auto gap-3 mb-8">
      <TextField className="w-full">
        <Label className="text-gray-500 mb-2 block">Message:</Label>
        <Input className="block w-full bg-gray-100 py-2 px-3" />
      </TextField>

      <div className="flex justify-between w-full items-start">
        <p>
          <span className="text-gray-400">Status:</span>{" "}
          <span className="text-green-600 font-bold">Online</span>
        </p>

        <Button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
          Send
        </Button>
      </div>
    </form>
  );
}

export default SendMessageForm;
