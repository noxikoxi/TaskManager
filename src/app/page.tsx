import Header from "@/components/Header";

export default function Home() {
  return (
      <div className="w-full h-screen flex flex-col">
          <Header/>
          <div className="bg-orange-200 h-full w-full">
              <div className="container py-5">
                    <span className="text-black font-semibold text-xl">
                        Save your notes today
                    </span>
              </div>
          </div>
      </div>
  );
}
