import styles from "./cardPost.module.css"
import Image from "next/image"
import { Avatar } from "../Avatar"

export const CardPost = ({post}) => {
    return (
        <article className={styles["card-container"]}>
            <header className={styles["header"]}>
                <figure>
                    <Image className={styles["header-image"]} src={post.cover} width={438} height={133} alt={`header image: ${post.title}`} />
                </figure>
            </header>
            <section className={styles["card-content"]}>
                <h2 className={styles["card-title"]}>{post.title}</h2>
                <p className={styles["card-text"]}>{post.body}</p>
            </section>
            <footer className={styles["card-footer"]}>
                <Avatar 
                    imageSrc={post.author.avatar} 
                    name={post.author.username}
                    
                />
            </footer>
        </article>
    )
}