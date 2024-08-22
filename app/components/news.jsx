"use client";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import NewsItem from "./newsitem";
import Loader from "./loader";
import InfiniteScroll from "react-infinite-scroller";
import { CountriesContext } from "../context/countries_context";
import { SearchContext } from "../context/search_context";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { country } = useContext(CountriesContext);
  const { searchQuery } = useContext(SearchContext);

  const updateNews = async () => {
    console.log(props);
    try {
      const newsData = await axios.get(
        searchQuery
          ? `https://newsapi.org/v2/top-headlines?q=${searchQuery}&apiKey=${props.apiKey}`
          : `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&country=${country}`
      );
      newsData?.data?.totalResults
        ? setArticles(newsData.data.articles)
        : setArticles([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreData = async () => {
    try {
      const newsData = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${
          props.category
        }&apiKey=${props.apiKey}&country=${country}&page=${page + 1}`
      );
      setArticles((prevArticles) => [
        ...prevArticles,
        ...newsData.data.articles,
      ]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(articles.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPage(1);
    setArticles([]);
    updateNews();
    document.title = `NewsMonkey - ${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } Headlines`;
  }, [country]);

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="loader" key={1}>
          <Loader />
        </div>
      }
      maxLength={articles.length}
      className="w-screen"
    >
      {/* <h1 className="w-screen text-center"> hello</h1> */}
      <div className="flex min-h-screen w-screen flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-12 items-center justify-between px-12 py-24">
        {articles.map((article, index) => (
          <NewsItem
            key={index}
            imageUrl={article.urlToImage}
            title={article.title}
            source={article.source.name}
            description={article.description}
            author={article.author}
            date={article.publishedAt}
            newsUrl={article.url}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
