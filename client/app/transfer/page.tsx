import Share from "@/components/Share";
import { SocketProvider } from "@/helper/SocketProvider";
import React from "react";
import { Toaster } from "react-hot-toast";

const Page = () => {
    return (
        <SocketProvider>
            <Share />
            <Toaster />
        </SocketProvider>
    );
}

export default Page;