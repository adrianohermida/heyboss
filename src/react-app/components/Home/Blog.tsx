import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setPosts([
          { 
            title: "Lei do Superendividamento: Como sair do sufoco financeiro legalmente", 
            date: "20 Mai, 2024",
            image: "https://heyboss.heeyo.ai/gemini-image-c5df3e56df0a49fdb468a4708ef7c8a8.png",
            url: "#"
          },
          { 
            title: "Justiça garante preservação do mínimo existencial para famílias endividadas", 
            date: "12 Mai, 2024",
            image: "https://heyboss.heeyo.ai/gemini-image-805a2be1c3c8401c828287f865b36b4c.png",
            url: "#"
          },
          { 
            title: "Renegociação em bloco: A estratégia definitiva contra juros abusivos", 
            date: "05 Mai, 2024",
            image: "https://heyboss.heeyo.ai/gemini-image-66fd2e2355974def87a7cb3056023985.png",
            url: "#"
          }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Blog de Defesa do Consumidor: Dicas para Renegociar Dívidas</h2>
          <p className="text-white/60">Mantenha-se informado sobre a Lei 14.181/2021 e como eliminar dívidas legalmente com nossa consultoria jurídica.</p>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {posts.map((post, idx) => (
              <article 
                key={post.id || idx} 
                className="bg-brand-elevated rounded-3xl overflow-hidden border border-white/5 group hover:border-brand-primary/30 transition-all cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt={`Artigo: ${post.title} - Advocacia especializada em dívidas`} 
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-brand-primary text-xs font-bold uppercase mb-3">{post.date}</p>
                    <h3 className="text-xl font-bold text-white mb-6 leading-tight group-hover:text-brand-primary transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="text-white/60 font-bold text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                      Ler mais <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link 
            to="/blog"
            className="inline-block bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all"
          >
            Ver Todos os Artigos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
