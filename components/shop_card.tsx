import { Shop } from "@/types/hotpepper";
import Image from "next/image";
import { shopImageProps } from "@/data/shop_image";
import React from "react";

type Props = {
    shop: Shop;
    isDetail: boolean;
}

export const ShopCardMemo = React.memo(function CreateShopCardMemo({ shop, isDetail }: Props) {
    return <ShopCard shop={shop} isDetail={isDetail} />;
});

export function ShopCard({ shop, isDetail }: { shop: Shop; isDetail: boolean }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md flex flex-col items-center text-center p-6 h-[700px] object-cover max-w-full gap-3">
            <p>【画像・情報提供：ホットペッパー グルメ】</p>
            <h1 className="text-2xl font-bold text-gray-800">{shop.name}</h1>
            <h2 className="text-lg text-gray-500">{shop.genre.name}</h2>

            <Image
                {...shopImageProps(shop)}
                className="w-[300px] h-[300px] object-cover rounded-lg"
                alt={shop.name}
                unoptimized
            />
            {isDetail && (
                <table className="w-full border-collapse text-sm text-gray-700 mt-3">
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <th className="bg-gray-100 p-3 text-left font-semibold w-20">
                                住所
                            </th>
                        <td className="p-3 text-left break-words">
                            {shop.address}
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 p-3 text-left font-semibold">
                            予算(ディナー)
                        </th>
                        <td className="p-3 text-left">
                            {shop.budget?.name}
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-gray-100 p-3 text-left font-semibold">
                            URL
                        </th>
                        <td className="p-3 text-left">
                            <a
                                href={shop.urls.pc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#006D5B] hover:text-[#004D40] hover:underline font-medium"
                            >
                                店舗詳細を見る ↗
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            )}
        </div>
    );
}
