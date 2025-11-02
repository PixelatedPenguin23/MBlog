import Nav from "@components/Nav";
import { inter } from "@fonts";
import React from "react";
import '@globals.css'
import Provider from "@components/Provider";
export const dynamic = 'force-dynamic'

export default function RootLayout({children}){

  return(
    
    <html>
      <body className={`${inter.className} antialiased bg-gradient-to-b duration-1000  from-slate-900 text-white to-slate-950 w-screen transition-all h-screen overflow-x-hidden bg-fixed `}>
        <Provider>
        <main className="flex flex-col m-0 p-0 pb-24 max-md:min-h-130vh">
          <Nav/>
          <div className="mt-20 md:px-20 h-full sticky">
          {children}
          </div>
        </main>
        </Provider>
      </body>
    </html>
    
  )
}
