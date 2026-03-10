import { useState, useEffect, useCallback } from "react";
import { ButtonVsDivDemo, StackingContextDemo, EventPropagationDemo, FocusTrapDemo, LayoutShiftDemo } from "./demos";

// ─── Design system token shortcuts ───────────────────────────────────────────
// Background:  #1d1d1d (--color-background)
// Surface:     #282828 (--color-surface)
// Surface-var: #393939 (--color-surface-variant)
// Outline:     #8e8e8e (--color-outline)
//
// Module 1 accent  = accent-5  orange  #fd5f2e
// Module 2 accent  = accent-2  blue    #1767e8
// Module 3 accent  = primary   yellow  #ffcc05
//
// Layer 0 UI/UX    = accent-2  blue    #1767e8
// Layer 1 Client   = accent-3  purple  #de78ff
// Layer 2 BFF      = accent-5  orange  #fd5f2e
// Layer 3 Service  = accent-4  pink    #ff5ce3
// Layer 4 DB       = primary   yellow  #ffcc05
//
// Success  = accent-1  green   #00d46b
// Error    = error     red     #ff7979 / bg #581919
// ─────────────────────────────────────────────────────────────────────────────

const modules = [
    { id: 1, label: "Just a Button",     color: "bg-[#fd5f2e]",  text: "text-[#1d1d1d]" },
    { id: 2, label: "Download Report",   color: "bg-[#1767e8]",  text: "text-white" },
    { id: 3, label: "Specialization",    color: "bg-[#ffcc05]",  text: "text-[#1d1d1d]" },
];

const layers = [
    { icon: "🎨", name: "UI/UX",   color: "text-[#1767e8]",  bg: "bg-[#0e1a2e]", border: "border-[#1767e8]" },
    { icon: "⚛️", name: "Client",  color: "text-[#de78ff]",  bg: "bg-[#1e0b2e]", border: "border-[#de78ff]" },
    { icon: "🔀", name: "BFF",     color: "text-[#fd5f2e]",  bg: "bg-[#2e1008]", border: "border-[#fd5f2e]" },
    { icon: "⚙️", name: "Service", color: "text-[#ff5ce3]",  bg: "bg-[#2e0828]", border: "border-[#ff5ce3]" },
    { icon: "🗄️", name: "DB",      color: "text-[#ffcc05]",  bg: "bg-[#2a2000]", border: "border-[#ffcc05]" },
];

const LayerBar = ({ active }: { active: number }) => {
    if (active < 0) return null;
    return (
        <div className="absolute top-4 left-6 flex items-center gap-1.5">
            {layers.map((l, i) => (
                <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${i === active ? `${l.bg} ${l.border} border ${l.color} font-bold` : i < active ? "bg-[#282828] border border-[#393939] text-[#8e8e8e]" : "text-[#4b4b4b]"}`}>
                    <span>{l.icon}</span>
                    {(i === active || i < active) && <span className="hidden sm:inline">{l.name}</span>}
                </div>
            ))}
        </div>
    );
};

const ModuleBar = ({ moduleId }: { moduleId: number }) => (
    <div className="absolute top-4 left-6 flex items-center gap-1.5">
        {modules.map((m) => (
            <div key={m.id} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${m.id === moduleId ? `${m.color} ${m.text}` : m.id < moduleId ? "bg-[#393939] text-[#cecece]" : "bg-[#282828] text-[#4b4b4b]"}`}>
                <span>{m.id}</span>
                <span className="hidden sm:inline">{m.label}</span>
            </div>
        ))}
    </div>
);

