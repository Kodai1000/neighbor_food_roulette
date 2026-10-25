import Roulette from "@/components/roulette";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
    params: Promise<{ range: string }>;
};

export default function RoulettePage({ params }: Props) {
    return (
        <Suspense fallback={<div className="p-2 flex flex-col items-center text-center"><p>読み込み中...</p></div>}>
            <RouletteContent params={params} />
        </Suspense>
    );
}

async function RouletteContent({ params }: Props) {
    const { range } = await params;

    if (!["1", "2", "3", "4", "5"].includes(range)) {
        notFound();
    }

    return <Roulette range={range} />;
}

export function generateStaticParams() {
    return ["1", "2", "3", "4", "5"].map(range => ({ range }));
}