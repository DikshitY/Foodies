"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

import { saveMeal } from "./meals"

function isInavlidInput(text) {
    return !text || text.trim() === "";
}

export async function addMeal(prevState, formData){
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("creator"),
        creator_email: formData.get("email"),
    }

    if (
        isInavlidInput(meal.title) ||
        isInavlidInput(meal.summary) ||
        isInavlidInput(meal.instructions) ||
        isInavlidInput(meal.creator) ||
        isInavlidInput(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: "Invalid Input.",
        };
    }

    await saveMeal(meal) 
    revalidatePath("/meals");
    redirect("/meals")
}