import { NextResponse } from "next/server";
import { fetchBudgetLimits } from "@/lib/hotpepper-budget";

export async function GET() {
    try {
        return NextResponse.json({ budgets: await fetchBudgetLimits() }, { headers: { "Cache-Control": "no-store" } });
    } catch {
        return NextResponse.json({ error: "予算区分の取得に失敗しました。" }, { status: 502 });
    }
}
