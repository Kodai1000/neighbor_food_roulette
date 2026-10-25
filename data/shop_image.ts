import { getImageProps } from "next/image";
import type { Shop } from "@/types/hotpepper";

// Keep the preload and ShopCard image URLs (including srcSet) identical.
export function shopImageProps(shop: Shop) {
    return {
        src: shop.photo.pc.l,
        alt: shop.name,
        width: 300,
        height: 300,
        loading: "eager" as const,
    };
}

export async function preloadShopImages(shops: Shop[], signal: AbortSignal) {
    const uniqueShops = [...new Map(shops.map(shop => [shop.photo.pc.l, shop])).values()];

    await Promise.all(uniqueShops.map(shop => new Promise<void>(resolve => {
        if (signal.aborted) {
            resolve();
            return;
        }

        const image = new window.Image();
        const { props } = getImageProps(shopImageProps(shop));
        const finish = () => {
            window.clearTimeout(timeout);
            signal.removeEventListener("abort", finish);
            image.onload = null;
            image.onerror = null;
            resolve();
        };
        // A failed or stalled image must not prevent the roulette from starting.
        const timeout = window.setTimeout(finish, 15_000);
        signal.addEventListener("abort", finish, { once: true });
        image.onload = () => { void image.decode().catch(() => {}).then(finish); };
        image.onerror = finish;
        if (props.sizes) image.sizes = props.sizes;
        if (props.srcSet) image.srcset = props.srcSet;
        image.src = props.src;
    })));
}
