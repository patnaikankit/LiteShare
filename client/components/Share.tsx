"use client"

import React from "react"
import Chat from "./Chat"
import ShareCard from "./ShareCard"


const Share = () => {
    return (
        <>
            <div className="flex flex-wrap mt-[100px] gap-x-2 justify-center gap-y-3">
                <ShareCard />
                <Chat />
            </div>
        </>
    );
}

export default Share;