const slides = [
    // ============ TITLE ============
    {
        nav: null,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div className="text-7xl mb-8 opacity-90">🔘</div>
                <h1 className="text-4xl font-bold text-white mb-6 leading-tight">"How hard can it be<br/>to add a button on a website?"</h1>
                <p className="text-lg text-[#cecece] max-w-2xl leading-relaxed">Because sometimes one button is the start of an architectural discussion about <span className="text-[#fd5f2e]">scalability</span>, <span className="text-[#1767e8]">responsibility</span>, and the <span className="text-[#ffcc05]">borders of frontend</span>.</p>
                <div className="mt-16 text-[#4b4b4b] text-sm">→ use arrow keys or click navigation below</div>
            </div>
        ),
    },
    // ============ MODULE 1 — BUTTON PROBLEMS ============
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <p className="text-[#fd5f2e] text-sm uppercase tracking-widest mb-4">Module 1</p>
                <h2 className="text-4xl font-bold text-white mb-4">"It's just a button"</h2>
                <p className="text-xl text-[#cecece]">Five problems hiding behind a simple button.<br/>Each one is a different web specialization.</p>
            </div>
        ),
    },
    // M1 #1 — <button> vs <div> (HTML / Web Standards)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex gap-6 h-full px-10 py-6">
                {/* Left: text */}
                <div className="w-[42%] flex flex-col justify-center">
                    <p className="text-[#fd5f2e] text-xs uppercase tracking-widest mb-2">Problem #1 — HTML / Web Standards</p>
                    <h2 className="text-2xl font-bold text-white mb-2">{"<button>"} vs {"<div>"}</h2>
                    <p className="text-[#cecece] text-sm mb-5">"They look the same. They behave completely differently."</p>
                    <div className="space-y-3">
                        <div>
                            <p className="text-[#00d46b] font-bold text-sm mb-1.5">{"<button>"} gives you for free:</p>
                            <div className="space-y-1 text-xs text-[#cecece]">
                                <p>✅ Focusable — no <span className="font-mono bg-[#393939] px-1 rounded">tabindex</span> needed</p>
                                <p>✅ Enter + Space activate it — built in</p>
                                <p>✅ Screen reader announces "button"</p>
                                <p>✅ <span className="font-mono bg-[#393939] px-1 rounded">disabled</span> attribute works natively</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#ff7979] font-bold text-sm mb-1.5">{"<div onclick>"} needs manual work:</p>
                            <div className="space-y-1 text-xs text-[#cecece]">
                                <p>❌ <span className="font-mono bg-[#393939] px-1 rounded">tabindex="0"</span> — for focus</p>
                                <p>❌ <span className="font-mono bg-[#393939] px-1 rounded">onkeydown</span> — for Enter + Space</p>
                                <p>❌ <span className="font-mono bg-[#393939] px-1 rounded">role="button"</span> — for screen readers</p>
                                <p>❌ <span className="font-mono bg-[#393939] px-1 rounded">aria-disabled</span> + click guard</p>
                            </div>
                        </div>
                        <p className="text-[#8e8e8e] text-xs border-t border-[#393939] pt-3">~15 lines to recreate what <span className="font-mono">{"<button>"}</span> does automatically. Most projects skip half. This is <span className="text-[#fd5f2e]">HTML standards</span> knowledge.</p>
                    </div>
                </div>
                {/* Right: demo */}
                <div className="flex-1 flex flex-col">
                    <ButtonVsDivDemo />
                </div>
            </div>
        ),
    },
    // M1 #2 — Stacking context (CSS / Visual Rendering Model)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex gap-6 h-full px-10 py-6">
                {/* Left: text */}
                <div className="w-[42%] flex flex-col justify-center">
                    <p className="text-[#fd5f2e] text-xs uppercase tracking-widest mb-2">Problem #2 — CSS / Visual Rendering</p>
                    <h2 className="text-2xl font-bold text-white mb-2">Stacking context</h2>
                    <p className="text-[#cecece] text-sm mb-5">"Your button is there. Something invisible is covering it."</p>
                    <div className="space-y-3">
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#cecece] font-bold text-xs mb-2">The scenario</p>
                            <div className="space-y-1.5 text-xs text-[#cecece]">
                                <p>Dropdown has <span className="font-mono bg-[#393939] px-1 rounded">z-index: 1000</span></p>
                                <p>Page overlay has <span className="font-mono bg-[#393939] px-1 rounded">z-index: 500</span></p>
                                <p>1000 &gt; 500. Dropdown should win, right?</p>
                            </div>
                        </div>
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#ff7979] font-bold text-xs mb-2">The catch</p>
                            <div className="space-y-1.5 text-xs text-[#cecece]">
                                <p>Header has <span className="font-mono bg-[#393939] px-1 rounded">transform: translateY(0)</span></p>
                                <p>This creates a <span className="text-white font-semibold">new stacking context</span></p>
                                <p>Dropdown's z-index is now <span className="text-white font-semibold">scoped to the header</span></p>
                                <p>Browser compares: header <span className="font-mono bg-[#393939] px-1 rounded">z:auto</span> vs overlay <span className="font-mono bg-[#393939] px-1 rounded">z:500</span></p>
                                <p className="text-[#ff7979]">Overlay wins. Dropdown trapped.</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#fd5f2e] font-bold text-xs mb-1.5">Other properties that create stacking contexts:</p>
                            <div className="flex flex-wrap gap-1">
                                {["transform", "opacity < 1", "filter", "will-change", "position: fixed"].map(p => (
                                    <span key={p} className="font-mono text-[10px] bg-[#393939] px-1.5 py-0.5 rounded text-[#cecece]">{p}</span>
                                ))}
                            </div>
                        </div>
                        <p className="text-[#8e8e8e] text-xs border-t border-[#393939] pt-3">z-index is not a global ranking — it's local to a stacking context.</p>
                    </div>
                </div>
                {/* Right: demo */}
                <div className="flex-1 flex flex-col">
                    <StackingContextDemo />
                </div>
            </div>
        ),
    },
    // M1 #3 — Event propagation (JavaScript / DOM API)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex gap-6 h-full px-10 py-6">
                {/* Left: text */}
                <div className="w-[42%] flex flex-col justify-center">
                    <p className="text-[#fd5f2e] text-xs uppercase tracking-widest mb-2">Problem #3 — JavaScript / DOM API</p>
                    <h2 className="text-2xl font-bold text-white mb-2">Event propagation</h2>
                    <p className="text-[#cecece] text-sm mb-5">"You click 'Delete'. The row also opens. Why?"</p>
                    <div className="space-y-3">
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#de78ff] font-bold text-xs mb-2">The bubbling trap</p>
                            <div className="space-y-1.5 text-xs text-[#cecece]">
                                <p>Delete button sits inside a clickable row</p>
                                <p>Click fires on button → <span className="text-white font-semibold">bubbles up</span> to row</p>
                                <p>Both handlers run — row opens AND item deleted</p>
                            </div>
                        </div>
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#fd5f2e] font-bold text-xs mb-2">Invalid nesting</p>
                            <div className="space-y-1.5 text-xs">
                                <p className="font-mono bg-[#581919] px-2 py-0.5 rounded text-[#ff7979]">{"<a><button>…</button></a>"}</p>
                                <p className="font-mono bg-[#581919] px-2 py-0.5 rounded text-[#ff7979]">{"<button><button>…</button></button>"}</p>
                                <p className="text-[#8e8e8e]">Browsers "fix" these differently — Chrome, Firefox, Safari disagree on the click target.</p>
                            </div>
                        </div>
                        <p className="text-[#8e8e8e] text-xs border-t border-[#393939] pt-3">DOM events have 3 phases: capture → target → bubble. Most devs only know bubble. Full model = deep <span className="text-[#fd5f2e]">JS/DOM knowledge</span>.</p>
                    </div>
                </div>
                {/* Right: demo */}
                <div className="flex-1 flex flex-col">
                    <EventPropagationDemo />
                </div>
            </div>
        ),
    },
    // M1 #4 — Focus trap & keyboard (Accessibility / WCAG)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex gap-6 h-full px-10 py-6">
                {/* Left: text */}
                <div className="w-[42%] flex flex-col justify-center">
                    <p className="text-[#fd5f2e] text-xs uppercase tracking-widest mb-2">Problem #4 — Accessibility / WCAG</p>
                    <h2 className="text-2xl font-bold text-white mb-2">Focus trap & keyboard nav</h2>
                    <p className="text-[#cecece] text-sm mb-5">"Try using your site with just the keyboard. It probably doesn't work."</p>
                    <div className="space-y-3">
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#ff7979] font-bold text-xs mb-2">❌ What usually happens</p>
                            <div className="space-y-1 text-xs text-[#cecece]">
                                <p>Tab moves focus behind the modal — user is lost</p>
                                <p>No way to close with Escape</p>
                                <p>Focus never returns after closing</p>
                                <p>Keyboard user must reload the page</p>
                            </div>
                        </div>
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#00d46b] font-bold text-xs mb-2">✅ Fix (pure HTML + JS)</p>
                            <div className="space-y-1 text-xs text-[#cecece]">
                                <p><span className="font-mono bg-[#393939] px-1 rounded">element.focus()</span> on modal open</p>
                                <p>Cycle Tab through focusable elements</p>
                                <p>Listen for <span className="font-mono bg-[#393939] px-1 rounded">keydown: Escape</span> to close</p>
                                <p>Return focus to trigger button on close</p>
                                <p><span className="font-mono bg-[#393939] px-1 rounded">aria-expanded</span> on the trigger</p>
                            </div>
                        </div>
                        <p className="text-[#8e8e8e] text-xs border-t border-[#393939] pt-3">15% of users rely on keyboard navigation. WCAG 2.1 AA is a legal requirement in the EU. Accessibility is its own <span className="text-[#fd5f2e]">specialization</span>.</p>
                    </div>
                </div>
                {/* Right: demo */}
                <div className="flex-1 flex flex-col">
                    <FocusTrapDemo />
                </div>
            </div>
        ),
    },
    // M1 #5 — Layout Shift (Web Performance / Core Web Vitals)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex gap-6 h-full px-10 py-6">
                {/* Left: text */}
                <div className="w-[42%] flex flex-col justify-center">
                    <p className="text-[#fd5f2e] text-xs uppercase tracking-widest mb-2">Problem #5 — Web Performance / Core Web Vitals</p>
                    <h2 className="text-2xl font-bold text-white mb-2">Layout Shift</h2>
                    <p className="text-[#cecece] text-sm mb-5">"You add a button and suddenly everything 'jumps'."</p>
                    <div className="space-y-3">
                        <div>
                            <p className="text-white font-semibold text-xs mb-1.5">Button text changes size:</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="bg-[#1767e8] text-white px-3 py-1 rounded text-xs">"Download"</div>
                                <span className="text-[#4b4b4b] text-xs">→</span>
                                <div className="bg-[#1767e8] text-white px-3 py-1 rounded text-xs">"Generating..."</div>
                                <span className="text-[#4b4b4b] text-xs">→</span>
                                <div className="bg-[#06753f] text-white px-3 py-1 rounded text-xs">"✓ Done"</div>
                            </div>
                            <p className="text-[#8e8e8e] text-xs mt-1">Different width → neighbors shift</p>
                        </div>
                        <div className="bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <p className="text-[#00d46b] font-bold text-xs mb-2">Solutions:</p>
                            <div className="space-y-1 text-xs text-[#cecece]">
                                <p><span className="text-white">min-width</span> — reserves space for all states</p>
                                <p><span className="text-white">Placeholder element</span> — empty slot before load</p>
                                <p><span className="text-white">visibility: hidden</span> vs display: none — keeps space</p>
                                <p><span className="text-white">CSS grid/flex fixed slot</span> — position stays stable</p>
                            </div>
                        </div>
                        <p className="text-[#8e8e8e] text-xs border-t border-[#393939] pt-3">CLS is a Core Web Vital. Google uses it for search ranking. Web performance = its own <span className="text-[#fd5f2e]">specialization</span>.</p>
                    </div>
                </div>
                {/* Right: demo */}
                <div className="flex-1 flex flex-col">
                    <LayoutShiftDemo />
                </div>
            </div>
        ),
    },
    // M1 - Bridge
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-12">
                <h2 className="text-3xl font-bold text-white mb-6">And that was "just" the UI layer.</h2>
                <p className="text-xl text-[#cecece] mb-10 max-w-2xl leading-relaxed">HTML semantics, CSS rendering, DOM events,<br/>accessibility, web performance...</p>
                <p className="text-lg text-[#cecece] max-w-2xl leading-relaxed mb-6">Each of these five problems is someone's <span className="text-[#fd5f2e] font-semibold">specialization</span>.<br/>And we haven't even left the browser yet.</p>
                <p className="text-xl text-[#cecece] max-w-2xl leading-relaxed">Now what happens when that button triggers<br/><span className="text-[#1767e8] font-bold text-2xl">a real business process</span><br/>that cuts through the entire stack?</p>
                <div className="mt-10 text-[#4b4b4b]">→</div>
            </div>
        ),
    },

    // ============ MODULE 2 — FULL STACK PROCESS ============
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <p className="text-[#1767e8] text-sm uppercase tracking-widest mb-4">Module 2</p>
                <h2 className="text-4xl font-bold text-white mb-4">"Download Report"</h2>
                <p className="text-xl text-[#cecece]">A new process in an existing system.<br/>Layer by layer — from click to database.</p>
            </div>
        ),
    },
    // M2 - PM scene
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-[#8e8e8e] text-sm uppercase tracking-widest mb-6">Monday, standup</p>
                <div className="bg-[#282828] border border-[#393939] rounded-2xl p-8 max-w-3xl">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#fd5f2e] flex items-center justify-center text-[#1d1d1d] font-bold text-sm flex-shrink-0">PM</div>
                        <p className="text-white text-lg leading-relaxed">"Users want to <span className="text-[#ffcc05] font-bold">download a PDF report</span> from the dashboard. We have the data, we have the view — let's add a button. How long will it take?"</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#1767e8] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">DEV</div>
                        <p className="text-[#cecece] text-lg">"It depends..."</p>
                    </div>
                </div>
                <div className="mt-8 text-[#8e8e8e] text-sm max-w-3xl">A PDF report is a new process — new data flow, new transformations, new output. It has to pass through <span className="text-[#cecece]">5 architectural layers</span>. At each one — decisions.</div>
            </div>
        ),
    },
    // M2 - Map
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-4">Journey map of a new process</h2>
                <p className="text-[#cecece] mb-8">5 layers. At each — different questions, different decisions, different people.</p>
                <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto w-full">
                    {layers.map((l, i) => (
                        <div key={i} className="w-full">
                            <div className={`${l.bg} ${l.border} border rounded-xl px-6 py-4 flex items-center gap-4`}>
                                <span className="text-2xl">{l.icon}</span>
                                <div>
                                    <p className={`${l.color} font-bold text-lg`}>{l.name}</p>
                                    <p className="text-[#8e8e8e] text-sm">
                                        {i === 0 && "Where we can fit new button? What button states? How long user can wait?"}
                                        {i === 1 && "Where do parameters come from? How to track loading and errors?"}
                                        {i === 2 && "What is the URL for call? Does the response come immediately?"}
                                        {i === 3 && "How to generate the PDF? What if it takes a long time?"}
                                        {i === 4 && "How much data? Will it slow down the app for everyone?"}
                                    </p>
                                </div>
                            </div>
                            {i < 4 && <div className="flex justify-center py-1"><div className="w-0.5 h-4 bg-[#393939]" /></div>}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    // M2 - Layer 1: UI/UX
    {
        nav: "layer", layer: 0,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-[#1767e8] text-sm uppercase tracking-widest mb-2">Layer 1</p>
                <h2 className="text-4xl font-bold text-white mb-3">🎨 UI / UX</h2>
                <p className="text-[#cecece] text-lg mb-8">Before we write a single line of code — the designer asks:</p>
                <div className="bg-[#282828] border border-[#393939] rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "Where does the button go?", d: "In the header? In a toolbar? In a sidebar? The location affects how the component is built." },
                            { q: "What states does the button need?", d: "Idle → Loading → Success → Error. Each state looks different — and the user needs to understand what's happening." },
                            { q: "What if it takes a long time?", d: "Show a spinner? A progress bar? Tell the user 'we'll email you'? This is a UX decision with technical consequences." },
                            { q: "What if the user clicks multiple times?", d: "Disable the button? Ignore extra clicks? Each choice affects the code below." },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-[#1767e8] pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-[#8e8e8e] text-sm mt-1">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // M2 - Layer 2: Client App
    {
        nav: "layer", layer: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-[#de78ff] text-sm uppercase tracking-widest mb-2">Layer 2</p>
                <h2 className="text-4xl font-bold text-white mb-3">⚛️ Client Application</h2>
                <p className="text-[#cecece] text-lg mb-8">User clicked. Now the frontend has a series of decisions:</p>
                <div className="bg-[#282828] border border-[#393939] rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "Where do report parameters come from?", d: "Filters, date range, selected columns — the app needs to gather all this before sending the request." },
                            { q: "How to track what's happening?", d: "The button was clicked — now we need to show loading, handle success, handle errors. That's state management." },
                            { q: "Should we validate before sending?", d: "Check if the date range makes sense, if there's data to export. Better to catch problems early." },
                            { q: "How to handle the response?", d: "The server sends back a file. How do we trigger the download? What if it fails?" },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-[#de78ff] pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-[#8e8e8e] text-sm mt-1">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // M2 - Layer 3: BFF
    {
        nav: "layer", layer: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-[#fd5f2e] text-sm uppercase tracking-widest mb-2">Layer 3</p>
                <h2 className="text-4xl font-bold text-white mb-3">🔀 Backend for Frontend</h2>
                <p className="text-[#cecece] text-lg mb-8">The translator between the UI world and the domain world.</p>
                <div className="bg-[#282828] border border-[#393939] rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "What URL does the frontend call?", d: "POST /api/reports? /api/exports? Naming matters — it's part of the contract between frontend and backend." },
                            { q: "Does the response come immediately or later?", d: "Small report = instant response. Large report = 'accepted, check back later'. This one decision changes the whole flow." },
                            { q: "Who's allowed to generate reports?", d: "Authentication (who are you?) and authorization (can you do this?). The server must check both." },
                            { q: "How to translate UI filters to a database query?", d: "The UI says 'last 30 days, only active users'. The server needs to convert that into actual query parameters." },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-[#fd5f2e] pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-[#8e8e8e] text-sm mt-1">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // M2 - Layer 4: Domain Service
    {
        nav: "layer", layer: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-[#ff5ce3] text-sm uppercase tracking-widest mb-2">Layer 4</p>
                <h2 className="text-4xl font-bold text-white mb-3">⚙️ Domain Service</h2>
                <p className="text-[#cecece] text-lg mb-8">This is where the heavy lifting happens.</p>
                <div className="bg-[#282828] border border-[#393939] rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "Where does the report get generated?", d: "Is it part of an existing service or a new one? Adding to an existing service is faster but creates coupling." },
                            { q: "How to create the PDF?", d: "Render HTML and convert to PDF? Use a PDF library? Each approach has different trade-offs in quality and complexity." },
                            { q: "What if it takes a long time?", d: "With lots of data, generation can take seconds or minutes. Should it run in the background?" },
                            { q: "Where to store the generated file?", d: "On disk? In cloud storage? How long do we keep it? The user might want to download it again later." },
                            { q: "What about duplicate requests?", d: "User clicks twice — do we generate two reports? Or detect the duplicate and return the same file?" },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-[#ff5ce3] pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-[#8e8e8e] text-sm mt-1">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // M2 - Layer 5: DB
    {
        nav: "layer", layer: 4,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-[#ffcc05] text-sm uppercase tracking-widest mb-2">Layer 5</p>
                <h2 className="text-4xl font-bold text-white mb-3">🗄️ Database</h2>
                <p className="text-[#cecece] text-lg mb-8">The foundation. This is where performance truth lives.</p>
                <div className="bg-[#282828] border border-[#393939] rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "What data does the report need?", d: "One table or five? Simple query or complex joins? The report's requirements define the query complexity." },
                            { q: "How much data are we talking about?", d: "100 rows = instant. 100,000 rows = a few seconds. 5 million rows = minutes. Scale changes everything." },
                            { q: "Will this slow down the app for everyone?", d: "A heavy report query running on the main database can make the whole app slower for all users." },
                            { q: "Do we need new indexes?", d: "The report filters on columns that aren't indexed yet. Adding an index speeds up reads but can slow down writes." },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-[#ffcc05] pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-[#8e8e8e] text-sm mt-1">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // M2 - Error handling
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">What happens when things go wrong?</h2>
                <p className="text-[#cecece] mb-5">Each layer fails in its own way:</p>
                <div className="space-y-2.5 max-w-3xl">
                    {[
                        { layer: "🎨 UI",     err: "User closes the browser mid-generation",        q: "Does the report still generate? Can they come back and download it later?" },
                        { layer: "⚛️ Client", err: "Network connection drops",                       q: "Show an error message? Retry automatically? Let the user try again manually?" },
                        { layer: "🔀 BFF",    err: "Backend service is not responding",              q: "Show a friendly error? Suggest trying again later? How long to wait before giving up?" },
                        { layer: "⚙️ Service",err: "Report generation crashes halfway through",      q: "Try again automatically? Notify someone? Mark the job as failed?" },
                        { layer: "🗄️ DB",    err: "Query takes too long and times out",             q: "Set a time limit? Break into smaller queries? Use pre-computed data?" },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#581919] border border-[#7a2020] rounded-xl p-3.5 flex items-start gap-3">
                            <span className="text-base flex-shrink-0">{item.layer}</span>
                            <div>
                                <p className="text-[#ff7979] font-semibold text-sm">{item.err}</p>
                                <p className="text-[#8e8e8e] text-xs mt-0.5">{item.q}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-[#8e8e8e] text-sm mt-4">Error handling is not an afterthought. It's an integral part of design at every layer.</p>
            </div>
        ),
    },

    // ============ MODULE 3 — NARROW SPECIALIZATION ============
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <p className="text-[#ffcc05] text-sm uppercase tracking-widest mb-4">Module 3</p>
                <h2 className="text-4xl font-bold text-white mb-4">Narrow Specialization</h2>
                <p className="text-xl text-[#cecece]">Why "I'm a frontend developer"<br/>stopped being enough — and what to do about it.</p>
            </div>
        ),
    },
    // M3 - The phenomenon (detailed timeline)
    {
        nav: "module", moduleId: 3,
        render: () => {
            const eras = [
                {
                    period: "~2006–2013", label: "jQuery era & before", color: "#8e8e8e",
                    bg: "bg-[#232323]", border: "border-[#444]", tc: "text-[#8e8e8e]",
                    items: [
                        "jQuery (2006) IS the framework — plugins for everything",
                        "\"Web developer\" does it all: HTML, CSS, JS, PHP, FTP",
                        "No build step, no npm, no transpilation",
                        "Backbone.js & AngularJS (2010) hint at what's coming",
                    ],
                },
                {
                    period: "2013–2016", label: "Framework revolution", color: "#1767e8",
                    bg: "bg-[#0e1a2e]", border: "border-[#1a3560]", tc: "text-[#1767e8]",
                    items: [
                        "React open-sourced (May 2013) — components change everything",
                        "Vue.js (Feb 2014), Angular 2 full rewrite (Sept 2016)",
                        "ES2015 standardized (June 2015), Babel + Webpack arrive",
                        "\"Frontend developer\" becomes a distinct job title",
                    ],
                },
                {
                    period: "2016–2019", label: "Ecosystem explosion", color: "#ffcc05",
                    bg: "bg-[#2a2000]", border: "border-[#453700]", tc: "text-[#ffcc05]",
                    items: [
                        "React wins — state management becomes its own specialty",
                        "TypeScript gains serious adoption (~2018), CSS-in-JS arrives",
                        "Next.js (Oct 2016), Storybook, testing libraries mature",
                        "\"JavaScript fatigue\" — tooling complexity overwhelms devs",
                    ],
                },
                {
                    period: "2020–2022", label: "Pandemic boom", color: "#fd5f2e",
                    bg: "bg-[#2e1008]", border: "border-[#4a1a0d]", tc: "text-[#fd5f2e]",
                    items: [
                        "COVID-19 forces overnight digital transformation",
                        "Hiring frenzy: salaries spike 30–50%, postings double",
                        "Hyper-specialization: \"React Dev\", \"Design System Eng\"",
                        "Microfrontends, monorepos, dedicated platform teams",
                    ],
                },
                {
                    period: "2023–today", label: "Correction & AI era", color: "#ff7979",
                    bg: "bg-[#2e1414]", border: "border-[#4a2222]", tc: "text-[#ff7979]",
                    items: [
                        "260k+ tech layoffs in 2023 alone (layoffs.fyi)",
                        "AI tools (Copilot, ChatGPT) shift the productivity bar",
                        "Frontend job postings drop ~50% from 2021 peak",
                        "Companies want T-shaped, full-stack-aware engineers",
                    ],
                },
            ];

            return (
                <div className="flex flex-col justify-center h-full px-10">
                    <h2 className="text-2xl font-bold text-white mb-1">The phenomenon: narrow specialization</h2>
                    <p className="text-[#cecece] text-sm mb-5">From one generalist role to dozens of specialists — and why the market is now correcting.</p>
                    <div className="flex rounded-lg overflow-hidden mb-4">
                        {eras.map((e, i) => (
                            <div key={i} className="flex-1 h-1.5" style={{ backgroundColor: e.color, opacity: 0.6 }} />
                        ))}
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {eras.map((e, i) => (
                            <div key={i} className={`${e.bg} border ${e.border} rounded-xl p-3.5`}>
                                <p className={`${e.tc} font-bold text-[11px] mb-0.5`}>{e.period}</p>
                                <p className="text-white font-semibold text-xs mb-2.5">{e.label}</p>
                                <div className="space-y-1.5">
                                    {e.items.map((item, j) => (
                                        <p key={j} className="text-[#8e8e8e] text-[10px] leading-snug">{item}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        },
    },
    // M3 - The market shift (supply vs demand chart)
    {
        nav: "module", moduleId: 3,
        render: () => {
            const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
            const demand = [18, 22, 30, 38, 48, 58, 65, 72, 88, 100, 82, 40, 35, 38];
            const supply = [14, 18, 24, 30, 38, 46, 54, 62, 68, 76, 84, 88, 86, 84];

            const cL = 45, cR = 760, cT = 30, cB = 205;
            const cW = cR - cL, cH = cB - cT;
            const px = (i: number) => cL + (i / (years.length - 1)) * cW;
            const py = (v: number) => cB - (v / 100) * cH;

            const toLine = (d: number[]) => d.map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
            const toArea = (d: number[]) => toLine(d) + ` L${px(d.length - 1).toFixed(1)},${cB} L${px(0).toFixed(1)},${cB} Z`;

            const zones = [
                { from: 0, to: 1, color: "#555" },
                { from: 1, to: 4, color: "#1767e8" },
                { from: 4, to: 8, color: "#ffcc05" },
                { from: 8, to: 10, color: "#fd5f2e" },
                { from: 10, to: 13, color: "#ff7979" },
            ];

            return (
                <div className="flex flex-col justify-center h-full px-10">
                    <h2 className="text-2xl font-bold text-white mb-1">The market shift</h2>
                    <p className="text-[#8e8e8e] text-sm mb-4">Frontend job postings vs. active frontend developers (relative index, 2021 peak = 100)</p>
                    <div className="bg-[#1a1a1a] border border-[#282828] rounded-2xl p-6 max-w-5xl">
                        <svg viewBox="0 0 800 230" className="w-full">
                            {/* Era background zones */}
                            {zones.map((z, i) => (
                                <rect key={i} x={px(z.from)} y={cT} width={px(z.to) - px(z.from)} height={cH} fill={z.color} opacity={0.06} rx={2} />
                            ))}
                            {/* Grid lines */}
                            {[20, 40, 60, 80, 100].map(v => (
                                <g key={v}>
                                    <line x1={cL} y1={py(v)} x2={cR} y2={py(v)} stroke="#333" strokeWidth={0.5} />
                                    <text x={cL - 6} y={py(v) + 3} textAnchor="end" fill="#555" fontSize={9} fontFamily="monospace">{v}</text>
                                </g>
                            ))}
                            {/* Area fills */}
                            <path d={toArea(demand)} fill="#00d46b" opacity={0.1} />
                            <path d={toArea(supply)} fill="#ff7979" opacity={0.1} />
                            {/* Lines */}
                            <path d={toLine(demand)} fill="none" stroke="#00d46b" strokeWidth={2.5} strokeLinejoin="round" />
                            <path d={toLine(supply)} fill="none" stroke="#ff7979" strokeWidth={2.5} strokeLinejoin="round" />
                            {/* Peak annotation */}
                            <circle cx={px(9)} cy={py(100)} r={4} fill="#00d46b" />
                            <text x={px(9) - 10} y={py(100) - 8} textAnchor="end" fill="#00d46b" fontSize={9} fontWeight="bold">Peak demand</text>
                            {/* Crossover line (~late 2022) */}
                            <line x1={px(9.92)} y1={cT} x2={px(9.92)} y2={cB} stroke="#ff7979" strokeWidth={1} strokeDasharray="4,3" opacity={0.4} />
                            <text x={px(9.92) + 8} y={cT + 10} textAnchor="start" fill="#ff7979" fontSize={8} opacity={0.8}>supply overtakes demand</text>
                            {/* Gap labels */}
                            <text x={(px(5) + px(8)) / 2} y={py(80)} textAnchor="middle" fill="#00d46b" fontSize={9} opacity={0.5}>Demand &gt; Supply</text>
                            <text x={(px(11) + px(13)) / 2} y={py(62)} textAnchor="middle" fill="#ff7979" fontSize={9} opacity={0.5}>Supply &gt; Demand</text>
                            {/* X-axis year labels */}
                            {years.map((yr, i) => (
                                <text key={i} x={px(i)} y={cB + 16} textAnchor="middle" fill="#555" fontSize={9}>{yr}</text>
                            ))}
                        </svg>
                        {/* Legend */}
                        <div className="flex items-center gap-6 mt-3 justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-[2px] bg-[#00d46b] rounded" />
                                <span className="text-[#8e8e8e] text-xs">Frontend job postings (demand)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-[2px] bg-[#ff7979] rounded" />
                                <span className="text-[#8e8e8e] text-xs">Active frontend developers (supply)</span>
                            </div>
                        </div>
                    </div>
                    {/* Key stats */}
                    <div className="flex gap-8 mt-4 max-w-5xl">
                        <div className="text-center">
                            <p className="text-[#00d46b] text-xl font-bold">2x</p>
                            <p className="text-[#8e8e8e] text-[10px]">job postings growth<br/>2019 &rarr; 2021</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[#ff7979] text-xl font-bold">&minus;60%</p>
                            <p className="text-[#8e8e8e] text-[10px]">job postings drop<br/>2021 &rarr; 2023</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[#ffcc05] text-xl font-bold">2022</p>
                            <p className="text-[#8e8e8e] text-[10px]">year supply overtook<br/>demand</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white text-xl font-bold">260k+</p>
                            <p className="text-[#8e8e8e] text-[10px]">tech layoffs<br/>in 2023</p>
                        </div>
                    </div>
                    <p className="text-[#4b4b4b] text-[10px] mt-3 max-w-5xl">Based on aggregated trends from LinkedIn Economic Graph, Indeed Hiring Lab, Stack Overflow Developer Surveys (2012–2025), and layoffs.fyi.</p>
                </div>
            );
        },
    },
    // M3 - How it happened
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">How did we get here?</h2>
                <p className="text-[#cecece] mb-8">The mechanisms that created narrow specialists.</p>
                <div className="space-y-4 max-w-3xl">
                    {[
                        { icon: "🏢", t: "Big Tech scale",           d: "With 500 frontend devs, it pays to have a 'bundler tooling team.' With 5 people — it doesn't." },
                        { icon: "📦", t: "Framework ecosystem",       d: "React, Angular, Vue, Svelte, Solid, Qwik... Each is a separate universe. Easy to spend 3 years learning one and never see the rest." },
                        { icon: "📋", t: "Keyword-driven hiring",     d: "'3+ years React experience' → devs optimize their CVs for frameworks, not skills." },
                        { icon: "🧱", t: "Microfrontends & ownership",d: "Teams own a fragment of UI. You never see the BFF, services, or database." },
                        { icon: "💰", t: "Pandemic hiring boom",      d: "2020–2022: hire fast, onboard fast, assign a narrow scope. No time for T-shape development." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 bg-[#282828] border border-[#393939] rounded-xl p-4">
                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                            <div>
                                <p className="text-white font-semibold">{item.t}</p>
                                <p className="text-[#8e8e8e] text-sm mt-1">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    // M3 - The problem
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">Why is this a problem?</h2>
                <p className="text-[#cecece] mb-8">The narrowly specialized developer:</p>
                <div className="grid grid-cols-2 gap-5 max-w-4xl">
                    <div className="bg-[#581919] border border-[#7a2020] rounded-xl p-5">
                        <p className="text-[#ff7979] font-bold text-lg mb-3">Doesn't understand context</p>
                        <p className="text-[#cecece] text-sm">Writes a button but has no idea what happens after the click. Doesn't know the API contract, doesn't understand the data model, can't see the DB performance implications.</p>
                    </div>
                    <div className="bg-[#581919] border border-[#7a2020] rounded-xl p-5">
                        <p className="text-[#ff7979] font-bold text-lg mb-3">Makes bad decisions</p>
                        <p className="text-[#cecece] text-sm">Implements PDF generation on the frontend because they don't know the backend has infrastructure for it. Or builds polling because they don't know we have WebSockets.</p>
                    </div>
                    <div className="bg-[#581919] border border-[#7a2020] rounded-xl p-5">
                        <p className="text-[#ff7979] font-bold text-lg mb-3">Is hard to transfer</p>
                        <p className="text-[#cecece] text-sm">Knows one framework, one ecosystem, one toolchain. Switching projects = learning from scratch. A risk for the company and the career.</p>
                    </div>
                    <div className="bg-[#581919] border border-[#7a2020] rounded-xl p-5">
                        <p className="text-[#ff7979] font-bold text-lg mb-3">Doesn't grow as an engineer</p>
                        <p className="text-[#cecece] text-sm">Senior doesn't mean "5 years of React." Senior means understanding trade-offs across multiple levels. Narrow specialization blocks that growth.</p>
                    </div>
                </div>
            </div>
        ),
    },
    // M3 - What to do
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">What to do about it?</h2>
                <p className="text-[#cecece] mb-8">Practical steps to avoid becoming a one-button specialist.</p>
                <div className="space-y-4 max-w-3xl">
                    {[
                        { n: "01", t: "Read backend pull requests",       d: "You don't need to write Go or Java. But understand the contract, the data model, the error handling on the other side. Code review is the best learning." },
                        { n: "02", t: "Join design sessions",             d: "When the PM comes with a new feature — be in the room. Understanding 'why' matters more than 'how.'" },
                        { n: "03", t: "Learn the layer above and below",  d: "Frontend dev? Learn BFF basics and infrastructure. Learn to read SQL explain plans. Learn design thinking." },
                        { n: "04", t: "Build full-stack side projects",   d: "A deployed app: frontend + API + database + CI/CD. Doesn't have to be your work stack. It's about gaining context." },
                        { n: "05", t: "Talk to other teams",              d: "DBA, DevOps, security, product. Every conversation gives you a new perspective on your own code." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <span className="text-[#ffcc05] font-mono font-bold text-lg">{item.n}</span>
                            <div>
                                <p className="text-white font-semibold text-lg">{item.t}</p>
                                <p className="text-[#cecece] text-sm">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    // M3 - T-shape
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col justify-center items-center h-full px-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">The T-shaped developer</h2>
                <div className="max-w-2xl w-full">
                    <div className="flex justify-center mb-1">
                        <div className="bg-[#946810] rounded-t-xl px-4 py-3 w-full text-center">
                            <p className="text-[#ffcc05] font-bold text-sm">Broad understanding: UX · API · DB · Infra · Security · Product</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-[#ffcc05] rounded-b-xl px-4 py-6 w-32 text-center">
                            <p className="text-[#1d1d1d] font-bold text-sm">Deep<br/>expertise<br/>↓<br/>Frontend</p>
                        </div>
                    </div>
                </div>
                <p className="text-[#cecece] mt-8 max-w-lg text-sm leading-relaxed">It's not about being a full-stack developer. It's about <span className="text-white">understanding the context</span> around your specialization. Deep knowledge + broad understanding = better decisions at every layer.</p>
            </div>
        ),
    },

    // ============ CLOSING ============
    {
        nav: null,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-8">🎯 Summary</h2>
                <div className="space-y-6 max-w-2xl">
                    <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-[#fd5f2e] mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-lg">Even a "simple" button is complex</p>
                            <p className="text-[#cecece] text-sm">HTML semantics, CSS rendering, DOM events, accessibility, web performance — five specializations hiding behind one button.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-[#1767e8] mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-lg">A new process = decisions at every layer</p>
                            <p className="text-[#cecece] text-sm">From UI through client, BFF, domain service to database — and decisions propagate both up and down.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-[#ffcc05] mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-lg">Understanding context &gt; narrow expertise</p>
                            <p className="text-[#cecece] text-sm">T-shaped mindset — deep knowledge in your domain, broad understanding of the rest of the stack.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-[#282828] pt-6 max-w-2xl">
                    <p className="text-[#8e8e8e] text-sm italic">"How hard can it be to add a button?" — Hard enough to need the whole team talking to each other.</p>
                </div>
            </div>
        ),
    },
    // END
    {
        nav: null,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div className="text-7xl mb-8">🔘</div>
                <h2 className="text-4xl font-bold text-white mb-4">Thank you!</h2>
                <div className="mt-12 text-[#4b4b4b] text-lg">Q&A</div>
            </div>
        ),
    },
];

export default function Presentation() {
    const [current, setCurrent] = useState(0);
    const total = slides.length;
    const go = useCallback((d: number) => setCurrent(p => Math.max(0, Math.min(total - 1, p + d))), [total]);

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [go]);

    const s = slides[current];

    return (
        <div className="w-full h-screen bg-[#1d1d1d] relative overflow-hidden select-none">
            <div className="w-full h-full">{s.render()}</div>

            {s.nav === "module" && s.moduleId !== undefined && <ModuleBar moduleId={s.moduleId} />}
            {s.nav === "layer" && s.layer !== undefined && <LayerBar active={s.layer} />}

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3">
                <button onClick={() => go(-1)} disabled={current === 0} className="text-[#8e8e8e] hover:text-white disabled:opacity-20 transition text-xl px-3 py-1">←</button>
                <div className="flex items-center gap-1">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "bg-[#ffcc05] w-4 h-2" : "bg-[#393939] hover:bg-[#8e8e8e] w-1.5 h-1.5"}`} />
                    ))}
                </div>
                <button onClick={() => go(1)} disabled={current === total - 1} className="text-[#8e8e8e] hover:text-white disabled:opacity-20 transition text-xl px-3 py-1">→</button>
            </div>

            <div className="absolute top-4 right-6 text-[#4b4b4b] text-sm font-mono">{current + 1}/{total}</div>
        </div>
    );
}
