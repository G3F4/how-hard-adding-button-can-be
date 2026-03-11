import { useState, useEffect, useRef, useCallback } from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────

const DemoFrame = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="border border-[#e1e1e1] rounded-xl bg-[#fefefe] overflow-hidden flex flex-col h-full shadow-sm">
        <div className="px-3 py-1.5 border-b border-[#e1e1e1] flex items-center gap-2 bg-[#f4f4f4]">
            <div className="w-2 h-2 rounded-full bg-[#fd5f2e]" />
            <span className="text-[#8e8e8e] text-sm font-mono">{label}</span>
        </div>
        <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
);

const Toggle = ({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) => (
    <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-[#fd5f2e]" : "bg-[#e1e1e1]"}`}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0"}`}
            />
        </div>
        <span className="text-[#707070] text-sm">{label}</span>
    </label>
);

// ─── Demo 1: <button> vs <div> ─────────────────────────────────────────────

export function ButtonVsDivDemo() {
    const [log, setLog] = useState<string[]>([]);
    const logRef = useRef<HTMLDivElement>(null);

    const addLog = useCallback((msg: string) => {
        setLog((prev) => [...prev.slice(-7), msg]);
    }, []);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [log]);

    const btnStyle =
        "px-4 py-2 rounded-lg text-base font-semibold bg-[#fd5f2e] text-white cursor-pointer outline-none focus:ring-2 focus:ring-[#fd5f2e] focus:ring-offset-2 focus:ring-offset-[#fefefe]";
    const divStyle =
        "px-4 py-2 rounded-lg text-base font-semibold bg-[#fd5f2e] text-white inline-block";

    return (
        <DemoFrame label="button-vs-div.html">
            <div className="space-y-4">
                <p className="text-[#8e8e8e] text-sm">Tab into each, then press Enter or Space. Watch the log.</p>

                <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-[#06753f] text-sm font-mono mb-1">{"<button>"}</p>
                        <button
                            className={btnStyle}
                            onClick={() => addLog("✅ [button] click fired")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    addLog(`✅ [button] keydown: ${e.key === " " ? "Space" : e.key} → triggers click`);
                                }
                            }}
                            onFocus={() => addLog("✅ [button] focus (Tab works)")}
                        >
                            Click me
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-[#bb0020] text-sm font-mono mb-1">{"<div onclick>"}</p>
                        <div
                            className={divStyle}
                            onClick={() => addLog("⚠️  [div] click fired (mouse only)")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    addLog(`❌ [div] keydown: ${e.key === " " ? "Space" : e.key} → nothing happens`);
                                }
                            }}
                        >
                            Click me
                        </div>
                        <p className="text-[#cecece] text-xs mt-0.5">not focusable</p>
                    </div>
                </div>

                <div
                    ref={logRef}
                    className="bg-[#f4f4f4] rounded-lg p-3 h-28 overflow-y-auto font-mono text-sm space-y-0.5"
                >
                    {log.length === 0 ? (
                        <p className="text-[#cecece]">{"// events will appear here"}</p>
                    ) : (
                        log.map((entry, i) => (
                            <p key={i} className="text-[#1d1d1d]">{entry}</p>
                        ))
                    )}
                </div>

                <button
                    onClick={() => setLog([])}
                    className="text-[#cecece] hover:text-[#8e8e8e] text-sm transition-colors"
                >
                    Clear log
                </button>
            </div>
        </DemoFrame>
    );
}

// ─── Demo 2: Stacking context ──────────────────────────────────────────────

