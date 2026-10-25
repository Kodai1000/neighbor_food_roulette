import { NextRequest, NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { fetchBudgetLimits } from "@/lib/hotpepper-budget";
import type { HotPepperResponse } from "@/types/hotpepper";

type reqType = {
    location: [number, number],
    search_range: string,
    minBudget?: string,
    maxBudget?: string
}

export async function POST(req: NextRequest){
    const {location, search_range, minBudget = "", maxBudget = ""}: reqType = await req.json();
    try {
    const budgetLimits = await fetchBudgetLimits();
    const min = minBudget === "" ? 0 : Number(minBudget);
    const max = maxBudget === "" ? Infinity : Number(maxBudget);
    if ((minBudget !== "" && !budgetLimits.some((item) => item.min === min)) ||
        (maxBudget !== "" && !budgetLimits.some((item) => Number.isFinite(item.max) && item.max === max)) || min > max) {
        return NextResponse.json({ error: "予算の指定が不正です。" }, { status: 400 });
    }
    const params = new URLSearchParams({
        key: process.env.HOTPEPPER_API_KEY ?? "",
        lat: String(location[0]),
        lng: String(location[1]),
        range: search_range,
        order: "4",
        count: "100",
    });
    const parser = new XMLParser({
        isArray: (_name, path) => path === "results.shop",
    });
    const codes = budgetLimits.filter((item) => item.min >= min && (item.max ?? Infinity) <= max).map((item) => item.code);
    // HotPepper accepts at most two budget codes per request.
    const groups: string[][] = [];
    if (minBudget === "" && maxBudget === "") {
        groups.push([]);
    } else {
        for (let i = 0; i < codes.length; i += 2) groups.push(codes.slice(i, i + 2));
    }
    if (groups.length === 0) {
        return NextResponse.json({ error: "指定された範囲の予算区分がありません。" }, { status: 400 });
    }
    const responses = await Promise.all(groups.map(async (group) => {
        const query = new URLSearchParams(params);
        if (group.length) query.set("budget", group.join(","));
        const response = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query}`);
        if (!response.ok) throw new Error("HotPepper API request failed");
        const data = parser.parse(await response.text()) as HotPepperResponse & { results: { error?: unknown } };
        if (data.results.error) throw new Error("HotPepper API returned an error");
        return data;
    }));
    const shops = [...new Map(responses.flatMap((data) => data.results.shop ?? []).map((shop) => [shop.id, shop])).values()];
    const apiRes = {
        results: {
            ...responses[0].results,
            results_available: responses.reduce((total, data) => total + Number(data.results.results_available), 0),
            results_returned: shops.length,
            shop: shops,
        },
    };
    return NextResponse.json({
        res: apiRes
    })
    } catch {
        return NextResponse.json({ error: "お店の検索に失敗しました。" }, { status: 502 });
    }
}
