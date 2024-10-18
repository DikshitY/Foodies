"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import classes from "./image-picker.module.css"

export default function ImagePicker({label, name}){
    const inputRef = useRef()
    const [pickedImage, setPickedImage] = useState(null)

    const pickImage = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) =>{
        const file = event.target.files[0]

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="Image picked by the user." fill />}
                </div>
                <input 
                    ref={inputRef} 
                    className={classes.input} 
                    id={name} 
                    name={name} 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                />
                <button className={classes.button} onClick={pickImage} type="button" >Pick an Image</button>
            </div>
        </div>
    )
}