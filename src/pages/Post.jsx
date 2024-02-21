import { useEffect, useState } from "react";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { client } from "../lib/createClient";

export const Post = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        client.getEntries({
            'fields.slug': slug,
            content_type: 'pageBlogPost',
            include: 2
        }).then(function (entries) {
            if (entries.items.length > 0) {
                setPost(entries.items[0]);
            } else {
                setPost(null);
            }
        });
    }, [slug]);

    if (!post) {
        return <div>Carregando...</div>;
    }

    const featuredImageUrl = post.fields.featuredImage?.fields.file.url;

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="my-3">{post.fields.title}</h1>
                        <h2 className="my-3">{post.fields.subtitle}</h2>
                        {featuredImageUrl && (
                            <img src={`https:${featuredImageUrl}`} alt={post.fields.title} style={{ width: '100%' }} />
                        )}
                        <p className="text-muted">Publicado em: {new Date(post.fields.publishedDate).toLocaleDateString()}</p>
                        <p className="text-muted">Autor: {post.fields.author?.fields.name}</p>
                        <p className="text-muted">Categoria: {Array.isArray(post.fields.category) ? post.fields.category.join(', ') : post.fields.category}</p>
                        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.fields.content) }}></div>

                        {/* Exibindo posts relacionados, se existirem */}
                        {post.fields.relatedBlogPosts && post.fields.relatedBlogPosts.length > 0 && (
                            <div>
                                <h3>Posts Relacionados</h3>
                                <ul>
                                    {post.fields.relatedBlogPosts.map((relatedPost) => (
                                        <li key={relatedPost.sys.id}>
                                            <Link to={`/post/${relatedPost.fields.slug}`}>
                                                {relatedPost.fields.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-4">
                            <Link to="/" className="btn btn-primary">
                                Voltar para Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
