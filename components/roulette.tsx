"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HotPepperResponse, Shop } from "@/types/hotpepper";
import {ShopCardMemo} from "@/components/shop_card";
import { buttonStyle, redButtonStyle } from "@/data/button_style";
import React from "react";

export default function Roulette({ range }: { range: string }) {

    const search_range = range;
    const searchParams = useSearchParams();
    const minBudget = searchParams.get("minBudget") ?? "";
    const maxBudget = searchParams.get("maxBudget") ?? "";

    const [location, setLocation] = useState<[number, number] | null>(null);
    const [hotPepperData, setHotPepperData] = useState<HotPepperResponse | null>(null);
    const [phase, setPhase] = useState<
        "loading" | "roulette" | "slowRoulette" | "stop" | "result" | "error" | "noResult"
    >("loading");
    const [displayedShopIndex, setDisplayedShopIndex] = useState<number>(0);

    useEffect(() => {
        const geolocation = () => {
            if (!navigator.geolocation) {
                setPhase("error");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("位置情報の取得に失敗しました:", error);
                    setPhase("error");
                }
            );
        };

        geolocation();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                if (location === null) return;

                setPhase("loading");

                const hotpepper_res = await fetch("/api/hotpepper_gourmet", {
                    signal: controller.signal,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ location, search_range, minBudget, maxBudget }),
                });

                if (!hotpepper_res.ok) {
                    throw new Error("API取得失敗");
                }

                const hotpepper_data: { res: HotPepperResponse } =
                    await hotpepper_res.json();

                if (controller.signal.aborted) return;

                const shops = hotpepper_data.res.results.shop;

                if (!shops || shops.length === 0) {
                    setPhase("noResult");
                    return;
                }

                // 10件を超える場合はランダムに10件抽出
                const selectedShops = [...shops];

                if (selectedShops.length > 10) {
                    for (let i = selectedShops.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));

                        [selectedShops[i], selectedShops[j]] =
                            [selectedShops[j], selectedShops[i]];
                    }
                }

                const limitedShops = selectedShops.slice(0, 10);

                setHotPepperData({
                    ...hotpepper_data.res,
                    results: {
                        ...hotpepper_data.res.results,
                        shop: limitedShops,
                    },
                });

                setDisplayedShopIndex(0);
                setPhase("roulette");

            } catch (error) {
                if (controller.signal.aborted) return;

                setPhase("error");
                console.error("API取得中にエラーが発生しました:", error);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [location, search_range, minBudget, maxBudget]);

    useEffect(() => {
        if (phase === "roulette") {
            const intervalId = setInterval(() => {
                setDisplayedShopIndex(prev => prev + 1);
            }, 250);

            return () => clearInterval(intervalId);
        }

        if (phase === "slowRoulette") {
            let count = 0;

            const intervalId = setInterval(() => {
                count++;

                setDisplayedShopIndex(prev => prev + 1);

                if (count >= 5) {
                    clearInterval(intervalId);
                    setPhase("stop");
                }
            }, 500);

            return () => clearInterval(intervalId);
        }

        if (phase === "stop") {
            const timeoutId = setTimeout(() => {
                setPhase("result");
            }, 1250);

            return () => clearTimeout(timeoutId);
        }
    }, [phase]);

    const shops = hotPepperData?.results.shop ?? [];

    const showRoulette =
        phase === "roulette" ||
        phase === "slowRoulette" ||
        phase === "stop" ||
        phase === "result";

    return (
        <div className="p-2 flex flex-col items-center text-center">
            {phase === "loading" && (
                <div>読み込み中...</div>
            )}

            {phase === "error" && (
                <div>
                    エラーが発生しました。
                    <br />
                    しばらくしてからもう一度お試しください。
                </div>
            )}

            {phase === "noResult" && (
                <div>
                    お店が見つかりませんでした。
                    <br />
                    ルーレットを回す範囲や予算を変えてもう一度お試しください。
                </div>
            )}

            {showRoulette && (
                <button
                    onPointerDown={() => {
                        if (phase === "roulette") {
                            setPhase("slowRoulette");
                        } else if (phase === "result") {
                            setPhase("roulette");
                        }
                    }}
                    disabled={phase === "slowRoulette" || phase === "stop"}
                    className={phase === "result" ? buttonStyle : redButtonStyle}
                >
                    {phase === "result" ? "やりなおす" : "止める"}
                </button>
            )}

            {phase === "result" && (
                <h1 className="text-xl m-2">ここ！</h1>
            )}

            <div className="m-2">
                {showRoulette && shops.length > 0 && (
                    <div>
                        {shops.map((shop, index) => (
                            <div
                                key={shop.id}
                                className={
                                    index === displayedShopIndex % shops.length
                                        ? "block"
                                        : "hidden"
                                }
                            >
                                <ShopCardMemo
                                    shop={shop}
                                    isDetail={true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
