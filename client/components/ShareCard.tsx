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
import Peer from "simple-peer"

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
    // to show the the file download progress
    const [fileDownloadProgress, setFileDownloadProgress] = useState<number>(0)
    // to track the whether the message is sent to the peer
    const [fileSending, setFileSending] = useState(false)
    // to track the whether the peer has received the message
    const [fileReceiving, setFileReceiving] = useState(false)
    // to hold the blob(binary data) of the file
    const [downloadFile, setDownloadFile] = useState<any>()
    const [fileNameState, setFileNameState] = useState<any>()
    const [name, setName] = useState<any>()

    const searchParams = useSearchParams()
    const peerRef = useRef<any>()
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

    // to handle data received from the peer
    function handleReceivingData(data: any){
        // sending the web worker info about the shared file
        if(data.info){
            workerRef.current?.postMessage({
                status: "fileInfo",
                fileSize: data.fileSize
            });
            setFileNameState(data.fileName)
            setName(data.fileName)
        }
        // if file transfer is complete the peer is prompted to download the file
        else if(data.done){
            const parse = data
            const fileSize = parse.fileSize
            workerRef.current?.postMessage("download")
        }
        else{
            setDownloadFile("sjdf")
            workerRef.current?.postMessage(data)
        }
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

        // if the peer accepts the offer
        userDetails.socket.on("signalling", (data: any) => {
            setAcceptCaller(true)
            setSignallingData(data)
            setPeerID(data.from)
        })

        // listener for message received from the web worker
        workerRef.current?.addEventListener("message", (event: any) => {
            // if a message is sent progress info is updated
            if(event.data?.progress){
                setFileDownloadProgress(Number(event.data.progress))
            }
            // if a file is shared 
            else if(event.data?.blob){
                setDownloadFile(event.data?.blob)
                setFileDownloadProgress(0)
                setFileReceiving(false)
            }
        });

        return () => {
            // if the connection is terminated
            // peer reference destroyed
            peerRef.current?.destroy();
            if(peerRef.current){
                // used twice to indicate that the component is no longer required
                setAcceptCaller(false)
                setAcceptCaller(false)
                // socket event turned off
                userDetails.socket.off()
            }
            // web worker terminated
            workerRef.current?.terminate();
        }
    }, []);

    // creating a new peer instance
    const callUser = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            // TURN servers
            config: {
                iceServers: [
                    {
                        urls: "turn:openrelay.metered.ca:80",
                        username: "openrelayproject",
                        credential: "openrelayproject",
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        credential: "muazkh",
                        username: "webrtc@live.com",
                    }
                ]
            }
        })

        // storing the reference to the Peer instance 
        peerRef.current = peer;

        peer.on("signal", (data) => {
            // sending the signaling data back to the server
            userDetails.socket.emit("send-signal", {
                from: userDetails.userID,
                signalData: data,
                to: peerID
            })
        })

        // handling data received from the peer
        peer.on("data", (data) => {
            const parseData = JSON.parse(data)
            // if it contains chunks
            if(parseData.chunk){
                setFileReceiving(true)
                handleReceivingData(parseData.chunk)
            }
            // if file transfer is done
            else if(parseData.done){
                handleReceivingData(parseData)
                toast.success("File received successfully!")
            }
            else if(parseData.info){
                handleReceivingData(parseData)
            }
        })
    }

    return (
        <Card className="sm:max w-[450px] max-w-[95%]">
            <CardContent className="mt-8">

            </CardContent>
        </Card>
    );
}

export default ShareCard;