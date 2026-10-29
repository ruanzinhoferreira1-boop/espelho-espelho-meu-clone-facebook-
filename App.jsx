
import './App.css'
import { useState } from 'react'

function App() {
  const [novoPost, setNovoPost] = useState('')
  const [posts, setPosts] = useState([])
  const [curtidas, setCurtidas] = useState({})
  const [curtido, setCurtido] = useState({})
  const [comentario, setComentario] = useState({})
  const [comentarios, setComentarios] = useState({})

  function publicar() {
    if (novoPost.trim() !== '') {
      setPosts([{ id: Date.now(), texto: novoPost }, ...posts])
      setNovoPost('')
    }
  }

  function curtir(id) {
    setCurtido({ ...curtido, [id]: !curtido[id] })
    setCurtidas({
      ...curtidas,
      [id]: (curtidas[id] || 0) + (curtido[id] ? -1 : 1)
    })
  }

  function comentar(id) {
    if (comentario[id]?.trim()) {
      setComentarios({
        ...comentarios,
        [id]: [...(comentarios[id] || []), comentario[id]]
      })
      setComentario({ ...comentario, [id]: '' })
    }
  }

  function Post({ id, nome, texto, hora }) {
    return (
      <article className="post">
        <div className="post-cabecalho">
          <div className="avatar">{nome[0]}</div>
          <div>
            <strong>{nome}</strong>
            <p>{hora}</p>
          </div>
        </div>
        <p>{texto}</p>
        <div className="post-acoes">
          <button onClick={() => curtir(id)}>
            {curtido[id] ? '👍 Curtido' : '👍 Curtir'} · {curtidas[id] || 0}
          </button>
          <button onClick={() => document.getElementById(`comentario-${id}`)?.focus()}>
            💬 Comentar
          </button>
          <button onClick={() => navigator.clipboard?.writeText(texto)}>
            ↗ Compartilhar
          </button>
        </div>
        <div className="area-comentarios">
          <input
            id={`comentario-${id}`}
            placeholder="Escreva um comentário..."
            value={comentario[id] || ''}
            onChange={(e) => setComentario({ ...comentario, [id]: e.target.value })}
          />
          <button onClick={() => comentar(id)}>Comentar</button>
          {(comentarios[id] || []).map((item, indice) => (
            <p key={indice}><strong>Você:</strong> {item}</p>
          ))}
        </div>
      </article>
    )
  }

  return (
    <div className="facebook">
      <header className="topo">
        <h1>facebook</h1>
        <input type="text" placeholder="Pesquisar no Facebook" />
      </header>

      <main className="conteudo">
        <section className="publicacao">
          <div className="criar-publicacao">
            <div className="avatar">R</div>
            <input
              type="text"
              placeholder="No que você está pensando?"
              value={novoPost}
              onChange={(e) => setNovoPost(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && publicar()}
            />
          </div>
          <div className="acoes-publicacao">
            <button>🔴 Vídeo ao vivo</button>
            <button>🖼️ Foto/vídeo</button>
            <button> Sentimentos</button>
          </div>
          <button className="botao-publicar" onClick={publicar}>Publicar</button>
        </section>

        <section className="stories">
          <h2>Stories</h2>
          <div className="lista-stories">
            <div className="story criar-story"><span>+</span><p>Criar story</p></div>
            <div className="story"><p>Meu dia</p></div>
            <div className="story"><p>Amigos</p></div>
            <div className="story"><p>Momentos</p></div>
          </div>
        </section>

        <section className="feed">
          <h2>Feed de notícias</h2>
          {posts.map((post) => (
            <Post key={post.id} id={post.id} nome="Você" texto={post.texto} hora="Agora" />
          ))}
          <Post id="maria" nome="Maria Oliveira" texto="Esse é o meu primeiro post!" hora="Hoje às 20:30" />
          <Post id="joao" nome="João Santos" texto="Que dia incrível! 😎" hora="Hoje às 19:15" />
          <Post id="ana" nome="Ana Costa" texto="Aproveitando cada momento com meus amigos! ❤️" hora="Hoje às 18:40" />
        </section>
      </main>
    </div>
  )
}

export default App
