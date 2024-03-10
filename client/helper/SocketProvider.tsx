// creating a socket context provider to manage socket data across different components
"use client"

import { nanoid } from "nanoid"
import React, {
    createContext,
    useContext,
    useMemo,
    useState
} from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client/debug"


const SocketContext = createContext<any>({});

export const useSocket = () => {
    const socket: { socket: Socket; userID: any, socketID: any, setSocketId: any, peerState: any, setPeerState: any } = useContext(SocketContext);
    return socket;
}

// setting up the connection and providing the data to the children
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    // to ensure that the socket connection is made only once 
    const socket = useMemo(() => {
        return io(String(process.env.SERVER_URL));
    }, []);

    // to check the status of the peer's connection
    const [peerState, setPeerState] = useState<any>()
    // to hold the value of the peer's socketID corrsponding to its uniqueID
    const [socketID, setSocktID] = useState<any>(socket)
    const userID = useMemo(() => {
        // returns unique 10 character ID
        return nanoid(10);
    }, []);

    return(
        <SocketContext.Provider value = {{ socket, userID
        , socketID, setSocktID, peerState, setPeerState }}>
            { children }
        </SocketContext.Provider>
    ) 
} 