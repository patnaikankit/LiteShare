import { Share } from "@/components/Share";
import { SocketProvider } from "@/helper/SocketProvider";
import React from "react";
import { Toaster } from "react-hot-toast";

export const Page = () => {
    return (
        <SocketProvider>
            <Share />
            <Toaster />
        </SocketProvider>
    );
}