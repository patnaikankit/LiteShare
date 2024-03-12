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
import { Label } from "./UI/Label"
import { Button } from "./UI/Button"
import { Check, Copy, CopyIcon } from "lucide-react"
import ShareLink from "./ShareLink"
import { Input } from "./UI/Input"
import { TailSpin } from "react-loader-spinner"

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
    // to manage the loading state of the application
    const [isLoading, setIsLoading] = useState(false)
    // to hold the present status of the connection
    const [currentConnection, setCurrentConnection] = useState(false)
    // to control the termination of call
    const [terminateCall, setTerminateCall] = useState(false)
    // to manage file upload
    const [fileUpload, setFileUpload] = useState<any>()

    const searchParams = useSearchParams()
    const peerRef = useRef<any>()
    const fileInputRef = useRef<any>()
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

    // function triggered when a peer initiates a call to check the provided peerID
    const handleConnectionInitialization = () => {
        setIsLoading(true)
        if(peerID && peerID.length == 10){
            callUser();
        }
        else{
            setIsLoading(false)
            toast.error("Enter a valid peerID")
        }
    }

    const handleFileuploadBtn = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e: any) => {
        setFileUpload(e.target.files)
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

        // Receiving accept signal from socket
        userDetails.socket.on("callAccepted", (data: any) => {
            setCurrentConnection(true)
            setIsLoading(false)
            setTerminateCall(true)
            toast.success(`Successful connection with ${peerID}`);
            userDetails.setPeerState(peer)
        })

        // If one of the peer terminates the call
        peer.on("close", () => {
            setPeerID("")
            setCurrentConnection(false)
            toast.success(`Connection terminated with${peerID}`)
            setFileUpload(false)
            setTerminateCall(false)
            setPeerID("")
            userDetails.setPeerState(undefined)
        })

        peer.on("error", (err) => {
            console.log(err);
            
        })

        // Accepting offer by a peer
        const acceptUser = () => {
            const peer = new Peer({
                initiator: false,
                trickle: false
            })

            peerRef.current = peer
            userDetails.setPeerState(peer)
            peer.on("signal", (data) => {
                userDetails.socket.emit("accept-signal", {
                    signalData: data,
                    to: peerID
                })
                setCurrentConnection(true)
                setAcceptCaller(false)
                setTerminateCall(true)
                toast.success(`Successful connection with ${peerID}`)
            })

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

            // verifying signal of caller
            peer.signal(signallingData.signalData);

            peer.on("close", () => {
                setPeerID("")
                setCurrentConnection(false)
                toast.success(`Connection terminated with${peerID}`)
                setFileUpload(false)
                setTerminateCall(false)
                setPeerID("")
                userDetails.setPeerState(undefined)
            })

            peer.on("error", (err) => {
                console.log(err);
                
            })
        }

        // sending files after connection is established
        const webRTCUpload = () => {
            const peer = peerRef.current
            const file = fileUpload[0]
            // 16KB chunks
            const chunkSize = 16*1024
            let offset = 0

        }
    }

    return (
        <Card className="sm:max w-[450px] max-w-[95%]">
            <CardContent className="mt-8">
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="name">My ID</Label>
                            <div className="flex flex-row justify-left items-center space-x-2">
                                <div className="flex border rounded-md px-3 py-2 text-sm h-10 w-full bg-muted">
                                    {userID ? userID : "Loading...."}
                                </div>

                                <Button
                                    variant="outline"
                                    type="button"
                                    className="p-4"
                                    onClick={() => CopyToClipboard(userDetails?.userID)}
                                    disabled={userID ? false : true}
                                >
                                    {isCopied ? (
                                        <Check size={15} color="green" />
                                    ) : (
                                        <CopyIcon size={15} />
                                    )}
                                </Button>
                                <ShareLink usercode={userID} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="name">Peer's ID</Label>
                        </div>
                        <div className="flex flex-row justify-left items-center space-x-2">
                            <Input 
                                id="name"
                                placeholder="ID"
                                onChange={(e) => setPeerID(e.target.value)}
                                disabled={terminateCall}
                                value={peerID}
                            />
                            
                            <Button 
                                variant="outline"
                                type="button"
                                className="flex items-center justify-center p-4 w-[160px]"
                                onClick={handleConnectionInitialization}
                                disabled={terminateCall}
                            >
                                {isLoading ? 
                                <>
                                    <div className="scale-0 hidden dark:flex dark:scale-100">
                                        <TailSpin color="white" height={18} width={18}/>
                                    </div>
                                    <div className="scale-100 flex dark:scale-0 dark:hidden">
                                        <TailSpin color="black" height={18} width={18}/>
                                    </div>
                                </> : (
                                    <p>Connect</p>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="name">Connection Status</Label>
                        <div className="flex flex-row justify-left items-center space-x-2">
                            <div className="border rounded-lg  px-3 py-2 text-sm h-10 w-full ease-in-out duration-500 transition-all">
                                {currentConnection ? peerID : "No connection"}
                            </div>
                            <>
                                {terminateCall ? 
                                    <Button
                                        variant="destructive"
                                        type="button"
                                        onClick={() => {
                                            peerRef.current.destroy()
                                        }}
                                    >
                                        Terminate
                                    </Button>
                                : null}
                            </>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default ShareCard;