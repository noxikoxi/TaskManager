import hero from "../../public/hero.jpg"
import Image from "next/image";

const Hero = () => {
    return (
        <div>
            <Image src={hero}  alt="Hero Image" className="w-full max-h-[600px] object-cover "/>
        </div>
    )
}

export default Hero;