import Image from "next/image"
import styles from "./avatar.module.css"


export const Avatar = ({name,imageSrc}) => {
    return (
        <ul className={styles["container"]}>
            <li>
                <Image src={imageSrc} alt={`avatar image: ${name}`} width={32} height={32} />
            </li>
            <li>
                @{name}
            </li>
        </ul>
    )
}
