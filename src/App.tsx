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
                <p className="text-xl text-slate-400">Non-obvious problems lurking behind<br/>adding an ordinary button to a page.</p>
            </div>
        ),
    },
    // M1 - Focus trap
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #1</p>
                <h2 className="text-3xl font-bold text-white mb-3">Focus management & accessibility</h2>
                <p className="text-slate-400 mb-8">You add a button. But do you know what happens when the user presses Tab?</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-red-400 font-bold mb-3">❌ Typical scenario</p>
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>Button opens a dropdown or modal.</p>
                            <p>Focus stays on the button or escapes to body.</p>
                            <p>Screen reader has no idea something opened.</p>
                            <p>Escape does nothing.</p>
                            <p>Tab travels behind the modal — <span className="text-red-400">no focus trap</span>.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-green-400 font-bold mb-3">✅ What a11y requires</p>
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p><span className="text-white font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">role</span>, <span className="text-white font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">aria-expanded</span>, <span className="text-white font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">aria-haspopup</span></p>
                            <p>Focus trap inside the modal/dropdown</p>
                            <p>Escape closes and returns focus to trigger</p>
                            <p>Correct focus order in DOM</p>
                            <p><span className="text-green-400">Roving tabindex</span> if it's a toolbar</p>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-6 max-w-4xl">A single button that opens anything is a whole focus management subsystem. WCAG 2.1 AA is not "nice to have" — it's a legal requirement in the EU.</p>
            </div>
        ),
    },
    // M1 - Layout shift
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #2</p>
                <h2 className="text-3xl font-bold text-white mb-3">Layout Shift — the button that moves the page</h2>
                <p className="text-slate-400 mb-8">You add a button dynamically and suddenly everything "jumps".</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="space-y-5">
                        <div>
                            <p className="text-white font-semibold mb-2">Button appears after data loads</p>
                            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                                <p className="text-slate-500">{"// data is loading..."}</p>
                                <p className="text-blue-400">{"if (data) return <Button>Download</Button>"}</p>
                                <p className="text-slate-500">{"// → sudden reflow, CLS += 0.15 💥"}</p>
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
                            <p className="text-slate-300 text-sm"><span className="text-white">min-width</span> on the button, <span className="text-white">skeleton placeholder</span> before data loads, <span className="text-white">fixed slot in layout</span> even when the button is hidden.</p>
                            <p className="text-slate-500 text-xs mt-2">CLS (Cumulative Layout Shift) is a Core Web Vital — it affects SEO and Google ranking.</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    // M1 - Race conditions
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #3</p>
                <h2 className="text-3xl font-bold text-white mb-3">Race conditions & stale closures</h2>
                <p className="text-slate-400 mb-8">User clicks fast. Your handler lives in the past.</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-900 border border-red-900 rounded-xl p-5">
                        <p className="text-red-400 font-bold text-sm mb-3">❌ The trap</p>
                        <div className="font-mono text-xs leading-relaxed text-slate-400">
                            <p className="text-red-400">const [filters, setFilters] = useState(init)</p>
                            <p className="mt-2">const handleClick = async () =&gt; {"{"}</p>
                            <p className="ml-3 text-slate-500">{"// filters closed over in closure"}</p>
                            <p className="ml-3">const res = await fetch(url, {"{"}</p>
                            <p className="ml-6">body: JSON.stringify(filters)</p>
                            <p className="ml-3">{"}"})</p>
                            <p className="ml-3 text-slate-500">{"// user changed filters mid-flight!"}</p>
                            <p className="ml-3 text-slate-500">{"// we sent stale data"}</p>
                            <p>{"}"}</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-900 border border-green-900 rounded-xl p-5">
                        <p className="text-green-400 font-bold text-sm mb-3">✅ Solutions</p>
                        <div className="space-y-4 text-sm text-slate-300">
                            <div>
                                <p className="text-white font-semibold">AbortController</p>
                                <p className="text-slate-500 text-xs">Cancel previous request when a new one arrives</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold">useRef for current state</p>
                                <p className="text-slate-500 text-xs">Ref always holds current value, not the closure's</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold">Disable button during request</p>
                                <p className="text-slate-500 text-xs">Simplest — but not always sufficient</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold">Request ID / nonce</p>
                                <p className="text-slate-500 text-xs">Ignore response if ID doesn't match current</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-6 max-w-4xl">This is not an edge case. It's daily life in SPAs. Every button that triggers an async operation is a potential race condition.</p>
            </div>
        ),
    },
    // M1 - button vs div
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #4</p>
                <h2 className="text-3xl font-bold text-white mb-3">{"<button>"} vs {"<div onClick>"} — semantics matter</h2>
                <p className="text-slate-400 mb-8">Looks the same. Behaves completely differently.</p>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-green-400 font-bold mb-3">{"<button>"}</p>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p>✅ Keyboard-focusable by default</p>
                                <p>✅ Enter and Space activate it</p>
                                <p>✅ Screen reader announces "button"</p>
                                <p>✅ Supports <span className="font-mono text-xs bg-slate-700 px-1 rounded">disabled</span> natively</p>
                                <p>✅ Participates in form submission</p>
                                <p>✅ Implicit role="button"</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-red-400 font-bold mb-3">{"<div onClick>"}</p>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p>❌ Not focusable (needs tabIndex)</p>
                                <p>❌ Enter/Space don't work (needs onKeyDown)</p>
                                <p>❌ Screen reader says "group" or nothing</p>
                                <p>❌ Needs role="button" manually</p>
                                <p>❌ aria-disabled instead of disabled</p>
                                <p>❌ cursor: pointer isn't default</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-slate-700 pt-4">
                        <p className="text-slate-400 text-sm">And yet — in many projects <span className="text-white font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">{"<div onClick>"}</span> is the standard. Because "it's easier to style." The cost? Accessibility, UX, and 15 extra lines to recreate native behavior.</p>
                    </div>
                </div>
            </div>
        ),
    },
    // M1 - z-index & event propagation
    {
        nav: "module", moduleId: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-cyan-600 text-sm uppercase tracking-widest mb-2">Problem #5</p>
                <h2 className="text-3xl font-bold text-white mb-3">Stacking context & event propagation</h2>
                <p className="text-slate-400 mb-8">The button is there, but invisible. Or you click it — and something else reacts.</p>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-orange-400 font-bold mb-3">🔮 Z-index Wars</p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <p>New button in the header. But sticky header has <span className="font-mono text-xs bg-slate-700 px-1 rounded">z-index: 100</span>.</p>
                            <p>Modal overlay has <span className="font-mono text-xs bg-slate-700 px-1 rounded">z-index: 999</span>.</p>
                            <p>Dropdown from the button has <span className="font-mono text-xs bg-slate-700 px-1 rounded">z-index: 1000</span>.</p>
                            <p>But a <span className="font-mono text-xs bg-slate-700 px-1 rounded">transform</span> on the parent creates a new stacking context — and suddenly <span className="text-red-400">z-index: 99999 does nothing</span>.</p>
                            <p className="text-slate-500 mt-2">Solution? Portal. Or deliberate stacking context management in the design system.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <p className="text-purple-400 font-bold mb-3">🫧 Event Bubbling Trap</p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <p>"Delete" button inside a clickable table row.</p>
                            <p>Click "Delete" → both Delete handler <span className="text-white">and</span> RowClick handler fire.</p>
                            <p><span className="font-mono text-xs bg-slate-700 px-1 rounded">stopPropagation()</span>? Breaks event delegation higher up.</p>
                            <p>Button inside a link? Button inside a button? Nested interactive elements are an HTML violation.</p>
                            <p className="text-slate-500 mt-2">A simple button in complex UI is an event propagation minefield.</p>
                        </div>
                    </div>
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
                <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">Focus management, layout shift, race conditions, HTML semantics, stacking context, event propagation...</p>
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
                <p className="text-violet-500 text-sm uppercase tracking-widest mb-4">Module 2 — ~17 minutes</p>
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
                                        {i === 0 && "What does the user see? What states? How long to wait?"}
                                        {i === 1 && "Where do params come from? How to manage operation state?"}
                                        {i === 2 && "What API contract? Sync or async?"}
                                        {i === 3 && "Who generates the PDF? Queue? Worker?"}
                                        {i === 4 && "What data range? How not to kill the database?"}
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
                            { q: "Where does the button live?", d: "Header? Toolbar? Context menu? Each location = different layout constraints and component responsibility." },
                            { q: "What states does it need?", d: "Idle → Hover → Loading → Success → Error → Disabled. At least 6 visual variants." },
                            { q: "What if generation takes 45 seconds?", d: "Spinner? Progress bar? Modal with 'we'll email you'? This is a fundamental UX decision." },
                            { q: "What if the user clicks 3 times?", d: "Debounce? Disable? Queue? A UX decision with consequences on every layer below." },
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
    // M2 - Layer 1: States
    {
        nav: "layer", layer: 0,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-indigo-500 text-sm uppercase tracking-widest mb-2">Layer 1 — UI / UX</p>
                <h2 className="text-3xl font-bold text-white mb-8">One button, six faces</h2>
                <div className="grid grid-cols-3 gap-4 max-w-3xl">
                    {[
                        { state: "Idle", btn: "bg-indigo-600 text-white", label: "📥 Download report", note: "Default state. Clear CTA." },
                        { state: "Hover", btn: "bg-indigo-500 text-white ring-2 ring-indigo-400", label: "📥 Download report", note: "Feedback: I'm clickable." },
                        { state: "Loading", btn: "bg-indigo-800 text-indigo-300 cursor-wait", label: "⏳ Generating...", note: "Disable + progress info." },
                        { state: "Success", btn: "bg-green-600 text-white", label: "✅ Done!", note: "Confirmation + auto-download?" },
                        { state: "Error", btn: "bg-red-600 text-white", label: "❌ Try again", note: "Retry CTA. What message?" },
                        { state: "Disabled", btn: "bg-slate-700 text-slate-500 cursor-not-allowed", label: "📥 Download report", note: "No permissions? No data?" },
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col items-center">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">{item.state}</p>
                            <div className={`${item.btn} px-4 py-2 rounded-lg text-sm font-medium mb-3 text-center whitespace-nowrap`}>{item.label}</div>
                            <p className="text-slate-500 text-xs text-center">{item.note}</p>
                        </div>
                    ))}
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
                            { q: "Where do report parameters come from?", d: "Filters, dates, columns — it's app state. Props drilling? Context? Store? URL params? What if they're out of sync?" },
                            { q: "How to manage operation state?", d: "useState? Global store? React Query mutation? What if the user navigates away mid-operation?" },
                            { q: "Client-side validation?", d: "Sensible date range? Non-empty dataset? Better to check now than burden the server." },
                            { q: "Response handling?", d: "Sync: Blob → download. Async: jobId → polling → downloadUrl. Fundamentally different code flows." },
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
    // M2 - Layer 2: Code flow
    {
        nav: "layer", layer: 1,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-blue-500 text-sm uppercase tracking-widest mb-2">Layer 2 — Client Application</p>
                <h2 className="text-3xl font-bold text-white mb-6">Code flow</h2>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-5 font-mono text-sm leading-relaxed">
                        <p className="text-slate-500 mb-3">{"// Looks simple..."}</p>
                        <p className="text-blue-400">const handleExport = async () =&gt; {"{"}</p>
                        <p className="text-slate-400 ml-4">setLoading(true)</p>
                        <p className="text-slate-500 ml-4">{"// 1. Gather parameters"}</p>
                        <p className="text-slate-400 ml-4">const params = getFilters()</p>
                        <p className="text-slate-500 ml-4">{"// 2. Validate"}</p>
                        <p className="text-slate-400 ml-4">if (!validate(params)) return</p>
                        <p className="text-slate-500 ml-4">{"// 3. Send request"}</p>
                        <p className="text-slate-400 ml-4">const job = await api.startExport(params)</p>
                        <p className="text-slate-500 ml-4">{"// 4. Poll status"}</p>
                        <p className="text-slate-400 ml-4">await pollUntilDone(job.id)</p>
                        <p className="text-slate-500 ml-4">{"// 5. Download file"}</p>
                        <p className="text-slate-400 ml-4">await downloadFile(job.url)</p>
                        <p className="text-blue-400">{"}"}</p>
                    </div>
                    <div className="flex-1 space-y-3">
                        <p className="text-slate-400 font-semibold mb-2">But each step is a decision:</p>
                        {[
                            { n: "1", t: "Parameters", d: "From URL, store, or props? What if they're desynchronized?" },
                            { n: "2", t: "Validation", d: "Toast? Inline error? Preemptively disable?" },
                            { n: "3", t: "Request", d: "Who defines the contract — front or back?" },
                            { n: "4", t: "Polling", d: "Interval? Max time? What after timeout?" },
                            { n: "5", t: "Download", d: "Blob? Presigned URL? What about mobile?" },
                        ].map((item, i) => (
                            <div key={i} className="bg-blue-950 border border-blue-900 rounded-lg p-3 flex items-start gap-3">
                                <span className="text-blue-500 font-mono font-bold">{item.n}</span>
                                <div>
                                    <p className="text-blue-300 font-semibold text-sm">{item.t}</p>
                                    <p className="text-slate-500 text-xs">{item.d}</p>
                                </div>
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
                            { q: "What endpoint to expose?", d: "POST /reports? /exports? How does naming fit the rest of the API? Versioning?" },
                            { q: "Sync or async contract?", d: "200 + body? 202 Accepted + jobId? This is the key decision — affects both front and back." },
                            { q: "Parameter mapping", d: "BFF translates 'UI filters' into 'domain parameters'. This mapping is rarely 1:1." },
                            { q: "Auth & rate limiting", d: "Who can generate reports? How many per minute? BFF is the natural place for this." },
                            { q: "Response aggregation", d: "Status + metadata + downloadUrl might come from 3 different services. BFF glues them together." },
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
    // M2 - Layer 3: Two paths
    {
        nav: "layer", layer: 2,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-violet-500 text-sm uppercase tracking-widest mb-2">Layer 3 — BFF</p>
                <h2 className="text-3xl font-bold text-white mb-6">API Contract — two roads</h2>
                <div className="flex gap-6 max-w-4xl">
                    <div className="flex-1 bg-slate-900 border border-green-800 rounded-xl p-5">
                        <p className="text-green-400 font-bold text-lg mb-3">Synchronous</p>
                        <div className="font-mono text-sm space-y-1 text-slate-400">
                            <p className="text-green-400">POST /api/reports</p>
                            <p>{"{ filters, format: 'pdf' }"}</p>
                            <p className="text-slate-600 mt-2">↓ wait 5-60s...</p>
                            <p className="text-green-400 mt-2">200 OK</p>
                            <p>Content-Type: application/pdf</p>
                        </div>
                        <div className="mt-4 space-y-1 text-sm">
                            <p className="text-green-400">✅ Simple flow</p>
                            <p className="text-red-400">❌ Timeout on large datasets</p>
                            <p className="text-red-400">❌ Blocks the connection</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-900 border border-violet-800 rounded-xl p-5">
                        <p className="text-violet-400 font-bold text-lg mb-3">Asynchronous</p>
                        <div className="font-mono text-sm space-y-1 text-slate-400">
                            <p className="text-violet-400">POST /api/reports</p>
                            <p>{"→ 202 { jobId: 'abc-123' }"}</p>
                            <p className="text-slate-600 mt-2">↓ poll every 2s</p>
                            <p className="text-violet-400">GET /api/reports/abc-123</p>
                            <p>{"{ status, progress, downloadUrl }"}</p>
                        </div>
                        <div className="mt-4 space-y-1 text-sm">
                            <p className="text-green-400">✅ Scalable, retry-friendly</p>
                            <p className="text-green-400">✅ Progress tracking</p>
                            <p className="text-red-400">❌ Complex flow + infrastructure</p>
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-5">This decision changes <span className="text-white">every layer</span> above and below. This is the point where a button becomes a project.</p>
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
                            { q: "New service or extension?", d: "Is reporting a separate domain? Add to existing service? Coupling vs. complexity." },
                            { q: "How to generate the PDF?", d: "Puppeteer (HTML→PDF)? PDFKit? Gotenberg? Each has different trade-offs." },
                            { q: "Sync processing or queue?", d: "Worker? BullMQ? Lambda? With 50k rows it takes seconds or minutes." },
                            { q: "Where to store the file?", d: "S3 + presigned URL? TTL? How long to keep generated reports?" },
                            { q: "Idempotency?", d: "2 clicks = 2 reports? Or do we check for duplicates?" },
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
    // M2 - Layer 4: Pipeline
    {
        nav: "layer", layer: 3,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-purple-500 text-sm uppercase tracking-widest mb-2">Layer 4 — Domain Service</p>
                <h2 className="text-3xl font-bold text-white mb-6">Generation pipeline</h2>
                <div className="flex flex-col gap-1.5 max-w-2xl mx-auto">
                    {[
                        { s: "1. Accept the job", d: "Job → DB, status: PENDING", icon: "📩" },
                        { s: "2. Place in queue", d: "RabbitMQ / SQS / Redis", icon: "📬" },
                        { s: "3. Worker picks it up", d: "Separate process / Lambda", icon: "👷" },
                        { s: "4. Fetch data", d: "Query → pagination / streaming", icon: "🗄️" },
                        { s: "5. Transform", d: "Formatting, aggregations", icon: "🔄" },
                        { s: "6. Render PDF", d: "Template → HTML → PDF", icon: "📄" },
                        { s: "7. Upload", d: "S3 + presigned URL", icon: "☁️" },
                        { s: "8. Status: DONE", d: "downloadUrl ready", icon: "✅" },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="bg-purple-950 border border-purple-900 rounded-lg px-5 py-2.5 flex items-center gap-4">
                                <span className="text-lg">{item.icon}</span>
                                <p className="text-white font-semibold text-sm">{item.s}</p>
                                <p className="text-slate-500 text-xs ml-auto">{item.d}</p>
                            </div>
                            {i < 7 && <div className="flex justify-center"><div className="w-0.5 h-1.5 bg-slate-800" /></div>}
                        </div>
                    ))}
                </div>
                <p className="text-slate-600 text-sm text-center mt-4">8 steps. Each can fail. Each needs error handling.</p>
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
                            { q: "What data range?", d: "One day? One year? 100 rows vs 10M — completely different strategies." },
                            { q: "Read replica or primary?", d: "Heavy report on the production database = degradation for everyone." },
                            { q: "Pagination / cursor / streaming?", d: "SELECT * with 5M rows = OOM. Cursor-based iteration? COPY TO?" },
                            { q: "Denormalization?", d: "Joining 8 tables? Materialized view? Pre-aggregated data?" },
                            { q: "New indexes?", d: "Report filters on unindexed columns. But adding indexes = write performance impact." },
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
    // M2 - Scale
    {
        nav: "layer", layer: 4,
        render: () => (
            <div className="flex flex-col justify-center h-full px-16">
                <p className="text-fuchsia-500 text-sm uppercase tracking-widest mb-2">Layer 5 — Database</p>
                <h2 className="text-3xl font-bold text-white mb-6">Scale changes everything</h2>
                <div className="grid grid-cols-3 gap-5 max-w-4xl">
                    {[
                        { icon: "📊", rows: "100 rows", time: "~50ms", strategy: "SELECT + JOIN", approach: "Frontend-only OK", impact: "No DB changes", c: "bg-green-950 border-green-800", tc: "text-green-400" },
                        { icon: "📈", rows: "100k rows", time: "~2-5s", strategy: "Indexes + pagination", approach: "Backend sync OK", impact: "New indexes, read replica", c: "bg-amber-950 border-amber-800", tc: "text-amber-400" },
                        { icon: "🔥", rows: "5M+ rows", time: "minutes", strategy: "Streaming + mat. views", approach: "Async pipeline required", impact: "New DB infrastructure", c: "bg-red-950 border-red-800", tc: "text-red-400" },
                    ].map((item, i) => (
                        <div key={i} className={`${item.c} border rounded-xl p-5 text-center`}>
                            <p className="text-3xl mb-2">{item.icon}</p>
                            <p className={`${item.tc} font-bold text-lg`}>{item.rows}</p>
                            <p className="text-slate-400 text-sm mt-2">{item.strategy}</p>
                            <p className="text-slate-400 text-sm">{item.time}</p>
                            <p className="text-slate-400 text-sm">{item.approach}</p>
                            <p className="text-slate-600 text-xs mt-3">{item.impact}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-5 max-w-4xl">
                    <p className="text-slate-300 text-sm">
                        <span className="text-white font-semibold">Key insight:</span> Decisions at the DB layer propagate upward. Query takes minutes → <span className="text-purple-400">service must be async</span> → <span className="text-violet-400">BFF returns 202</span> → <span className="text-blue-400">frontend polls</span> → <span className="text-indigo-400">UX must handle the wait</span>.
                    </p>
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
                        { l: "⚛️ Client", a: "Validate → gather filters → POST /api/reports", c: "text-blue-400", down: true },
                        { l: "🔀 BFF", a: "Auth → map params → call service → 202", c: "text-violet-400", down: true },
                        { l: "⚙️ Service", a: "Job → queue → worker → PDF → S3", c: "text-purple-400", down: true },
                        { l: "🗄️ DB", a: "Read replica → cursor query → stream rows", c: "text-fuchsia-400", down: false },
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
                        { l: "⚙️ Service", a: "Job DONE → presigned URL", c: "text-purple-400", up: true },
                        { l: "🔀 BFF", a: "GET /reports/:id → done + url", c: "text-violet-400", up: true },
                        { l: "⚛️ Client", a: "Poll → DONE → trigger download", c: "text-blue-400", up: true },
                        { l: "🎨 UI/UX", a: "Success → file downloaded → toast", c: "text-indigo-400", up: false },
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
                        { layer: "🎨 UI", err: "User closed the tab mid-generation", q: "Does the job cancel? Does the report still generate? How to handle returning?" },
                        { layer: "⚛️ Client", err: "Polling enters infinite loop", q: "Max attempts? Exponential backoff? Timeout → error or 'check back later'?" },
                        { layer: "🔀 BFF", err: "Domain service not responding", q: "Circuit breaker? Fallback? 503 vs 504? Retry-After header?" },
                        { layer: "⚙️ Service", err: "Worker crashes mid-generation", q: "Dead letter queue? Auto-retry? How to mark as failed? Alert on-call?" },
                        { layer: "🗄️ DB", err: "Query runs 5 min, blocks others", q: "Statement timeout? Query killer? Signal that we need a materialized view?" },
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
                            <p className="text-slate-400 text-sm">Focus management, a11y, layout shift, race conditions, semantics, event propagation — pure frontend problems that can surprise you.</p>
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
