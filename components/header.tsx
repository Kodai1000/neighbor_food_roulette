import Image from "next/image";

export default function Header() {
    return (
        <div className="w-full bg-[#006D5B] text-white pt-2 pb-2">
            <div className="lg:flex justify-between items-center bg-white w-full">
                <h1 className="text-4xl font-bold text-black m-2">近くの外食ルーレット</h1>
                <div className="flex items-center m-2">
                    <p className="text-black">本サイトではホットペッパーグルメwebサービスを利用しています。</p>
                    <a href="http://webservice.recruit.co.jp/">
                        <Image
                            src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif"
                            alt="ホットペッパーグルメ Webサービス"
                            width={88}
                            height={35}
                            title="ホットペッパーグルメ Webサービス"/>
                    </a>
                </div>
            </div>
        </div>

    )
}