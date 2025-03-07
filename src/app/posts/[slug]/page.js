import logger from '/src/logger';
import remarkHtml from 'remark-html';
import { remark } from 'remark';
import { CardPost } from '../../../components/CardPost';
import styles from './page.module.css';

async function getPostBySlug(slug) {
    const url = `http://localhost:3042/posts?slug=${slug}`;
    const response = await fetch(url);
    if (!response.ok) {
        logger.error('Failed to fetch post data');
        return {};
    }
    const data = await response.json();
    
    if(data.length === 0) {
        return {}   
    }

    const post = data[0];

    const processedContent = await remark()
        .use(remarkHtml)
        .process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml

    return post;
}

const PagePost = async ({params}) => {
    const slug = params.slug;
    const post = await getPostBySlug(slug);

    return (
        <>
            <CardPost post={post} highlight />
            <h3 className={styles.subtitle}>Código:</h3>
            <div className={styles.code}>
                <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
            </div>
        </>
    )
}

export default PagePost;