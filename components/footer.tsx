
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div
            aria-label="サービス情報"
            className="mx-auto w-full max-w-xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
            <div className="mb-3 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-semibold text-gray-700">
                    使用させていただいているAPIについて
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <a
                    href="https://webservice.recruit.co.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                >
                    <Image
                        src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif"
                        alt="ホットペッパーグルメ Webサービス"
                        width={88}
                        height={35}
                        unoptimized
                    />
                </a>

                <p className="text-sm leading-relaxed text-gray-700">
                    本サイトではホットペッパーグルメ
                    Webサービスを利用しています。
                </p>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-gray-500">
                本サイトはリクルートのwebサービスを利用して、個人が開発・運営している非公式サービスです。
            </p>

            <div className="mt-3 mb-3 border-b border-gray-100 pb-2">
                <h2 className="text-sm font-semibold text-gray-700">
                    開発・管理
                </h2>
            </div>
            <div className="flex">
                <Image
                    src={"./profile.png"}
                    alt="開発者のプロフィール画像"
                    width={50}
                    height={15}
                    unoptimized
                />
                <div className="flex flex-col">
                    <p>Kudayi</p>
                    <Link
                        href="https://x.com/kudayi_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 ml-6"
                    >
                        開発者のXを見る ↗
                    </Link>
                </div>
            </div>
            

        </div>
    );
}
