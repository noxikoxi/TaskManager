import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {createUser} from "@/lib/actions";
import {getSession} from "@auth0/nextjs-auth0";

let alreadyCreatedUser = false;

export default async function Home() {
    const session = await getSession();

    if(session?.user && !alreadyCreatedUser) {
        if(await createUser()){
            alreadyCreatedUser = true;
        }
    }
  return (
      <div className="w-full h-screen flex flex-col">
          <Header/>
          <div className="bg-orange-200 h-full w-full">
              <Hero/>
              <div className="container mx-auto flex-1 py-10 relative">
                  <div className="bg-gray-300 p-5 rounded-2xl border-2 border-gray-400 flex flex-col justify-center items-center shadow-md -mt-20">
                    <span className="text-black font-semibold text-4xl tracking-tight">
                        Save your notes today
                    </span>
                    <span className="text-xl"> Who notes is never lost</span>
                  </div>
              </div>
          </div>
      </div>
  );
}
