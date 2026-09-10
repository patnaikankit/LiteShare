import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, FileText, HeartHandshake, MessageCircle, Paperclip, ShieldCheck } from "lucide-react"
import { Button } from "@/components/UI/Button"

const features = [
  [MessageCircle, "Say hello", "A little room for a real conversation, without creating another account."],
  [Paperclip, "Send the good stuff", "Photos, notes, and large files go straight from one person to the other."],
  [ShieldCheck, "Leave no leftovers", "When the room is closed, your files are not waiting for you in the cloud."],
] as const

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f3eb] text-[#182635]">
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-10 lg:px-10 lg:pt-16">
        <section className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative">
            <div className="mb-7 flex items-center gap-3 text-sm font-medium text-[#e46f52]"><span className="h-px w-9 bg-[#e46f52]" />A small place to share</div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[5.25rem]">Send it to a <span className="relative inline-block text-[#e46f52]">friend<svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 170 12" fill="none" aria-hidden="true"><path d="M3 8C43 2 111 2 166 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>.</h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[#627080] sm:text-xl">LiteShare is a quiet little room for messages and files between people who already know each other.</p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Link href="/transfer"><Button size="lg" className="h-12 rounded-full bg-[#e46f52] px-7 font-semibold text-white shadow-[4px_4px_0_#bb4f36] hover:bg-[#d96044] hover:shadow-[2px_2px_0_#bb4f36]">Make a room <ArrowRight className="ml-2" size={17} /></Button></Link><span className="text-sm text-[#89929d]">No login. No fuss.</span></div>
            <div className="mt-9 flex items-center gap-2 text-sm text-[#687685]"><div className="flex -space-x-2"><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f7f3eb] bg-[#f1b24a] text-xs font-bold">M</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f7f3eb] bg-[#8fc4bf] text-xs font-bold">R</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f7f3eb] bg-[#d8a2c1] text-xs font-bold">S</span></div><span>Made for sharing between two people.</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto">
            <div className="absolute -right-5 -top-8 rotate-6 rounded-md bg-[#f1b24a] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#614413] shadow-sm">just between us</div>
            <div className="relative rotate-[-2deg] rounded-[1.35rem] border-2 border-[#263847] bg-[#fffdf8] p-5 shadow-[8px_9px_0_#d7d0c4] sm:p-7">
              <div className="flex items-center justify-between border-b border-dashed border-[#c8c0b4] pb-4"><div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9186]">your room</p><p className="mt-1 font-semibold text-[#263847]">sunday-plans</p></div><span className="flex items-center gap-1.5 text-xs text-[#5f9d79]"><span className="h-2 w-2 rounded-full bg-[#5f9d79]" /> open</span></div>
              <div className="space-y-4 py-5"><div className="flex items-end gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f1b24a] text-xs font-bold">M</span><div className="rounded-2xl rounded-bl-sm bg-[#eef1ed] px-4 py-3 text-sm leading-5 text-[#435364]">Hey! Here are those photos from yesterday :)</div></div><div className="ml-auto flex max-w-[88%] items-center gap-3 rounded-xl border border-[#e6dfd3] bg-[#fffaf0] p-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e46f52]/10 text-[#e46f52]"><FileText size={18} /></div><div className="min-w-0"><p className="truncate text-sm font-medium text-[#435364]">weekend-photos.zip</p><p className="mt-1 text-xs text-[#9a9186]">24.8 MB · ready to download</p></div><ArrowUpRight size={16} className="ml-auto shrink-0 text-[#9a9186]" /></div><div className="flex items-end gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8fc4bf] text-xs font-bold">R</span><div className="rounded-2xl rounded-bl-sm bg-[#eef1ed] px-4 py-3 text-sm leading-5 text-[#435364]">Got them. Thanks!</div></div></div>
              <div className="flex items-center gap-2 border-t border-dashed border-[#c8c0b4] pt-4 text-xs text-[#8e968f]"><HeartHandshake size={14} className="text-[#e46f52]" /> Directly between you two</div>
            </div>
            <div className="absolute -bottom-9 -left-8 -rotate-6 font-mono text-xs text-[#9a9186]">(no algorithm required)</div>
          </div>
        </section>

        <section id="how-it-works" className="mt-28 border-t border-[#d9d1c5] pt-10"><div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#e46f52]">How it works</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#263847]">Three easy things.</h2></div><p className="max-w-sm text-sm leading-6 text-[#7d8791]">It is not trying to be your everything app. It just helps you get something to someone.</p></div><div className="grid gap-4 md:grid-cols-3">{features.map(([Icon, title, description], index) => <div key={title} className="group rounded-2xl border border-[#d9d1c5] bg-[#fffdf8] p-6 transition hover:-translate-y-1 hover:shadow-[4px_5px_0_#d9d1c5]"><div className="flex items-start justify-between"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7e5dc] text-[#e46f52]"><Icon size={19} /></div><span className="font-mono text-xs text-[#b4aaa0]">0{index + 1}</span></div><h3 className="mt-6 text-lg font-semibold text-[#263847]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#77828d]">{description}</p></div>)}</div></section>

        <footer className="mt-14 flex flex-col justify-between gap-2 border-t border-[#d9d1c5] pt-5 text-xs text-[#9a9186] sm:flex-row"><span>LiteShare · for the good stuff</span><span className="inline-flex items-center gap-2"><Check size={13} /> Your files are yours</span></footer>
      </main>
    </div>
  )
}
