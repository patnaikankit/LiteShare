import Share from "@/components/Share";
import { SocketProvider } from "@/helper/SocketProvider";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const Page = () => {
    return (
        <SocketProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <Share />
            </Suspense>
            <Toaster />
        </SocketProvider>
    );
}

export default Page;
