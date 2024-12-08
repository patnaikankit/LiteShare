import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/UI/Button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/UI/Card"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-background text-foreground p-4">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
          Unlock Swift File Sharing via{" "}
          <span className="text-primary">LiteShare</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-muted-foreground">
          Connect P2P and Chat Instantly! 🚀🤝💬
        </p>
        <Link href="/transfer" passHref>
          <Button size="lg" className="w-full sm:w-auto">
            Start Sharing
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Chat</CardTitle>
              <CardDescription>
                Engage in private conversations without leaving a trace. Our platform ensures your chats remain completely anonymous.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure File Sharing</CardTitle>
              <CardDescription>
                Share files with confidence. Our peer-to-peer technology means your data is transferred directly, with no storage on our servers.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>Secure. Fast. No data stored. No registration required.</p>
      </footer>
    </div>
  )
}

