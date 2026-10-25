"use client"
import { useRouter } from "next/navigation";
import { buttonStyle } from "@/data/button_style";
import { useEffect, useState } from "react";
import type { BudgetLimit } from "@/data/budget";

export default function Home() {
    const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([]);
    const [budgetStatus, setBudgetStatus] = useState<"loading" | "ready" | "error">("loading");
    const [budgetRetry, setBudgetRetry] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        async function loadBudgets() {
            try {
                const response = await fetch("/api/hotpepper_budget", { cache: "no-store", signal: controller.signal });
                if (!response.ok) throw new Error("Budget request failed");
                const data: { budgets: BudgetLimit[] } = await response.json();
                if (controller.signal.aborted) return;
                setBudgetLimits(data.budgets);
                setBudgetStatus("ready");
            } catch {
                if (!controller.signal.aborted) setBudgetStatus("error");
            }
        }
        loadBudgets();
        return () => controller.abort();
    }, [budgetRetry]);
    const [selectedDistance, setSelectedDistance] = useState<number>(1);
    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");
    const invalidBudget = minBudget !== "" && maxBudget !== "" && Number(minBudget) > Number(maxBudget);

    const router = useRouter();

    const handleClick = () => {
        if (invalidBudget || budgetStatus !== "ready") return;
        const params = new URLSearchParams();
        if (minBudget) params.set("minBudget", minBudget);
        if (maxBudget) params.set("maxBudget", maxBudget);
        const query = params.size ? `?${params}` : "";
        router.push(`/roulette/${selectedDistance}${query}`);
    };

    return (
        <div className="border rounded-xl flex flex-col items-center lg:mx-40 lg:my-10 bg-white p-24">
            <h1 className="text-[clamp(2rem,4vw,8rem)] whitespace-nowrap font-bold">
                今日のご飯を決めよう
            </h1>
            <p>現在地付近の飲食店から、あなたの今日のご飯を決めます。</p>
            <div className="lg:flex">
                <label className="flex flex-col mt-8 m-4">
                    距離
                    <select className="border rounded-lg p-2 text-lg" value={selectedDistance} onChange={(e) => setSelectedDistance(parseInt(e.target.value))}>
                        {["300m", "500m", "1km", "2km", "3km"].map((distance, index) => (
                            <option key={distance} value={index + 1}>
                                ここから{distance}以内のお店で探す
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col mt-8 m-4">
                    最低金額
                    <select
                        className="border rounded-lg p-2 text-lg"
                        value={minBudget}
                        disabled={budgetStatus !== "ready"}
                        onChange={(e) => setMinBudget(e.target.value)}
                    >
                        {budgetLimits.map((budget) => (
                            <option key={budget.code} value={budget.min}>{budget.min}円</option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col mt-8 m-4">
                    最大金額
                    <select
                    className="border rounded-lg p-2 text-lg"
                    value={maxBudget}
                    disabled={budgetStatus !== "ready"}
                    onChange={(e) => setMaxBudget(e.target.value)}
                >
                    <option value="">上限なし</option>
                    {budgetLimits.filter((budget) => budget.max !== null).map((budget) => (
                        <option key={budget.code} value={budget.max!}>
                            {budget.max}円
                        </option>
                    ))}
                </select>
                </label>
                <button
                    disabled={invalidBudget || budgetStatus !== "ready"}
                    onClick={handleClick}
                    className={buttonStyle}>
                    ルーレットを回す
                </button>
            </div>
            {invalidBudget && <p role="alert" className="text-red-600">最低金額は最大金額以下にしてください。</p>}
            {budgetStatus === "loading" && <p role="status">予算区分を読み込み中...</p>}
            {budgetStatus === "error" && <div role="alert">
                <p>予算区分を取得できませんでした。</p>
                <button className={buttonStyle} onClick={() => {
                    setBudgetStatus("loading");
                    setBudgetRetry((value) => value + 1);
                }}>再試行</button>
            </div>}
        </div>
    );
}
