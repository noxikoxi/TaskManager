'use client'

import {useMutation, useQuery, useQueryClient} from "react-query";
import {
    createDashboard,
    deleteDashboard,
    deleteNote,
    fetchDashboard,
    getDashboards,
    updateDashboard
} from "@/lib/actions";
import {toast} from "sonner";
import {Dashboard, dashboardForm, noteForm} from "@/lib/types";
import {UserProfile, useUser} from "@auth0/nextjs-auth0/client";
import {useEffect} from "react";

export const useGetDashboard = (userId: string) => {

    const {data : dashboard, isLoading, error} = useQuery(
        ["fetchCurrentDashboard", userId],
        () => fetchDashboard(userId)
    );

    if(error){
        toast.error("Something went wrong, please try again: " + error.toString());
    }

    return {
        dashboard,
        isLoading,
        error
    }
}

export const useGetDashboards = () => {
    const {user, isLoading : isUserLoading} = useUser();

    const {data, error, isLoading} = useQuery(
        ["fetchCurrentDashboard", user?.sub],
        () => getDashboards(user?.sub)
    );

    if(error){
        toast.error("Something went wrong, please try again: " + error.toString());
    }

    const dashboards : (Dashboard & {_id: string})[] | undefined = data;

    const Loading = isLoading && isUserLoading

    return {
        dashboards,
        isLoading : Loading
    }
}

export const useUpdateDashboard = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateDashboard,
        onSuccess: () => {
            toast.success("Successfully updated note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const updateDash = ({id, name, description} : dashboardForm & {id: string}) => {
        mutation.mutate({
            id,
            name,
            description
        })
    }

    const isLoading = mutation.isLoading;

    return {
        updateDashboard : updateDash,
        isLoading
    }
}

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateDashboard,
        onSuccess: () => {
            toast.success("Successfully created note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const createNote = (data: noteForm & {id: string}) => {
        mutation.mutate({
            id : data.id,
            noteTitle: data.title,
            noteContent: data.content
        })
    }

    const isLoading = mutation.isLoading;

    return {
        createNote,
        isLoading
    }
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateDashboard,
        onSuccess: () => {
            toast.success("Successfully updated note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const updateNote = (data: noteForm & {id: string, noteId?: string}) => {
        mutation.mutate({
            id : data.id,
            noteTitle: data.title,
            noteContent: data.content,
            noteId: data.noteId
        })
    }

    const isLoading = mutation.isLoading;

    return {
        updateNote,
        isLoading
    }
}

export const useCreateDashboard = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createDashboard,
        onSuccess: () => {
            toast.success("Successfully created dashboard!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const createDash = (data : dashboardForm) => {
        mutation.mutate(data);
    }

    const isLoading = mutation.isLoading;

    return {
        createDashboard : createDash,
        isLoading
    }

}

export const useDeleteDashboard = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteDashboard,
        onSuccess: () => {
            toast.success("Successfully deleted dashboard!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const isLoading = mutation.isLoading;

    const deleteDash = (id: string) => {
        mutation.mutate(id);
    }

    return {
        deleteDashboard: deleteDash,
        isLoading
    }
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            toast.success("Successfully deleted note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const isLoading = mutation.isLoading;

    const _deleteNote = ({dashboardId, noteId}: {dashboardId: string, noteId: string}) => {
        mutation.mutate({dashboardId, noteId});
    }

    return {
        deleteNote: _deleteNote,
        isLoading
    }
}