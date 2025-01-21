import React, { useEffect, useState } from "react";
import "../styles/GreyBoxRepos.css";
import GreyBox from "./GreyBox";

function GreyBoxRepos({ slice = true }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/users/andreasHovaldt/repos?sort=updated"
                );
                const data = await response.json();
                
                // Sort by stars or other criteria
                let sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
                
                // Slice only if the `slice` prop is true
                if (slice) {
                    sortedRepos = sortedRepos.slice(0, 6);
                }

                // Basically return
                setRepos(sortedRepos);

            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };

        fetchRepos();
    }, [slice]);

    return (
        <div className="repos-container">
            {repos.map((repo) => (
                <GreyBox key={repo.id} className="repo-box">
                    <h2>{repo.name}</h2>
                    <p>{repo.description || "No description available ;("}</p>
                    <div className="repo-info">
                        <span style={{backgroundColor: "#374151"}}>{repo.language || "None"}</span>
                        <span>
                            <i className="fa-solid fa-star"></i>
                            {repo.stargazers_count}
                        </span>
                        <span>
                            <i className="fa-solid fa-code-fork"></i>
                            {repo.forks_count}
                        </span>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </GreyBox>
            ))}
        </div>
    );
}

export default GreyBoxRepos;
