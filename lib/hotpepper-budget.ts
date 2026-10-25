import { XMLParser } from "fast-xml-parser";
import { parseBudgetLimits } from "@/data/budget";

export async function fetchBudgetLimits() {
    const key = process.env.HOTPEPPER_API_KEY;
    if (!key) throw new Error("HotPepper API key is missing");
    const params = new URLSearchParams({ key });
    const response = await fetch(`https://webservice.recruit.co.jp/hotpepper/budget/v1/?${params}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Budget API request failed");
    const parser = new XMLParser({ isArray: (_name, path) => path === "results.budget" });
    const data = parser.parse(await response.text());
    if (!data.results || data.results.error) throw new Error("Budget API returned an error");
    return parseBudgetLimits(data.results.budget);
}
