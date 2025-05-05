import React, { useState } from "react";

type TypeListProps = {
  type: string;
  views: number;
};

type TypePostProps = {
  title?: string;
  url?: string;
} & TypeListProps;

function New(props: React.PropsWithChildren) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props: React.PropsWithChildren) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props: TypePostProps) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props: TypePostProps) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

function withPostRender(Component: React.ComponentType<TypePostProps>) {
  return function ComponentWrapper(props: TypePostProps) {
    if (props.views > 1000) {
      return (
        <Popular>
          <Component {...props} />
        </Popular>
      );
    } else {
      return (
        <New>
          <Component {...props} />
        </New>
      );
    }
  };
}

const VideoRender = withPostRender(Video);
const ArticleRender = withPostRender(Article);

function List({ list }: { list: TypeListProps[] }) {
  return list.map((item) => {
    switch (item.type) {
      case "video":
        return <VideoRender {...item} />;

      case "article":
        return <ArticleRender {...item} />;

      default:
        return null;
    }
  });
}

export default function App() {
  const [list] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ]);

  return <List list={list} />;
}
