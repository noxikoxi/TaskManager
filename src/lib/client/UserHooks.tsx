'use client'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {toast} from "sonner";
import {UpdateUserRequest} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useGetCurrentUser = () => {
    const getCurrentUserRequest = async () => {
        const response = await fetch(API_BASE_URL + "/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error("Failed to get profile");
        }

        return await response.json();
    }

    const {data : user, isLoading, error} = useQuery(
        ["fetchUser"],
        () => getCurrentUserRequest()
    );

    if(error){
        toast.error("Something went wrong, please try again: " + error.toString());
    }

    return {
        user,
        isLoading,
        error
    }
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const getUpdateUserRequest = async (data : UpdateUserRequest) => {
        const response = await fetch(API_BASE_URL + "/user/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error("Failed to update profile");
        }

        return await response.json();
    }

    const mutation = useMutation({
        mutationFn: getUpdateUserRequest,
        onSuccess: () => {
            toast.success("Successfully updated profile!");
            queryClient.invalidateQueries('fetchUser');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const updateUsr = (data : UpdateUserRequest) => {
        mutation.mutate(data)
    }

    const isLoading = mutation.isLoading;

    return {
        updateUser : updateUsr,
        isLoading
    }
}