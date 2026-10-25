export type BudgetLimit = { code: string; name: string; min: number; max: number | null };

export function parseBudgetLimits(value: unknown): BudgetLimit[] {
    if (!Array.isArray(value) || value.length === 0) throw new Error("予算区分がありません。");
    return value.map((item): BudgetLimit => {
        if (typeof item?.code !== "string" || typeof item?.name !== "string") throw new Error("予算区分の形式が不正です。");
        const normalized = item.name.normalize("NFKC").replace(/[,円\s]/g, "");
        const match = normalized.match(/^(\d*)[～~〜](\d*)$/);
        if (!match || (!match[1] && !match[2])) throw new Error("予算金額を読み取れません。");
        const min = match[1] ? Number(match[1]) : 0;
        const max = match[2] ? Number(match[2]) : null;
        if (max !== null && min > max) throw new Error("予算の範囲が不正です。");
        return { code: item.code, name: item.name, min, max };
    }).sort((a, b) => a.min - b.min);
}
