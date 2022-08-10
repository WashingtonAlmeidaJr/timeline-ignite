import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
//biblioteca para formatar datas
import { format, formatDistanceToNow } from "date-fns";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
    }

interface PostProps {
    //corresponde as propriedades do Post
author: Author;
publishedAt: Date;
content: Content[];
}

interface Content {
type: 'paragraph' | 'link';
content: string[];
}




export function Post({ author, publishedAt, content}: PostProps) {
//Fiz uma desestruturação nas propriedades props={ author, role, publishedAt, avatarUrl, content } no typestript deve-se devinir o formato do objeto inteiro, no caso do Author eu passei o formato "Author" que engloba todas as propriedades do autor(nome, URL e cargo)
const publishedDateFormatted = format(
//formatação de data usando o date-fns (biblioteca de formatação date-fns), outra opção é utilizar o Intl
publishedAt,
"d 'de' LLLL 'às' HH:mm'h'"
);
const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
addSuffix: true,
});
const [comments, setComments] = useState([]);
//manipulação do estado do array de comentários
const [newCommentText, setNewCommentText] = useState([]);
//manipulação de estado do conteudo do text area
function handleCreateNewComment(event: FormEvent) {
//função para tratar o evento submit do formulário
event.preventDefault();
//insere o valor do text area no array de comentarios
setComments([...comments, newCommentText]);
setNewCommentText([]);
}
function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
event.target.setCustomValidity("");
setNewCommentText(event.target.value);
}
function deleteComment(commentToDelete: string) {
// função que irá deletar o comentário
// A função irá enviar informação para o componente comentário e
// irá receber a informação de qual comentário ele precisa deletar
// por uma outra função.
// utilizando o conceito de imutabilidade, foi criado um novo array
// chamado commentWithoutDeletedOne que percorre o array comments e
// exclui o commentario a ser excluido, logo após ele atualiza o
// estadode comentários (setComment)
//
const commentsWithoutDeletedOne = comments.filter((comment) => {
    return comment !== commentToDelete;
});
setComments(commentsWithoutDeletedOne);
}
function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
//altera o texto no momento de validação quando o texto não for inserido
event.target.setCustomValidity("Esse campo é obrigatório");
}
const isNewCommentEmpty = newCommentText.length === 0;

return (
<article className={styles.post}>
    <header>
    <div className={styles.author}>
        <Avatar src={author.avatarUrl} />
        <div className="authorInfo">
            <strong>{author.name}</strong>
            <br></br>
            <span>{author.role}</span>
        </div>
    </div>
    <time
        title={publishedDateFormatted}
        dateTime={publishedAt.toISOString()}
    >
        {publishedDateRelativeToNow}
    </time>
    </header>
    <div className={styles.content}>
    {content.map((line) => {
        if (line.type === "paragraph") {
        return <p key={line.content}>{line.content}</p>;
        } else if (line.type === "link") {
        return (
            <p key={line.content}>
            <a>{line.content}</a>
            </p>
        );
        }
    })}
    </div>
    <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
    <strong>Deixe o seu feedback</strong>
    <textarea
        onChange={handleNewCommentChange}
        value={newCommentText}
        name="comment"
        placeholder="Deixe o seu comentário"
        required
        //evento que altera o texto apresentado se não houver texto
        onInvalid={handleNewCommentInvalid}
    />
    <footer>
        <button type="submit" disabled={isNewCommentEmpty}>
        Publicar
        </button>
    </footer>
    </form>
    <div className={styles.commentList}>
    {comments.map((comment) => {
        return (
        <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
        />
        );
    })}
    </div>
</article>
);
}
