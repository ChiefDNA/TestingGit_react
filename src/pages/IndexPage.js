import React from "react";


const IndexPage = () => {

    return (
        <div id="mainPanel">
            <div id="paragraphs">
                <h2>This index file explains the paragraphs of this <a href="https://docs.google.com/document/d/1otNipuD-PJ0DfebQUgoEiLYHUaPlCTCww7WfZbVcZWY/edit?usp=sharing">Document</a></h2>
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
    );
}

export default IndexPage;