"use client"

import React, { useEffect, useRef, useState } from "react"
import { 
    Card,
    CardContent,
    CardFooter
 } from "@/components/UI/Card"
import toast from "react-hot-toast"
import { useSocket } from "@/helper/SocketProvider"
import { useSearchParams } from "next/navigation"

const ShareCard = () => {
    // States

    const userDetails = useSocket();
    // to store the socketID of the peer
    const [peerID, setPeerID] = useState("");
    // to store the uniqueID of the peer
    const [userID, setUserID] = useState<any>()
    // to track whether data has been copied to the clipboard
    const [isCopied, setIsCopied] = useState(false);
    // to track whether the peer as accepted the offer
    const [acceptCaller, setAcceptCaller] = useState(false)
    // used to store the response from the signalling server
    const [signallingData, setSignallingData] = useState<any>()
    const searchParams = useSearchParams()
    // initialzing a separate thread for file manipulation 
    const workerRef = useRef<Worker>();

    // Functions

    // to add user details to the socket database when a connecton is established
    const addUserToSocketDB = () => {
        userDetails.socket.on("connect", () => {
            setUserID(userDetails.userID);
            userDetails.socket.emit("details", {
                socketId: userDetails.socket.id,
                uniqueId: userDetails.userID
            })
        })
    }

    // genearating a toast if the user was successfully able to copy the unique url
    function CopyToClipboard(value: any){
        setIsCopied(true);
        toast.success("Copied");
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    }

    useEffect(() => {
        // for file handling tasks
        workerRef.current = new Worker(
            new URL("../lib/worker.ts", import.meta.url)
        )

        addUserToSocketDB()

        // from the unqiue generated url extracting the the peerID 
        if(searchParams.get("code")) {
            setPeerID(String(searchParams.get("code")));
        }

        // using the signalling server to make an offer to the peer
        userDetails.socket.on("signalling", (data: any) => {
            setAcceptCaller(true)
            setSignallingData(data)
            setPeerID(data.from)
        })
    }, [])

    return (
        <Card className="sm:max w-[450px] max-w-[95%]">
            <CardContent className="mt-8">

            </CardContent>
        </Card>
    );
}

export default ShareCard;