import React, { useEffect, useState } from "react";
import { parseHtmlDocumentToReact } from "../hooks/parseHtmlDocumentToReact";


const IndexPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    const [active, setActive] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [swingIndex, setSwingIndex] = useState(0);

    useEffect(() => {
        fetch("https://docs.google.com/document/d/e/2PACX-1vTbdAkrlsuCnFKA2L0jDodU0wT7F4jkykK03Ak2ZwXXIAIAYQT1nAgGUI1vKCHHcIa8H3zSkdnedy7Z/pub")
        .then(res => res.text())
        .then(html => {
            const reactElement = parseHtmlDocumentToReact(html);
            setHtmlContent(reactElement);
        })
        .catch(error => console.error(error));
        
    },[]);

    useEffect(() => {
        const base = ["no-display","no-display","no-display",'', '',''];
        base[activeIndex] = "";
        base[3 + activeIndex] = "active";
        setActive(base);
    }, [activeIndex])

    useEffect(() => {
        const interval = setInterval(() => {
            setSwingIndex(prev => (prev + 1) % 2); // since you have 2 .swingers
        }, 5000);

        return () => clearInterval(interval); // cleanup on unmount
    }, []);




    return (
        <div id="mainPanel">
            <div className="landing">
                <img id='landing' alt="" src="icon.png" loading="lazy"/>
                <div className="heading">
                    <h1>Tuzimbe C^</h1>
                    <hr/>
                    <h3>From Blending to Unique constructions and management</h3>
                </div>
            </div>
            <div className="titles">
                <span className={active[3]} onClick={() => setActiveIndex(0)}>Introduction </span>
                <span className={active[4]} onClick={() => setActiveIndex(1)}>About Git </span>
                <span className={active[5]} onClick={() => setActiveIndex(2)}>Summary</span>
            </div>
            <div className="container">
                <div className={"intro" +active[0]}>
                    <img id="intro" alt="" src="icon.png" loading="lazy"/>
                    <div className="React-swing">
                        <div className={`swinger ${swingIndex === 0 ? "active" : ""}`}>
                            <h2>Tuzimbe Constructions</h2>
                            <hr/>
                            <p>Tuzimbe is a management system with levels of authorization and access.
                                This Management System spreads work down to the last worker there by 
                                making internal communition and report generation easier. 
                            </p>
                        </div>
                        <div className={`swinger ${swingIndex === 0 ? "active" : ""}`}>
                            <h2>TestingGit React</h2>
                            <hr/>
                            <p>
                                This Management System version is built using React while practicing use of 
                                project management technologies like <a href="https://git-scm.com">Git</a>, <a href="https://github.com/">GitHub</a>, <a href="https://app.circleci.com/" >CircleCi</a> and <a href="https://wwww.atlassian.com" >Jira</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"doc-content " +active[1]}>
                    {htmlContent ? htmlContent : <p> Loading...</p>}
                </div>
                <div id="paragraphs " className={active[2]}>
                    <h2>This index file explains and summarieses paragraphs of the above document which is sourced from <a href="https://docs.google.com/document/d/1otNipuD-PJ0DfebQUgoEiLYHUaPlCTCww7WfZbVcZWY/edit?usp=sharing">Document</a></h2>
                    <p> The First paragraph talks about what a Version Control System is and its use in recorvering projects</p>
                    <p>The second paragragh talks about git and diffrentiates it from the centralized control system.</p>
                    <p>What does a git repository cover?! This is what the third paragrapgh talks about</p>
                    <p> In the fourth paragrph, the use of references to navigate repositories is discussed</p>
                    <p>
                        As the fifth paragraph talks about working outside the develop branch, the sixth branch
                        talks about the internal working of git to work as a version control system.
                    </p>
                    <p>
                        The seventh paragraph tells how the blob changes when ealing with multiple branches.
                    </p>
                    <p>
                        The eighth paragraph shows how to create a branch locally
                    </p>
                    <p>
                        The ninth paragraph talks about the keywork "origin" and it's reference.
                    </p>
                    <p>
                        The tenth paragraph explains what a pull request is and its use to the repo owner
                    </p>
                    <p>
                        The eleventh paragraph talks about 'git rebase' and how it can be problematic. The sub-paragraph further talk about
                        how to use it and its commands
                    </p>
                    <p>
                        The visiul aids show the internal file structure of the objects used to manage the git system.
                        As the first image show the emergent objec relations with a single file branch, the second shows the intricate relationship as git groups common files to save space.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default IndexPage;