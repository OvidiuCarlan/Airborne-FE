import {SearchResult} from "./SearchResult";
import styles from './searchResultsList.module.css';

export const SearchResultsList = ({ results }) => {

  return (
    <div className={styles["results-list"]}>
      {results.map((result, id) => {
        console.log(result);
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};