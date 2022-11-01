import React, { useState, useEffect, EffectCallback } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import "./style.css";

export default function Autocomplete() {
  const [string, setString] = useState<string>("");
  const [value] = useDebounce(string, 1000);

  let githubReposList: React.ReactNode = null;

  useEffect(() => {
    (async function searchRepos() {
      if (value.length >= 3) {
        let query =
          "q=" + encodeURIComponent(`${value} in:name&sort:string&order:asc`);

        let res = await axios.get(
          `https://api.github.com/search/repositories?${query}`,
          { maxContentLength: Infinity }
        );
        console.log(res.data);
      }
    })();
  }, [value]);

  // const onChange = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   const { value } = e.target;

  //   setString(value);

  //   if (value.length >= 3) {
  //     console.log("dfs");
  //     let query =
  //       "q=" + encodeURIComponent(`${value} in:name&sort:string&order:asc`);
  //     let res = await axios.get(
  //       `https://api.github.com/search/repositories?${query}`
  //     );
  //     console.log(res);
  //   }
  // };

  // const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  //   console.log(e.keyCode);
  // };

  return (
    <div>
      <input
        type="text"
        name="autocomplete"
        id="autocomplete"
        className="autocomplete"
        value={string}
        onChange={(e) => setString(e.target.value)}
        // onKeyDown={onKeyDown}
      />
      <p>{value}</p>
      {githubReposList}
    </div>
  );
}
