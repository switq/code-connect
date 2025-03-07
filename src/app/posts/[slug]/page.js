import logger from '/src/logger';
import remarkHtml from 'remark-html';
import { remark } from 'remark';

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
            <h1 style={{ color: 'white' }}>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </>
    )
}

export default PagePost;