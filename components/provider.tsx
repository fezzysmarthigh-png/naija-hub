import { SessionProvider } from "next-auth/react";
import React from "react";

interface Providerprops {
    children: React.ReactNode;
}

export default function Provider({children} : Providerprops){
    return (
        <main>
            <SessionProvider>{children}</SessionProvider>
        </main>
    )
}