/* import React, { useState,useEffect} from "react";
import { 
  Typography,
  Grid
} from '@material-ui/core';


const Repos = () =>  {
    const  [hasError, setErrors] =  useState(false)
    const [repos, setRepos] = useState([])

    async function fetchData() {
        const res = await fetch('https://api.github.com/search/repositories?q=created:%3E2021-06-07&sort=stars&order=desc');
        res
          .json()
          .then(res => setRepos(res.items))
          .catch(err => setErrors(err));
      }
    
      useEffect(() => {
        fetchData();
      },[]);

      console.log("Reeeepos: ", repos)

  return(
    //<div>{JSON.stringify(repos)}</div>;
    <div>
        <table id="reposTable">
                <tr>
                    <td>Repo Information</td>
                    <td>Repo URL</td>
                    <td>Language</td>
                    <td>Owner</td>
                    <td>Number of Stars!</td>
                </tr>
            <tbody>
                {
                  repos.map((repo) => {
                    return(  
                        <tr key={repo.id}>
                        <td>
                            <Grid container>
                              <Grid item lg={10}>
                                  <Typography>{repo.full_name}</Typography>
                                  <Typography color="textSecondary" variant="body2">{repo.description}</Typography>
                              </Grid>
                            </Grid>
                          </td>
                          <td><a href={repo.html_url}>{repo.name}</a></td>
                          <td>{repo.language}</td>
                          <td>{repo.owner.login}</td>
                          <td>{repo.stargazers_count}</td>
                        </tr>
                     )
                  })
                }
            </tbody>
        </table>
    </div>
  ) 

};

export default Repos */