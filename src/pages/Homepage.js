import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import axios from "axios"; //引入 axios

const Homepage = () => {
  //使用 state
  let [data, setData] = useState(null);
  let [input, setInput] = useState("");
  let [page, setPage] = useState(1);
  let [currentSearch, useCurrentSearch] = useState("");

  //下方為 pexel api key
  const auth = "Here should be api key";
  //下方為 api 使用文件中的 http request 之 URL 與 相關參數(?與後方)
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    //console.log(result);	可看到 promise object 中的物件，以此決定下方的 setData
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };

  //下方使用 useEffect 監控某個變數(第二參數)：若目標狀態改變(重新渲染)則執行所規定 function (第一參數)；若 useEffect 第二參數為空(empty array)，則所規定 function (寫在 useEffect 第一參數) 僅會被執行一次，即頁面剛載入渲染時。
  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
        {/* 1. 如果只用
            {data.map((d) => {
            return <Picture />; })} 
          會出現錯誤(因為 null 無法.map)；
          && 等 logical operator 的原理為：左方為 true，則運算出右方 or
          左方 false 則運算出左方結果( null 本身為 falsy value ) ；
          2. 將 Picture component 的 data 屬性設定為要傳遞到 Picture.js 的
          data (每張照片，即上方的 setData(result.data.photos) )
          */}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>More photos</button>
      </div>
    </div>
  );
};

export default Homepage;
