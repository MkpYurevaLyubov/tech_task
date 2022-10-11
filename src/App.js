import React from "react";
import { useEffect, useState} from "react";
import { Octokit } from "octokit";
import CustomTable from "./components/table";

const App = () => {
  const octokit = new Octokit({
    auth: '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'
  });
  const [issues, setIssues] = useState([]);

  useEffect( () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "angular",
        repo: "angular",
      });
      setIssues(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <CustomTable data={issues} />
    </div>
  );
};

export default App;
