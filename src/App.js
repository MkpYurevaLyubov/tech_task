import React from "react";
import { useEffect, useState} from "react";
import CustomTable from "./components/table";

const App = () => {
  const [issues, setIssues] = useState([]);
  const [issuesInfo, setIssuesInfo] = useState({
    total_count: 0,
    page: 0,
    per_page: 10,
    order: "asc",
    orderBy: "created",
  });
  const { per_page, page, order, orderBy } = issuesInfo;

  useEffect( () => {
    fetchData();
  }, [page, per_page, order, orderBy]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=angular/angular&per_page=${per_page}&page=${page + 1}&sort=${orderBy}&order=${order}`
      );
      const result = await res.json();
      setIssues(result.items);
      setIssuesInfo({ ...issuesInfo, total_count: result.total_count });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeParams = (value) => {
    setIssuesInfo(prevState => ({ ...prevState, ...value }));
  }

  return (
    <CustomTable
      data={issues}
      params={issuesInfo}
      onChangeParams={handleChangeParams}
    />
  );
};

export default App;
