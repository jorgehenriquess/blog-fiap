import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { client } from "../lib/createClient";
import { useTheme } from '../lib/ThemeProvider';
import '../css/theme.css';

export const Home = () => {
    const { theme, toggleTheme } = useTheme();
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");


    const fetchPosts = (increment = 3) => {
        if (!loading) {
            setLoading(true);
            client.getEntries({
                content_type: 'pageBlogPost',
                limit: increment,
                skip: skip,
                order: "-sys.createdAt"
            }).then(function (entries) {
                if (entries.items.length < increment) {
                    setHasMore(false); // Não há mais posts para carregar
                }
                setPosts(posts.concat(entries.items));
                setSkip(skip + entries.items.length);
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        document.body.className = `${theme}-theme`;
        fetchPosts();
    }, [theme]);

    useEffect(() => {
        const allCategories = posts.map(post => post.fields.category).filter(category => category);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
    }, [posts]);

    useEffect(() => {
        let result = posts;
        if (activeCategory) {
            result = result.filter(post => post.fields.category === activeCategory);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(post =>
                post.fields.title.toLowerCase().includes(query) ||
                post.fields.shortDescription.toLowerCase().includes(query)
            );
        }
        setFilteredPosts(result);
    }, [activeCategory, searchQuery, posts]);

    return (
        <Layout>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="flex-grow-1 me-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar posts..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="btn btn-outline-secondary"
                    >
                        Alternar para {theme === 'light' ? 'Escuro' : 'Claro'}
                    </button>
                </div>

                <div className="row">
                    <main className="col-md-8">
                        <h1 className="mb-3">Últimos posts</h1>
                        {filteredPosts.map(post => (
                            <div className="card mb-3" key={post.sys.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.fields.title}</h5>
                                    <p className="card-text">{post.fields.shortDescription}</p>
                                    <div className="mb-3">
                                        <img src={`https:${post.fields.featuredImage.fields.file.url}`} alt={post.fields.title} className="img-fluid" />
                                    </div>
                                    <p className="mb-0">Autor: {post.fields.author.fields.name}</p>
                                    <p className="mb-0">Data de Publicação: {new Date(post.fields.publishedDate).toLocaleDateString()}</p>
                                    <Link to={`/post/${post.fields.slug}`} className="card-link">
                                        Ver post
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {hasMore && (
                            <button
                                onClick={() => fetchPosts()}
                                className='btn btn-primary'
                                disabled={loading}
                            >
                                {loading ? 'Carregando...' : 'Ver mais posts'}
                            </button>
                        )}
                    </main>
                    <aside className="col-md-4">
                        <h2>Categorias</h2>
                        <ul>
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setActiveCategory(category)}
                                        className={`btn ${categories === category ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setActiveCategory('')}
                                    className="btn btn-outline-secondary"
                                >
                                    Mostrar todos
                                </button>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </Layout>
    );

};
