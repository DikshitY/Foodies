import Image from "next/image"
import classes from "./page.module.css"
import { getMeal } from "@/lib/meals"
import { notFound } from "next/navigation"

export default function MealPage({params: {meal}}){
    const mealItem = getMeal(meal)

    if(!mealItem){
        notFound()
    }

    mealItem.instructions = mealItem.instructions.replace(/\n/g, '<br />')

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={mealItem.image} alt={mealItem.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{mealItem.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${mealItem.creator_email}`}>{mealItem.creator}</a>
                    </p>
                    <p className={classes.summary}>{mealItem.summary}</p>
                </div>
            </header>
            <main>
                <p
                  className={classes.instructions}
                  dangerouslySetInnerHTML={{
                    __html: mealItem.instructions
                  }}
                ></p>
            </main>
        </>
    )
}