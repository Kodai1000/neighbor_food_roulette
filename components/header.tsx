import Image from "next/image";

export default function Header() {
    return (
        <div className="w-full bg-[#006D5B] text-white pt-2 pb-2">
            <div className="lg:flex justify-between items-center bg-white w-full">
                <div className="flex p-2 items-center">
                    <Image src={"./neighbor_food_icon.svg"} alt="favicon" width={50} height={50} className="m-2"/>
                    <h1 className="text-4xl font-bold text-black m-2">近くの外食ルーレット</h1>
                </div>
            </div>
        </div>

    )
}