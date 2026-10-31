
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

export async function POST(req: NextRequest) {
    const {
        location,
        search_range,
        minBudget = "",
        maxBudget = ""
    }: reqType = await req.json();

    try {
        const budgetLimits = await fetchBudgetLimits();

        const min = minBudget === "" ? 0 : Number(minBudget);
        const max = maxBudget === "" ? Infinity : Number(maxBudget);

        // 予算指定のバリデーション
        if (
            (minBudget !== "" && !budgetLimits.some((item) => item.min === min)) ||
            (maxBudget !== "" && !budgetLimits.some((item) => Number.isFinite(item.max) && item.max === max)) ||
            min > max
        ) {
            return NextResponse.json(
                { error: "予算の指定が不正です。" },
                { status: 400 }
            );
        }

        // 予算指定なしで100件取得
        const params = new URLSearchParams({
            key: process.env.HOTPEPPER_API_KEY ?? "",
            lat: String(location[0]),
            lng: String(location[1]),
            range: search_range,
            order: "4",
            count: "100",
        });

        const response = await fetch(
            `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${params}`
        );

        if (!response.ok) {
            throw new Error("HotPepper API request failed");
        }

        const parser = new XMLParser({
            isArray: (_name, path) => path === "results.shop",
        });

        const data = parser.parse(
            await response.text()
        ) as HotPepperResponse & {
            results: { error?: unknown }
        };

        if (data.results.error) {
            throw new Error("HotPepper API returned an error");
        }

        // 予算指定がない場合はそのまま返す
        let shops = data.results.shop ?? [];

        if (minBudget !== "" || maxBudget !== "") {
            // 指定された予算範囲に該当する予算コードを取得
            const codes = budgetLimits
                .filter((item) =>
                    item.min >= min &&
                    (item.max ?? Infinity) <= max
                )
                .map((item) => item.code);

            // 予算コードに合致する店舗だけを抽出
            shops = shops.filter((shop) =>
                codes.includes(shop.budget?.code ?? "")
            );
        }

        return NextResponse.json({
            res: {
                results: {
                    ...data.results,
                    results_returned: shops.length,
                    shop: shops,
                },
            },
        });

    } catch {
        return NextResponse.json(
            { error: "お店の検索に失敗しました。" },
            { status: 502 }
        );
    }
}
