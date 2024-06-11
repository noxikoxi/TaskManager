'use client'

import DashboardPreview from "@/components/DashboardPreview";
import DashboardTopBar from "@/components/DashboardTopBar";
import {useGetDashboards} from "@/lib/client/hooks";


export default function Home() {

    const {dashboards, isLoading} = useGetDashboards();

    if(isLoading){
        return <span>Loading...</span>
    }

    return (
        <div className="relative inset-0 h-full w-full bg-background">
            <DashboardTopBar
                options={{
                    Dashboards: true,
                    Notes: false
                }}
                linkList={["/dashboards"]}
                textList={["Dashboards"]}
            />
            {!dashboards || dashboards.length == 0 ? (
                <div className="flex flex-1 flex-row justify-center">
                        <div className="flex flex-col items-center gap-5 p-5">
                        <p className="font-semibold text-black text-xl"> You do not have any dashboards yet</p>
                        <p className="font-semibold text-black text-xl"> Start creating</p>
                        </div>
                </div>
            ) : (
                <div className="p-10 grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,_1fr))]">
                    {dashboards.map((dashboard) => (
                        <DashboardPreview
                            id={dashboard._id}
                            key={dashboard._id}
                            createdAt={dashboard.createdAt}
                            notesNumber={dashboard.notes.length}
                            title={dashboard.name}
                            description={dashboard.description}
                        />
                    ))
                    }
                </div>
            )
            }

        </div>
    )

}
