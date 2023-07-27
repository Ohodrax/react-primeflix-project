import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme.css";

import api from "../../services/api";

import { toast } from "react-toastify";

function Filme(){

    const { id } = useParams();

    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "9da8edeb724986a2babdf50fef776ddd",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Não existe")
                navigation("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado");
        }
    }, [navigation, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id );

        if (hasFilme) {
            toast.warn("Esse filme já existe na lista.");
            return;
        }
        
        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));

        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>

            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>

            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button><a href={`https://youtube.com/results?search_query=${filme.title} treiler`} target="_blank" rel="external">Trailer</a></button>
            </div>
        </div>
    );
}

export default Filme;