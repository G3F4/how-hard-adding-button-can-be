import { useState, useEffect, useCallback } from "react";

const modules = [
    { id: 1, label: "Button", color: "bg-cyan-500" },
    { id: 2, label: "Process", color: "bg-violet-500" },
    { id: 3, label: "Specialization", color: "bg-amber-500" },
];

const layers = [
    { icon: "🎨", name: "UI/UX", color: "text-indigo-400", bg: "bg-indigo-950", border: "border-indigo-700" },
    { icon: "⚛️", name: "Client", color: "text-blue-400", bg: "bg-blue-950", border: "border-blue-700" },
    { icon: "🔀", name: "BFF", color: "text-violet-400", bg: "bg-violet-950", border: "border-violet-700" },
    { icon: "⚙️", name: "Service", color: "text-purple-400", bg: "bg-purple-950", border: "border-purple-700" },
    { icon: "🗄️", name: "DB", color: "text-fuchsia-400", bg: "bg-fuchsia-950", border: "border-fuchsia-700" },
];

const LayerBar = ({ active }: { active: number }) => {
    if (active < 0) return null;
    return (
        <div className="absolute top-4 left-6 flex items-center gap-1.5">
            {layers.map((l, i) => (
                <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${i === active ? `${l.bg} ${l.border} border ${l.color} font-bold` : i < active ? "bg-slate-800 border border-slate-700 text-slate-500" : "text-slate-700"}`}>
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
            <div key={m.id} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${m.id === moduleId ? `${m.color} text-white font-bold` : m.id < moduleId ? "bg-slate-700 text-slate-400" : "bg-slate-800 text-slate-600"}`}>
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
                <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">Because sometimes one button is the start of an architectural discussion about <span className="text-cyan-400">scalability</span>, <span className="text-violet-400">responsibility</span>, and the <span className="text-amber-400">borders of frontend</span>.</p>
                <div className="mt-16 text-slate-600 text-sm">→ use arrow keys or click navigation below</div>
            </div>
        ),
    },
    // ============ MODULE 1 — BUTTON PROBLEMS ============
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <p className="text-cyan-500 text-sm uppercase tracking-widest mb-4">Module 1 — ~7 minutes</p>
                <h2 className="text-4xl font-bold text-white mb-4">"It's just a button"</h2>
                <p className="text-xl text-slate-400">Five problems hiding behind a simple button.<br/>Each one is a different web specialization.</p>
            </div>
        ),
    },
    // M1 #1 — <button> vs <div> (HTML / Web Standards)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #1</p>
                <h2 className="text-3xl font-bold text-white mb-3">{"<button>"} vs {"<div>"} — semantics matter</h2>
                <p className="text-slate-400 mb-8">"They look the same. They behave completely differently."</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-green-400 font-bold mb-3">{"<button>"}</p>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p>✅ Focusable by default — no tabindex needed</p>
                                <p>✅ Enter and Space activate it — built into the browser</p>
                                <p>✅ Screen reader announces "button" — implicit role</p>
                                <p>✅ Supports <span className="font-mono text-xs bg-slate-700 px-1 rounded">disabled</span> natively — grays out, skips in Tab order</p>
                                <p>✅ Participates in form submission — type="submit" by default</p>
                                <p>✅ cursor: pointer is the default — no extra CSS</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-red-400 font-bold mb-3">{"<div onclick=\"...\">"}</p>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p>❌ Not focusable — must add tabindex="0"</p>
                                <p>❌ Keyboard doesn't work — must add onkeydown for Enter + Space</p>
                                <p>❌ Screen reader says nothing useful — must add role="button"</p>
                                <p>❌ No disabled state — must use aria-disabled + prevent clicks manually</p>
                                <p>❌ No form integration — must handle submission with JavaScript</p>
                                <p>❌ cursor: pointer missing — must add it in CSS</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-slate-700 pt-4">
                        <p className="text-slate-400 text-sm">Recreating native {"<button>"} behavior with {"<div>"} takes ~15 lines of extra code. And most projects skip half of them. This is <span className="text-cyan-400">HTML standards knowledge</span> — a specialization in itself.</p>
                    </div>
                </div>
            </div>
        ),
    },
    // M1 #2 — Stacking context (CSS / Visual Rendering Model)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #2</p>
                <h2 className="text-3xl font-bold text-white mb-3">Stacking context — why z-index: 99999 doesn't work</h2>
                <p className="text-slate-400 mb-8">"Your button is there. But something invisible is covering it."</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-red-400 font-bold mb-3">❌ The trap</p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <p>Header button has <span className="font-mono text-xs bg-slate-700 px-1 rounded">z-index: 100</span>.</p>
                            <p>You add a dropdown below it with <span className="font-mono text-xs bg-slate-700 px-1 rounded">z-index: 1000</span>.</p>
                            <p>But the header's parent has <span className="font-mono text-xs bg-slate-700 px-1 rounded">transform: translateY(0)</span>.</p>
                            <p>That one CSS property creates a <span className="text-white font-semibold">new stacking context</span>.</p>
                            <p>Now z-index: 1000 only competes <span className="text-red-400">inside that context</span>.</p>
                            <p>Your dropdown is trapped — invisible behind the overlay.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-orange-400 font-bold mb-3">Properties that create new stacking context</p>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p><span className="font-mono text-xs bg-slate-700 px-1.5 rounded">transform</span> — even translateZ(0)</p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1.5 rounded">opacity</span> — less than 1</p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1.5 rounded">filter</span> — blur, brightness...</p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1.5 rounded">will-change</span></p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1.5 rounded">position: fixed / sticky</span></p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1.5 rounded">contain: paint</span></p>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-6 max-w-4xl">z-index is not a global ranking. It's local to a stacking context. Understanding this requires deep <span className="text-cyan-400">CSS rendering knowledge</span> — many senior developers still get this wrong.</p>
            </div>
        ),
    },
    // M1 #3 — Event propagation (JavaScript / DOM API)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #3</p>
                <h2 className="text-3xl font-bold text-white mb-3">Event propagation — the click that fires twice</h2>
                <p className="text-slate-400 mb-8">"You click 'Delete'. The row also opens. Why?"</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-purple-400 font-bold mb-3">The Bubbling Trap</p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <p>"Delete" button sits inside a clickable table row.</p>
                            <p>User clicks "Delete".</p>
                            <p>The click event fires on the button → then <span className="text-white font-semibold">bubbles up</span> to the row.</p>
                            <p>Both handlers execute. Row opens <span className="text-white">AND</span> item gets deleted.</p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1 rounded">stopPropagation()</span>? Fixes this, but breaks event listeners higher up.</p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1 rounded">addEventListener</span> on document? Now it never receives the event.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-orange-400 font-bold mb-3">Nesting violations</p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <p><span className="font-mono text-xs bg-red-900 px-1.5 rounded">{"<a><button>Click</button></a>"}</span> — invalid HTML.</p>
                            <p><span className="font-mono text-xs bg-red-900 px-1.5 rounded">{"<button><button>Inner</button></button>"}</span> — invalid HTML.</p>
                            <p>Browsers "fix" these differently — Chrome, Firefox, Safari disagree.</p>
                            <p>The click target might be the inner or outer element — unpredictable.</p>
                            <p>Forms with multiple submit buttons — which one "wins"?</p>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-6 max-w-4xl">The DOM event system has three phases: capture → target → bubble. Most developers only know about bubble. Understanding the full model is deep <span className="text-cyan-400">JavaScript / DOM knowledge</span>.</p>
            </div>
        ),
    },
    // M1 #4 — Focus trap & keyboard (Accessibility / WCAG)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #4</p>
                <h2 className="text-3xl font-bold text-white mb-3">Focus trap & keyboard navigation</h2>
                <p className="text-slate-400 mb-8">"Try using your website with just the keyboard. It probably doesn't work."</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-red-400 font-bold mb-3">❌ What usually happens</p>
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>Button opens a dropdown or modal.</p>
                            <p>Tab key moves focus behind the modal — user is lost.</p>
                            <p>There's no way to close it with Escape.</p>
                            <p>Focus never returns to the button after closing.</p>
                            <p>Screen reader doesn't announce that something opened.</p>
                            <p>Keyboard user is stuck — they have to reload the page.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-green-400 font-bold mb-3">✅ What should happen — pure HTML + JS</p>
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>Set <span className="font-mono text-xs bg-slate-700 px-1 rounded">tabindex</span> on focusable elements inside the modal.</p>
                            <p>Use <span className="font-mono text-xs bg-slate-700 px-1 rounded">element.focus()</span> to move focus into the modal on open.</p>
                            <p>Listen for Escape with <span className="font-mono text-xs bg-slate-700 px-1 rounded">{"addEventListener('keydown', ...)"}</span>.</p>
                            <p>On close, return focus to the original button with <span className="font-mono text-xs bg-slate-700 px-1 rounded">button.focus()</span>.</p>
                            <p>Add <span className="font-mono text-xs bg-slate-700 px-1 rounded">aria-expanded="true"</span> to the trigger button.</p>
                            <p>Use the <span className="font-mono text-xs bg-slate-700 px-1 rounded">inert</span> attribute on background content to lock focus inside.</p>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-6 max-w-4xl">15% of users rely on keyboard navigation. Accessibility (WCAG 2.1 AA) is a legal requirement in the EU. Making a button accessible is its own <span className="text-cyan-400">specialization</span> — it requires understanding assistive technologies.</p>
            </div>
        ),
    },
    // M1 #5 — Layout Shift (Web Performance / Core Web Vitals)
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #5</p>
                <h2 className="text-3xl font-bold text-white mb-3">Layout Shift — the button that moves the page</h2>
                <p className="text-slate-400 mb-8">"You add a button and suddenly everything 'jumps'."</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-5">
                        <div>
                            <p className="text-white font-semibold mb-2">Button appears after content loads</p>
                            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                                <p className="text-slate-500">{"// element appears after fetch completes"}</p>
                                <p className="text-blue-400">{"container.appendChild(button)"}</p>
                                <p className="text-slate-500">{"// → everything below shifts down"}</p>
                                <p className="text-slate-500">{"// → CLS += 0.15 💥"}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-semibold mb-2">Button changes text and size</p>
                            <div className="flex gap-3 items-center">
                                <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">"Download"</div>
                                <span className="text-slate-500">→</span>
                                <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">"Generating report..."</div>
                                <span className="text-slate-500">→</span>
                                <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">"✓ Done"</div>
                            </div>
                            <p className="text-slate-500 text-sm mt-2">Each label = different width = layout shift for neighbors.</p>
                        </div>
                        <div className="border-t border-slate-700 pt-4">
                            <p className="text-green-400 font-semibold mb-2">Solutions:</p>
                            <div className="space-y-1 text-slate-300 text-sm">
                                <p><span className="text-white">min-width</span> on the button — reserves space regardless of text.</p>
                                <p><span className="text-white">Placeholder element</span> — empty space before button loads.</p>
                                <p><span className="text-white">Fixed slot in layout</span> — CSS grid/flexbox keeps position stable.</p>
                                <p><span className="text-white">visibility: hidden</span> instead of display: none — keeps the space.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-4 max-w-3xl">CLS (Cumulative Layout Shift) is a Core Web Vital. Google uses it for search ranking. Understanding browser rendering and <span className="text-cyan-400">layout performance</span> is its own specialization.</p>
            </div>
        ),
    },
    // M1 - Bridge
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-12">
                <h2 className="text-3xl font-bold text-white mb-6">And that was "just" the UI layer.</h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">HTML semantics, CSS rendering, DOM events,<br/>accessibility, web performance...</p>
                <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">Each of these five problems is someone's <span className="text-cyan-400 font-semibold">specialization</span>.<br/>And we haven't even left the browser yet.</p>
                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">Now what happens when that button triggers<br/><span className="text-violet-400 font-bold text-2xl">a real business process</span><br/>that cuts through the entire stack?</p>
                <div className="mt-10 text-slate-600">→</div>
            </div>
        ),
    },

    // ============ MODULE 2 — FULL STACK PROCESS ============
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <p className="text-violet-500 text-sm uppercase tracking-widest mb-4">Module 2 — ~10 minutes</p>
                <h2 className="text-4xl font-bold text-white mb-4">"Download Report"</h2>
                <p className="text-xl text-slate-400">A new process in an existing system.<br/>Layer by layer — from click to database.</p>
            </div>
        ),
    },
    // M2 - PM scene
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-slate-500 text-sm uppercase tracking-widest mb-6">Monday, standup</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">PM</div>
                        <p className="text-white text-lg leading-relaxed">"Users want to <span className="text-yellow-400 font-bold">download a PDF report</span> from the dashboard. We have the data, we have the view — let's add a button. How long will it take?"</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">DEV</div>
                        <p className="text-slate-400 text-lg">"It depends. Let me walk through this layer by layer."</p>
                    </div>
                </div>
                <div className="mt-8 text-slate-500 text-sm max-w-3xl">A PDF report is a new process — new data flow, new transformations, new output. It has to pass through <span className="text-slate-300">5 architectural layers</span>. At each one — decisions.</div>
            </div>
        ),
    },
    // M2 - Map
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-4">Journey map of a new process</h2>
                <p className="text-slate-400 mb-8">5 layers. At each — different questions, different decisions, different people.</p>
                <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto w-full">
                    {layers.map((l, i) => (
                        <div key={i} className="w-full">
                            <div className={`${l.bg} ${l.border} border rounded-xl px-6 py-4 flex items-center gap-4`}>
                                <span className="text-2xl">{l.icon}</span>
                                <div>
                                    <p className={`${l.color} font-bold text-lg`}>{l.name}</p>
                                    <p className="text-slate-400 text-sm">
                                        {i === 0 && "What does the user see? What button states? How long to wait?"}
                                        {i === 1 && "Where do parameters come from? How to track loading and errors?"}
                                        {i === 2 && "What URL does the frontend call? Does the response come immediately?"}
                                        {i === 3 && "How to generate the PDF? What if it takes a long time?"}
                                        {i === 4 && "How much data? Will it slow down the app for everyone?"}
                                    </p>
                                </div>
                            </div>
                            {i < 4 && <div className="flex justify-center py-1"><div className="w-0.5 h-4 bg-slate-700" /></div>}
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
                <p className="text-indigo-500 text-sm uppercase tracking-widest mb-2">Layer 1</p>
                <h2 className="text-4xl font-bold text-white mb-3">🎨 UI / UX</h2>
                <p className="text-slate-400 text-lg mb-8">Before we write a single line of code — the designer asks:</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "Where does the button go?", d: "In the header? In a toolbar? In a sidebar? The location affects how the component is built." },
                            { q: "What states does the button need?", d: "Idle → Loading → Success → Error. Each state looks different — and the user needs to understand what's happening." },
                            { q: "What if it takes a long time?", d: "Show a spinner? A progress bar? Tell the user 'we'll email you'? This is a UX decision with technical consequences." },
                            { q: "What if the user clicks multiple times?", d: "Disable the button? Ignore extra clicks? Each choice affects the code below." },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-indigo-600 pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-slate-500 text-sm mt-1">{item.d}</p>
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
                <p className="text-blue-500 text-sm uppercase tracking-widest mb-2">Layer 2</p>
                <h2 className="text-4xl font-bold text-white mb-3">⚛️ Client Application</h2>
                <p className="text-slate-400 text-lg mb-8">User clicked. Now the frontend has a series of decisions:</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "Where do report parameters come from?", d: "Filters, date range, selected columns — the app needs to gather all this before sending the request." },
                            { q: "How to track what's happening?", d: "The button was clicked — now we need to show loading, handle success, handle errors. That's state management." },
                            { q: "Should we validate before sending?", d: "Check if the date range makes sense, if there's data to export. Better to catch problems early." },
                            { q: "How to handle the response?", d: "The server sends back a file. How do we trigger the download? What if it fails?" },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-blue-600 pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-slate-500 text-sm mt-1">{item.d}</p>
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
                <p className="text-violet-500 text-sm uppercase tracking-widest mb-2">Layer 3</p>
                <h2 className="text-4xl font-bold text-white mb-3">🔀 Backend for Frontend</h2>
                <p className="text-slate-400 text-lg mb-8">The translator between the UI world and the domain world.</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "What URL does the frontend call?", d: "POST /api/reports? /api/exports? Naming matters — it's part of the contract between frontend and backend." },
                            { q: "Does the response come immediately or later?", d: "Small report = instant response. Large report = 'accepted, check back later'. This one decision changes the whole flow." },
                            { q: "Who's allowed to generate reports?", d: "Authentication (who are you?) and authorization (can you do this?). The server must check both." },
                            { q: "How to translate UI filters to a database query?", d: "The UI says 'last 30 days, only active users'. The server needs to convert that into actual query parameters." },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-violet-600 pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-slate-500 text-sm mt-1">{item.d}</p>
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
                <p className="text-purple-500 text-sm uppercase tracking-widest mb-2">Layer 4</p>
                <h2 className="text-4xl font-bold text-white mb-3">⚙️ Domain Service</h2>
                <p className="text-slate-400 text-lg mb-8">This is where the heavy lifting happens.</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "Where does the report get generated?", d: "Is it part of an existing service or a new one? Adding to an existing service is faster but creates coupling." },
                            { q: "How to create the PDF?", d: "Render HTML and convert to PDF? Use a PDF library? Each approach has different trade-offs in quality and complexity." },
                            { q: "What if it takes a long time?", d: "With lots of data, generation can take seconds or minutes. Should it run in the background?" },
                            { q: "Where to store the generated file?", d: "On disk? In cloud storage? How long do we keep it? The user might want to download it again later." },
                            { q: "What about duplicate requests?", d: "User clicks twice — do we generate two reports? Or detect the duplicate and return the same file?" },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-purple-600 pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-slate-500 text-sm mt-1">{item.d}</p>
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
                <p className="text-fuchsia-500 text-sm uppercase tracking-widest mb-2">Layer 5</p>
                <h2 className="text-4xl font-bold text-white mb-3">🗄️ Database</h2>
                <p className="text-slate-400 text-lg mb-8">The foundation. This is where performance truth lives.</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-4">
                        {[
                            { q: "What data does the report need?", d: "One table or five? Simple query or complex joins? The report's requirements define the query complexity." },
                            { q: "How much data are we talking about?", d: "100 rows = instant. 100,000 rows = a few seconds. 5 million rows = minutes. Scale changes everything." },
                            { q: "Will this slow down the app for everyone?", d: "A heavy report query running on the main database can make the whole app slower for all users." },
                            { q: "Do we need new indexes?", d: "The report filters on columns that aren't indexed yet. Adding an index speeds up reads but can slow down writes." },
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-fuchsia-600 pl-4">
                                <p className="text-white font-semibold">{item.q}</p>
                                <p className="text-slate-500 text-sm mt-1">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // M2 - Full picture
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-6">Full picture: from click to file</h2>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-3xl mx-auto">
                    {[
                        { l: "🎨 UI/UX", a: "User clicks 'Download report'", c: "text-indigo-400", down: true },
                        { l: "⚛️ Client", a: "Gather filters → validate → send request to server", c: "text-blue-400", down: true },
                        { l: "🔀 BFF", a: "Check permissions → translate filters → call service", c: "text-violet-400", down: true },
                        { l: "⚙️ Service", a: "Fetch data → generate PDF → store file", c: "text-purple-400", down: true },
                        { l: "🗄️ DB", a: "Run query → return rows for the report", c: "text-fuchsia-400", down: false },
                    ].map((item, i) => (
                        <div key={`d${i}`}>
                            <div className="flex items-center gap-4 py-1.5">
                                <span className={`${item.c} font-semibold text-sm w-24 flex-shrink-0`}>{item.l}</span>
                                <span className="text-slate-300 text-sm">{item.a}</span>
                            </div>
                            {item.down && <div className="flex"><span className="w-24 flex-shrink-0" /><span className="text-slate-700 text-xs ml-10">↓</span></div>}
                        </div>
                    ))}
                    <div className="border-t border-dashed border-slate-700 my-3" />
                    {[
                        { l: "⚙️ Service", a: "PDF ready → file URL available", c: "text-purple-400", up: true },
                        { l: "🔀 BFF", a: "Return download link to the client", c: "text-violet-400", up: true },
                        { l: "⚛️ Client", a: "Receive response → trigger file download", c: "text-blue-400", up: true },
                        { l: "🎨 UI/UX", a: "Show success → file downloaded", c: "text-indigo-400", up: false },
                    ].map((item, i) => (
                        <div key={`u${i}`}>
                            <div className="flex items-center gap-4 py-1.5">
                                <span className={`${item.c} font-semibold text-sm w-24 flex-shrink-0`}>{item.l}</span>
                                <span className="text-slate-300 text-sm">{item.a}</span>
                            </div>
                            {item.up && <div className="flex"><span className="w-24 flex-shrink-0" /><span className="text-slate-700 text-xs ml-10">↑</span></div>}
                        </div>
                    ))}
                </div>
                <p className="text-center text-slate-500 text-sm mt-4">9 steps. 5 layers. Dozens of decisions. One button.</p>
            </div>
        ),
    },
    // M2 - Error handling
    {
        nav: "module", moduleId: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">What happens when things go wrong?</h2>
                <p className="text-slate-400 mb-5">Each layer fails in its own way:</p>
                <div className="space-y-2.5 max-w-3xl">
                    {[
                        { layer: "🎨 UI", err: "User closes the browser mid-generation", q: "Does the report still generate? Can they come back and download it later?" },
                        { layer: "⚛️ Client", err: "Network connection drops", q: "Show an error message? Retry automatically? Let the user try again manually?" },
                        { layer: "🔀 BFF", err: "Backend service is not responding", q: "Show a friendly error? Suggest trying again later? How long to wait before giving up?" },
                        { layer: "⚙️ Service", err: "Report generation crashes halfway through", q: "Try again automatically? Notify someone? Mark the job as failed?" },
                        { layer: "🗄️ DB", err: "Query takes too long and times out", q: "Set a time limit? Break into smaller queries? Use pre-computed data?" },
                    ].map((item, i) => (
                        <div key={i} className="bg-red-950 border border-red-900 rounded-xl p-3.5 flex items-start gap-3">
                            <span className="text-base flex-shrink-0">{item.layer}</span>
                            <div>
                                <p className="text-red-300 font-semibold text-sm">{item.err}</p>
                                <p className="text-slate-500 text-xs mt-0.5">{item.q}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-slate-500 text-sm mt-4">Error handling is not an afterthought. It's an integral part of design at every layer.</p>
            </div>
        ),
    },

    // ============ MODULE 3 — NARROW SPECIALIZATION ============
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <p className="text-amber-500 text-sm uppercase tracking-widest mb-4">Module 3 — ~8 minutes</p>
                <h2 className="text-4xl font-bold text-white mb-4">Narrow Specialization</h2>
                <p className="text-xl text-slate-400">Why "I'm a frontend developer"<br/>stopped being enough — and what to do about it.</p>
            </div>
        ),
    },
    // M3 - The phenomenon
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">The phenomenon: narrow specialization</h2>
                <p className="text-slate-400 mb-8">How the frontend market fragmented.</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-amber-400 font-bold mb-4">~2015</p>
                        <p className="text-slate-300 text-sm leading-relaxed">"Frontend developer" = one role. You know HTML, CSS, JS, jQuery, maybe Angular. You do everything — from layouts to AJAX calls. Teams are small. Everyone touches every part.</p>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-orange-400 font-bold mb-4">~2019–2021</p>
                        <p className="text-slate-300 text-sm leading-relaxed">Big Tech is growing. The pandemic accelerates digitalization. Companies hire aggressively. They need "experts" — for React, for design systems, for performance, for a11y, for state management...</p>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-red-400 font-bold mb-4">~2023+</p>
                        <p className="text-slate-300 text-sm leading-relaxed">Layoffs. Smaller teams. Tight budgets. Suddenly companies need people who understand the <span className="text-white">whole stack</span>, not just their slice. But many devs only know one framework.</p>
                    </div>
                </div>
            </div>
        ),
    },
    // M3 - How it happened
    {
        nav: "module", moduleId: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <h2 className="text-3xl font-bold text-white mb-3">How did we get here?</h2>
                <p className="text-slate-400 mb-8">The mechanisms that created narrow specialists.</p>
                <div className="space-y-4 max-w-3xl">
                    {[
                        { icon: "🏢", t: "Big Tech scale", d: "With 500 frontend devs, it pays to have a 'bundler tooling team.' With 5 people — it doesn't." },
                        { icon: "📦", t: "Framework ecosystem", d: "React, Angular, Vue, Svelte, Solid, Qwik... Each is a separate universe. Easy to spend 3 years learning one and never see the rest." },
                        { icon: "📋", t: "Keyword-driven hiring", d: "'3+ years React experience' → devs optimize their CVs for frameworks, not skills." },
                        { icon: "🧱", t: "Microfrontends & ownership", d: "Teams own a fragment of UI. You never see the BFF, services, or database." },
                        { icon: "💰", t: "Pandemic hiring boom", d: "2020–2021: hire fast, onboard fast, assign a narrow scope. No time for T-shape development." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4">
                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                            <div>
                                <p className="text-white font-semibold">{item.t}</p>
                                <p className="text-slate-500 text-sm mt-1">{item.d}</p>
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
                <p className="text-slate-400 mb-8">The narrowly specialized developer:</p>
                <div className="grid grid-cols-2 gap-5 max-w-4xl">
                    <div className="bg-red-950 border border-red-900 rounded-xl p-5">
                        <p className="text-red-400 font-bold text-lg mb-3">Doesn't understand context</p>
                        <p className="text-slate-400 text-sm">Writes a button but has no idea what happens after the click. Doesn't know the API contract, doesn't understand the data model, can't see the DB performance implications.</p>
                    </div>
                    <div className="bg-red-950 border border-red-900 rounded-xl p-5">
                        <p className="text-red-400 font-bold text-lg mb-3">Makes bad decisions</p>
                        <p className="text-slate-400 text-sm">Implements PDF generation on the frontend because they don't know the backend has infrastructure for it. Or builds polling because they don't know we have WebSockets.</p>
                    </div>
                    <div className="bg-red-950 border border-red-900 rounded-xl p-5">
                        <p className="text-red-400 font-bold text-lg mb-3">Is hard to transfer</p>
                        <p className="text-slate-400 text-sm">Knows one framework, one ecosystem, one toolchain. Switching projects = learning from scratch. A risk for the company and the career.</p>
                    </div>
                    <div className="bg-red-950 border border-red-900 rounded-xl p-5">
                        <p className="text-red-400 font-bold text-lg mb-3">Doesn't grow as an engineer</p>
                        <p className="text-slate-400 text-sm">Senior doesn't mean "5 years of React." Senior means understanding trade-offs across multiple levels. Narrow specialization blocks that growth.</p>
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
                <p className="text-slate-400 mb-8">Practical steps to avoid becoming a one-button specialist.</p>
                <div className="space-y-4 max-w-3xl">
                    {[
                        { n: "01", t: "Read backend pull requests", d: "You don't need to write Go or Java. But understand the contract, the data model, the error handling on the other side. Code review is the best learning." },
                        { n: "02", t: "Join design sessions", d: "When the PM comes with a new feature — be in the room. Understanding 'why' matters more than 'how.'" },
                        { n: "03", t: "Learn the layer above and below", d: "Frontend dev? Learn BFF basics and infrastructure. Learn to read SQL explain plans. Learn design thinking." },
                        { n: "04", t: "Build full-stack side projects", d: "A deployed app: frontend + API + database + CI/CD. Doesn't have to be your work stack. It's about gaining context." },
                        { n: "05", t: "Talk to other teams", d: "DBA, DevOps, security, product. Every conversation gives you a new perspective on your own code." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <span className="text-amber-500 font-mono font-bold text-lg">{item.n}</span>
                            <div>
                                <p className="text-white font-semibold text-lg">{item.t}</p>
                                <p className="text-slate-400 text-sm">{item.d}</p>
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
                        <div className="bg-amber-600 rounded-t-xl px-4 py-3 w-full text-center">
                            <p className="text-white font-bold text-sm">Broad understanding: UX · API · DB · Infra · Security · Product</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-amber-500 rounded-b-xl px-4 py-6 w-32 text-center">
                            <p className="text-white font-bold text-sm">Deep<br/>expertise<br/>↓<br/>Frontend</p>
                        </div>
                    </div>
                </div>
                <p className="text-slate-400 mt-8 max-w-lg text-sm leading-relaxed">It's not about being a full-stack developer. It's about <span className="text-white">understanding the context</span> around your specialization. Deep knowledge + broad understanding = better decisions at every layer.</p>
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
                        <div className="w-3 h-3 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-lg">Even a "simple" button is complex</p>
                            <p className="text-slate-400 text-sm">HTML semantics, CSS rendering, DOM events, accessibility, web performance — five specializations hiding behind one button.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-lg">A new process = decisions at every layer</p>
                            <p className="text-slate-400 text-sm">From UI through client, BFF, domain service to database — and decisions propagate both up and down.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-lg">Understanding context &gt; narrow expertise</p>
                            <p className="text-slate-400 text-sm">T-shaped mindset — deep knowledge in your domain, broad understanding of the rest of the stack.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-slate-800 pt-6 max-w-2xl">
                    <p className="text-slate-500 text-sm italic">"How hard can it be to add a button?" — Hard enough to need the whole team talking to each other.</p>
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
                <p className="text-xl text-slate-400 mb-2">Next time someone says</p>
                <p className="text-2xl text-white font-bold mb-4">"it's just one button"</p>
                <p className="text-xl text-slate-400">— ask: <span className="text-indigo-400">"at which layer?"</span></p>
                <div className="mt-12 text-slate-600 text-lg">Q&A</div>
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
        <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden select-none">
            <div className="w-full h-full">{s.render()}</div>

            {s.nav === "module" && s.moduleId !== undefined && <ModuleBar moduleId={s.moduleId} />}
            {s.nav === "layer" && s.layer !== undefined && <LayerBar active={s.layer} />}

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3">
                <button onClick={() => go(-1)} disabled={current === 0} className="text-slate-500 hover:text-white disabled:opacity-20 transition text-xl px-3 py-1">←</button>
                <div className="flex items-center gap-1">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "bg-indigo-400 w-4 h-2" : "bg-slate-700 hover:bg-slate-500 w-1.5 h-1.5"}`} />
                    ))}
                </div>
                <button onClick={() => go(1)} disabled={current === total - 1} className="text-slate-500 hover:text-white disabled:opacity-20 transition text-xl px-3 py-1">→</button>
            </div>

            <div className="absolute top-4 right-6 text-slate-600 text-sm font-mono">{current + 1}/{total}</div>
        </div>
    );
}
