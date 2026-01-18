
import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import BlogHero from '../components/Blog/BlogHero';
import BlogSearchFilter from '../components/Blog/BlogSearchFilter';
import BlogPostCard from '../components/Blog/BlogPostCard';
import BlogSkeleton from '../components/Blog/BlogSkeleton';
import BlogNoResults from '../components/Blog/BlogNoResults';
import { supabase } from '../../supabaseClient';
import { useTheme } from '../../styles/ThemeProvider';
import clsx from 'clsx';

// Manifesto da página Blog
// - Modular: cada seção é um componente
// - Skeleton: BlogSkeleton
// - Hooks: useState, useEffect
// - Router: react-router-dom para navegação
// - Responsivo, acessível, mobile-first, tokenização CSS

const BlogPage2: React.FC = () => {
  const { mode } = useTheme();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog | Hermida Maia Advocacia';
    setLoading(true);
    const fetchData = async () => {
      let postsQuery = supabase
        .from('blog')
        .select('*')
        .order('published_at', { ascending: false });
      if (activeCategory) {
        postsQuery = postsQuery.eq('category', activeCategory);
      }
      const { data: postsData, error: postsError } = await postsQuery;
      // blog_categories remains unchanged
      const { data: catsData, error: catsError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('nome', { ascending: true });
      if (!postsError && Array.isArray(postsData)) setPosts(postsData);
      if (!catsError && Array.isArray(catsData)) setCategories(catsData);
      setLoading(false);
    };
    fetchData();
  }, [activeCategory]);

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.resumo && post.resumo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div
      className={clsx(
        'min-h-screen selection:bg-brand-primary selection:text-white',
        mode === 'clear'
          ? 'bg-white text-gray-900'
          : 'bg-brand-dark text-white'
      )}
    >
      <Header />
      <main className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogHero />
          <BlogSearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          {loading ? (
            <BlogSkeleton />
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <BlogPostCard key={post.id || idx} post={post} category={categories.find((c:any) => c.id === post.categoria_id) || null} />
              ))}
            </div>
          ) : (
            <BlogNoResults onClear={() => { setSearchTerm(''); setActiveCategory(null); }} />
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default BlogPage2;


