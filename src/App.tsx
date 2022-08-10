import { useState } from "react";
import { Post } from "./components/Post";
import "./global.css";
import styles from "./App.module.css"
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";
import { ProjectorScreenChart } from "phosphor-react"
import { format } from "date-fns"

//author{avatar_url:"",name:"",role:""}
//publishedAt:Date
//content:string

const posts=[
  {
    id:1,
    author:{
      avatarUrl:'https://avatars.githubusercontent.com/u/104541177?v=4',
      name:'Washington Junior',
      role:'Web Developer',
    },
    content:[
      {type:'paragraph','content':'Falaa dev!'},
      {type:'paragraph','content':'Acabei de fazer o meu primeiro projeto em Reactjs'},
      {type:'link','content':'https://github.com/WashingtonAlmeidaJr'},
    ],
    publishedAt:new Date('2022-08-03 20:00:00'),
  } ,
  {
    id:2,
    author:{
      avatarUrl:'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=996&t=st=1659833301~exp=1659833901~hmac=3a93aeffc8d521c19a1e06283bbcd5e47314bae21b9e0989f46b095f3ad432ac',
      name:'Mauricio Silva',
      role:'UX design',
    },
    content:[
      {type:'paragraph','content':'E ae Pessoal'},
      {type:'paragraph','content':'Alguém poderia me ajudar a estilizar essa div no css?'},
    ],
    publishedAt:new Date('2022-08-03 20:00:00'),
  } ,
  {
    id:3,
    author:{
      avatarUrl:'https://img.freepik.com/fotos-premium/retrato-de-jovem-adoravel-morena-com-uma-camisa-olhando-para-a-camera-com-os-bracos-cruzados_168410-1953.jpg?w=996',
      name:'Adriana Gomes',
      role:'Teach Leader',
    },
    content:[
      {type:'paragraph','content':'Gente'},
      {type:'paragraph','content':'Adorei essa nova interface do App'},
    ],
    publishedAt:new Date('2022-08-03 20:00:00'),
  } 
]


function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
          <Sidebar/>
        <main>
          {posts.map(post=>{
            return(
            <Post
            key={post.id}
            author={post.author}
            avatarUrl={post.author}
            content={post.content}
            publishedAt={post.publishedAt}
            role={post.author}
            />
            )
          })}
        </main>
      </div>
    </div>
  );
}

export default App;