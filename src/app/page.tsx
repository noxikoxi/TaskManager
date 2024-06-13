import Header from "@/components/Header";
import Hero from "@/components/Hero";

let alreadyCreatedUser = false;

export default async function Home() {
  return (
      <div className="w-full h-screen flex flex-col">
          <Header/>
          <div className="bg-background h-full w-full">
              <Hero/>
              <div className="container mx-auto flex-1 py-10 relative">
                  <div className="bg-primary p-5 rounded-2xl flex flex-col justify-center items-center shadow-md -mt-20">
                    <span className="text-primary-foreground font-semibold text-4xl tracking-tight">
                        Schedule your tasks today
                    </span>
                    <span className="text-primary-foreground text-xl">Write notes so you won{"'"}t forget</span>
                  </div>
              </div>
          </div>
      </div>
  );
}
