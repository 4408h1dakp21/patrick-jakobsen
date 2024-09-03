import Image from "next/image";
import Navbar from "./Navbar";

const HeroSection = () => {
    return ( <div className="flex flex-col justify-between min-h-[400px]">
        <div className=" w-full min-h-[435px] bg-gradient-to-b from-blue-300 to-black/25">
            <Navbar />

            <div className="flex flex-col gap-2 items-center justify-center mt-5 text-center">
                <h1 className="text-white text-5xl font-normal">More <br /> Comfortable. <br /> More Classy.</h1>
                <p className="text-white text-md  text-center font-light">Make your loving experience even <br /> more memorable.</p>
            </div>
            <div className="relative w-full h-[420px] mt-5">
                <Image src="/house.png" alt="House" fill quality={100} className="object-cover" />
            </div>
        </div>

    </div> );
}

export default HeroSection;
