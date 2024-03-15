// the logic for the chatting part is implemented
import React, { useEffect, useRef, useState } from "react"
import { Input } from "./UI/Input"
import { Button } from "./UI/Button"
import { SendHorizonal } from "lucide-react"
import { useSocket } from "@/helper/SocketProvider"

const Chat = () => {
    // States

    // to store the messages until the connection lasts
    const [message, setMessage] = useState<any[]>([]);
    // to store a new message by any of the peer
    const [newMessage, setNewMessage] = useState<any>("");
    const inputRef = useRef<any>();
    const buttonRef = useRef<any>();
    const Socket = useSocket();


    // Functions

    // fucntion is triggered when a new message is ent
    const handleMessage = () => {
        if(newMessage.trim() !== ""){
            const newMessages = [...message, { text: newMessage, sender: "me" }];
            setMessage(newMessages);
            setNewMessage("");

            // to send the message to the peer
            const peer = Socket.peerState;
            if (peer) {
                const msgData = {
                    type: "messages",
                    text: newMessage,
                    sender: "other"
                };
            
                try {
                    peer.send(JSON.stringify(msgData));
                } catch (error) {
                    console.log("Error message:", error);
                }
            } else {
                console.log("Peer is null");
            }            
        }
        console.log(Socket.peerState);
    }


    useEffect(() => {
        const peer = Socket.peerState;
    
        if(peer){
          peer.on("data", (data: any) => {
            // Parse and display the incoming message
            const receivedMessage = JSON.parse(data);
            if (receivedMessage.text) {
                setMessage((prevMessages) => [...prevMessages, receivedMessage]);
            }
          });
        }
      }, [Socket.peerState]);


    // eventlistener for incoming message
    React.useEffect(() => {
        const temp = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                inputRef.current.focus();
            }
            else if(e.key === "Enter"){
                buttonRef.current.click();
            }
        } 
        document.addEventListener("keydown", temp);
        return () => {
            document.removeEventListener("keydown", temp)
        }
    }, []);

    return (
        <>
            {/* render the chat ui if a peer is connected */}
            {Socket.peerState ? (
                <div className="flex justify-center sm:w-fit w-full">
                    <div className="flex flex-col flex-wrap border rounded-md sm:min-w-[400px] min-w-[95%] min-h-[400px] p-2">
                        <div className="flex-1 overflow-y-auto w-full">
                            {message.map((msg, key) => (
                                <div 
                                key={key}
                                className={`flex ${
                                    msg.sender === "me" ? "justify-end" : "justify-start"
                                  } mb-[2px]`}
                                >
                                <div
                                    className={`flex flex-wrap sm:max-w-[200px] max-w-[150px] text-sm rounded-3xl px-3 py-1 ${
                                        msg.sender === "me"
                                          ? "bg-blue-500 text-white"
                                          : "bg-zinc-700  text-white"
                                      }`}
                                ></div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between bottom-1 w-full space-x-1">
                            <div className="flex w-full">
                                <Input 
                                    type="text"
                                    value={newMessage}
                                    onChange={(event) => {
                                        setNewMessage(event.target.value)
                                    }}
                                    ref={inputRef}
                                    placeholder={`Send Message to ${Socket.userID}`}
                                />
                            </div>
                            <div>
                                <Button
                                    variant={"outline"}
                                    className="p-3"
                                    onClick={handleMessage}
                                    ref={buttonRef}
                                >
                                    <SendHorizonal size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Chat;