export function StackingContextDemo() {
    const [fixTransform, setFixTransform] = useState(false);

    return (
        <DemoFrame label="stacking-context.html">
            <div className="space-y-3">
                <Toggle
                    checked={fixTransform}
                    onChange={setFixTransform}
                    label={fixTransform ? "transform removed — fixed" : "transform: translateY(0) — broken"}
                />

                {/* Mini page scene */}
                <div className="relative rounded-lg border border-[#e1e1e1] bg-[#f4f4f4]" style={{ height: 200 }}>

                    {/* Header — position:relative only (no z-index!).
                         transform: translateY(0) creates stacking context → traps dropdown.
                         Without transform → no stacking context → dropdown z:1000 joins root. */}
                    <div
                        className="relative"
                        style={{ transform: fixTransform ? "none" : "translateY(0)" }}
                    >
                        <div className="bg-[#e1e1e1] px-3 py-2 flex items-center justify-between border-b border-[#cecece]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#707070] text-sm font-semibold">Header</span>
                            </div>
                            <div className="relative">
                                <div className="bg-[#fd5f2e] text-white text-sm px-2 py-1 rounded">
                                    Menu
                                </div>
                                {/* Dropdown — always visible */}
                                <div
                                    className="absolute right-0 top-full mt-1 bg-[#fefefe] border border-[#fd5f2e] rounded-lg shadow-lg w-32 py-1"
                                    style={{ zIndex: 1000 }}
                                >
                                    <div className="absolute -top-3.5 right-1 text-xs font-mono text-[#fd5f2e] bg-[#fefefe] px-1 rounded border border-[#e1e1e1]">
                                        z: 1000
                                    </div>
                                    {["Profile", "Settings", "Logout"].map((item) => (
                                        <div key={item} className="px-3 py-1.5 text-sm text-[#707070]">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Stacking context indicator */}
                        <div className={`absolute bottom-0 left-2 text-xs font-mono px-1 rounded translate-y-full ${fixTransform ? "text-[#06753f]" : "text-[#bb0020]"}`}>
                            {fixTransform ? "no stacking ctx" : "new stacking ctx!"}
                        </div>
                    </div>

                    {/* Page content area */}
                    <div className="flex items-center justify-center" style={{ height: 160 }}>
                        <span className="text-[#cecece] text-sm">Page content</span>
                    </div>

                    {/* Overlay — z-index 500, ALWAYS the same */}
                    <div
                        className="absolute inset-0 rounded-lg flex items-end justify-center pb-3"
                        style={{ zIndex: 500, pointerEvents: "none", backgroundColor: "rgba(187, 0, 32, 0.15)" }}
                    >
                        <div className="border border-[#bb0020] text-[#bb0020] rounded px-2 py-1 text-xs font-mono bg-[#fefefe]">
                            overlay z: 500
                        </div>
                    </div>
                </div>

                <p className="text-[#8e8e8e] text-sm leading-relaxed">
                    {fixTransform
                        ? "Without transform, dropdown (z:1000) competes in the root context. 1000 > 500 — dropdown wins."
                        : "transform creates a new stacking context on the header. Dropdown z:1000 is trapped inside it. Overlay z:500 wins."}
                </p>

                <p className="text-[#cecece] text-xs">
                    Same z-index values in both states. Only the transform changes.
                </p>
            </div>
        </DemoFrame>
    );
}

// ─── Demo 3: Event propagation ─────────────────────────────────────────────

interface Row {
    id: number;
    label: string;
}

export function EventPropagationDemo() {
    const [rows, setRows] = useState<Row[]>([
        { id: 1, label: "Order #1024" },
        { id: 2, label: "Order #1025" },
        { id: 3, label: "Order #1026" },
    ]);
    const [log, setLog] = useState<string[]>([]);
    const [stopProp, setStopProp] = useState(false);
    const [flash, setFlash] = useState<number | null>(null);
    const logRef = useRef<HTMLDivElement>(null);

    const addLog = useCallback((msg: string) => {
        setLog((prev) => [...prev.slice(-9), msg]);
    }, []);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [log]);

    const handleRowClick = (id: number, label: string) => {
        setFlash(id);
        setTimeout(() => setFlash(null), 300);
        addLog(`📂 Row click → opened "${label}"`);
    };

    const handleDelete = (e: React.MouseEvent, id: number) => {
        if (stopProp) {
            e.stopPropagation();
            addLog(`🗑️  Delete clicked → item ${id} removed`);
        } else {
            addLog(`🗑️  Delete clicked → event bubbles up ↑`);
        }
        setRows((prev) => prev.filter((r) => r.id !== id));
    };

    const reset = () => {
        setRows([
            { id: 1, label: "Order #1024" },
            { id: 2, label: "Order #1025" },
            { id: 3, label: "Order #1026" },
        ]);
        setLog([]);
    };

    return (
        <DemoFrame label="event-propagation.html">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Toggle
                        checked={stopProp}
                        onChange={setStopProp}
                        label={stopProp ? "stopPropagation() ON ✅" : "stopPropagation() OFF ❌"}
                    />
                    <button
                        onClick={reset}
                        className="text-[#cecece] hover:text-[#8e8e8e] text-sm transition-colors"
                    >
                        Reset
                    </button>
                </div>

                <div className="space-y-1">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            onClick={() => handleRowClick(row.id, row.label)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-colors ${flash === row.id ? "bg-[#dff0ff] border-[#1767e8]" : "bg-[#f4f4f4] border-[#e1e1e1] hover:border-[#8e8e8e]"}`}
                        >
                            <span className="text-[#1d1d1d] text-sm">{row.label}</span>
                            <button
                                onClick={(e) => handleDelete(e, row.id)}
                                className="text-[#bb0020] hover:text-white text-sm px-2 py-0.5 rounded border border-[#bb0020] hover:bg-[#bb0020] transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {rows.length === 0 && (
                        <p className="text-[#cecece] text-sm text-center py-2">All rows deleted — Reset to restore</p>
                    )}
                </div>

                <div
                    ref={logRef}
                    className="bg-[#f4f4f4] rounded-lg p-2 h-20 overflow-y-auto font-mono text-sm space-y-0.5"
                >
                    {log.length === 0 ? (
                        <p className="text-[#cecece]">{"// click Delete — watch what happens"}</p>
                    ) : (
                        log.map((entry, i) => (
                            <p key={i} className="text-[#1d1d1d]">{entry}</p>
                        ))
                    )}
                </div>
            </div>
        </DemoFrame>
    );
}

// ─── Demo 4: Focus trap ────────────────────────────────────────────────────

function BrokenModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded-lg">
            <div className="bg-[#fefefe] border border-[#bb0020] rounded-xl p-4 w-48 shadow-xl">
                <p className="text-[#bb0020] text-sm font-bold mb-3">Modal (broken)</p>
                <input
                    placeholder="Your name"
                    className="w-full bg-[#f4f4f4] text-[#1d1d1d] text-sm rounded px-2 py-1.5 mb-2 outline-none border border-[#e1e1e1] focus:ring-1 focus:ring-[#8e8e8e]"
                />
                <div className="flex gap-2">
                    <button className="flex-1 bg-[#fd5f2e] text-white text-sm py-1 rounded hover:bg-[#e04a1e]">
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#f4f4f4] text-[#707070] text-sm py-1 rounded border border-[#e1e1e1] hover:bg-[#e1e1e1]"
                    >
                        Close
                    </button>
                </div>
                <p className="text-[#cecece] text-xs mt-2">Tab escapes this modal. No Escape key. Focus won't return.</p>
            </div>
        </div>
    );
}

function FixedModal({ onClose, triggerRef }: { onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null> }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstFocusRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "Tab" && modalRef.current) {
                const focusable = Array.from(
                    modalRef.current.querySelectorAll<HTMLElement>(
                        "input, button, [href], select, textarea, [tabindex]:not([tabindex='-1'])"
                    )
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            triggerRef.current?.focus();
        };
    }, [onClose, triggerRef]);

    return (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded-lg">
            <div
                ref={modalRef}
                className="bg-[#fefefe] border border-[#06753f] rounded-xl p-4 w-48 shadow-xl"
            >
                <p className="text-[#06753f] text-sm font-bold mb-3">Modal (fixed)</p>
                <input
                    ref={firstFocusRef}
                    placeholder="Your name"
                    className="w-full bg-[#f4f4f4] text-[#1d1d1d] text-sm rounded px-2 py-1.5 mb-2 outline-none border border-[#e1e1e1] focus:ring-1 focus:ring-[#06753f]"
                />
                <div className="flex gap-2">
                    <button className="flex-1 bg-[#fd5f2e] text-white text-sm py-1 rounded hover:bg-[#e04a1e] focus:outline focus:outline-2 focus:outline-[#06753f]">
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#f4f4f4] text-[#707070] text-sm py-1 rounded border border-[#e1e1e1] hover:bg-[#e1e1e1] focus:outline focus:outline-2 focus:outline-[#06753f]"
                    >
                        Close
                    </button>
                </div>
                <p className="text-[#06753f] text-xs mt-2">Tab cycles inside. Escape closes. Focus returns to button.</p>
            </div>
        </div>
    );
}

export function FocusTrapDemo() {
    const [brokenOpen, setBrokenOpen] = useState(false);
    const [fixedOpen, setFixedOpen] = useState(false);
    const brokenTriggerRef = useRef<HTMLButtonElement>(null);
    const fixedTriggerRef = useRef<HTMLButtonElement>(null);

    return (
        <DemoFrame label="focus-trap.html">
            <div className="grid grid-cols-2 gap-3 h-full">
                {/* Broken */}
                <div className="flex flex-col gap-2">
                    <p className="text-[#bb0020] text-sm font-bold">❌ Broken</p>
                    <div className="relative bg-[#fefefe] rounded-lg border border-[#e1e1e1] flex-1 flex flex-col items-center justify-center gap-2 p-3" style={{ minHeight: 120 }}>
                        <p className="text-[#8e8e8e] text-xs text-center">Background content (Tab can reach this)</p>
                        <input
                            placeholder="bg input"
                            className="w-full bg-[#f4f4f4] text-[#1d1d1d] text-sm rounded px-2 py-1 outline-none border border-[#e1e1e1] focus:ring-1 focus:ring-[#bb0020]"
                        />
                        <button
                            ref={brokenTriggerRef}
                            onClick={() => setBrokenOpen(true)}
                            className="bg-[#fd5f2e] text-white text-sm px-3 py-1.5 rounded hover:bg-[#e04a1e] transition-colors focus:outline focus:outline-2 focus:outline-[#fd5f2e]"
                        >
                            Open Modal
                        </button>
                        {brokenOpen && <BrokenModal onClose={() => setBrokenOpen(false)} />}
                    </div>
                </div>

                {/* Fixed */}
                <div className="flex flex-col gap-2">
                    <p className="text-[#06753f] text-sm font-bold">✅ Fixed</p>
                    <div className="relative bg-[#fefefe] rounded-lg border border-[#e1e1e1] flex-1 flex flex-col items-center justify-center gap-2 p-3" style={{ minHeight: 120 }}>
                        <p className="text-[#8e8e8e] text-xs text-center">Background content (Tab stays in modal)</p>
                        <input
                            placeholder="bg input"
                            className="w-full bg-[#f4f4f4] text-[#1d1d1d] text-sm rounded px-2 py-1 outline-none border border-[#e1e1e1] focus:ring-1 focus:ring-[#06753f]"
                            tabIndex={fixedOpen ? -1 : 0}
                        />
                        <button
                            ref={fixedTriggerRef}
                            onClick={() => setFixedOpen(true)}
                            className="bg-[#fd5f2e] text-white text-sm px-3 py-1.5 rounded hover:bg-[#e04a1e] transition-colors focus:outline focus:outline-2 focus:outline-[#fd5f2e]"
                            aria-expanded={fixedOpen}
                        >
                            Open Modal
                        </button>
                        {fixedOpen && <FixedModal onClose={() => setFixedOpen(false)} triggerRef={fixedTriggerRef} />}
                    </div>
                </div>
            </div>
        </DemoFrame>
    );
}

// ─── Demo 5: Layout shift ──────────────────────────────────────────────────

export function LayoutShiftDemo() {
    const [phase, setPhase] = useState<"waiting" | "shifted">("waiting");
    const [fixedPhase, setFixedPhase] = useState<"waiting" | "appeared">("waiting");
    const [highlight, setHighlight] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fixedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startBroken = useCallback(() => {
        setPhase("waiting");
        setHighlight(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setPhase("shifted");
            setHighlight(true);
            setTimeout(() => setHighlight(false), 700);
        }, 1500);
    }, []);

    const startFixed = useCallback(() => {
        setFixedPhase("waiting");
        if (fixedTimerRef.current) clearTimeout(fixedTimerRef.current);
        fixedTimerRef.current = setTimeout(() => {
            setFixedPhase("appeared");
        }, 1500);
    }, []);

    useEffect(() => {
        // Auto-start animation on mount
        timerRef.current = setTimeout(() => {
            setPhase("shifted");
            setHighlight(true);
            setTimeout(() => setHighlight(false), 700);
        }, 1500);
        fixedTimerRef.current = setTimeout(() => {
            setFixedPhase("appeared");
        }, 1500);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (fixedTimerRef.current) clearTimeout(fixedTimerRef.current);
        };
    }, []);

    const replay = () => {
        startBroken();
        startFixed();
    };

    const ContentLines = () => (
        <div className="space-y-1.5 mb-2">
            {["Dashboard overview", "Total shipments: 142", "Pending: 23"].map((t) => (
                <div key={t} className="bg-[#e1e1e1] rounded px-2 py-1 text-xs text-[#8e8e8e]">{t}</div>
            ))}
        </div>
    );

    return (
        <DemoFrame label="layout-shift.html">
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    {/* Broken */}
                    <div className="flex flex-col gap-1">
                        <p className="text-[#bb0020] text-xs font-bold">No placeholder</p>
                        <div className="bg-[#f4f4f4] rounded-lg p-2 border border-[#e1e1e1]" style={{ minHeight: 110 }}>
                            <ContentLines />
                            {phase === "shifted" && (
                                <div className={`transition-all duration-150 ${highlight ? "outline outline-2 outline-[#bb0020] rounded" : ""}`}>
                                    <button className="w-full bg-[#fd5f2e] text-white text-xs py-1.5 rounded font-semibold">
                                        Download Report
                                    </button>
                                </div>
                            )}
                            {phase === "waiting" && (
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#fd5f2e] animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#fd5f2e] animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#fd5f2e] animate-bounce" style={{ animationDelay: "300ms" }} />
                                    <span className="text-[#cecece] text-xs ml-1">loading...</span>
                                </div>
                            )}
                        </div>
                        {phase === "shifted" && (
                            <p className="text-[#bb0020] text-xs font-mono">↑ content jumped! CLS +0.15</p>
                        )}
                    </div>

                    {/* Fixed */}
                    <div className="flex flex-col gap-1">
                        <p className="text-[#06753f] text-xs font-bold">With placeholder</p>
                        <div className="bg-[#f4f4f4] rounded-lg p-2 border border-[#e1e1e1]" style={{ minHeight: 110 }}>
                            <ContentLines />
                            <div className="relative">
                                {/* Placeholder always reserves space */}
                                <div className="w-full py-1.5 rounded" style={{ visibility: "hidden" }}>
                                    <span className="text-xs">Download Report</span>
                                </div>
                                {fixedPhase === "appeared" && (
                                    <button className="absolute inset-0 w-full bg-[#fd5f2e] text-white text-xs py-1.5 rounded font-semibold">
                                        Download Report
                                    </button>
                                )}
                                {fixedPhase === "waiting" && (
                                    <div className="absolute inset-0 bg-[#e1e1e1] rounded animate-pulse" />
                                )}
                            </div>
                        </div>
                        {fixedPhase === "appeared" && (
                            <p className="text-[#06753f] text-xs font-mono">no shift — CLS: 0</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={replay}
                    className="text-[#cecece] hover:text-[#8e8e8e] text-sm transition-colors border border-[#e1e1e1] px-3 py-1 rounded"
                >
                    Replay animation
                </button>
            </div>
        </DemoFrame>
    );
}
