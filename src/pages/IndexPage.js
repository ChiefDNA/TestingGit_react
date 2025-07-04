import React, { useEffect, useRef, useState } from "react";
import { parseHtmlDocumentToReact } from "../hooks/parseHtmlDocumentToReact";
import useResponsiveClasses from "../hooks/useResponsiveClasses";
import Skeleton from "react-loading-skeleton";
import GenerateComponent from "../components/GenrateComponent";


const IndexPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    const [active, setActive] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [swingIndex, setSwingIndex] = useState(0);
    const [summary, setSummary] = useState([]);

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
        fetch("/assets/content/homepage.json")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.summary)) {
                setSummary(data.summary);
            }
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

    const responsiveRefs = useRef([]);

    useResponsiveClasses([
        {
            elements: responsiveRefs.current.filter(Boolean),
            className: 'responsive',
            maxWidth: 600,
            initial: false
        }
    ])


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
            <div className="titles" ref={(el) => (responsiveRefs.current[0] = el)}>
                <span className={active[3]} onClick={() => setActiveIndex(0)}>Introduction </span>
                <span className={active[4]} onClick={() => setActiveIndex(1)}>About Git </span>
                <span className={active[5]} onClick={() => setActiveIndex(2)}>Summary</span>
            </div>
            <div className="container" ref={(el) => (responsiveRefs.current[1] = el)}>
                <div className={"intro " +active[0]}>
                    <img id="intro" alt="" src="assets/images/logoBlend.png" loading="lazy"/>
                    <div className="React-swing">
                        <div className={`swinger ${swingIndex === 0 ? "active" : ""}`}>
                            <h2>Tuzimbe Constructions</h2>
                            <hr/>
                            <p>Tuzimbe is a management system with levels of authorization and access.
                                This Management System spreads work down to the last worker there by 
                                making internal communition and report generation easier. 
                            </p>
                        </div>
                        <div className={`swinger ${swingIndex === 1 ? "active" : ""}`}>
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
                    {htmlContent ? ( htmlContent ) : (
                    Array.from({length:7}).map((_, idx) => (
                    <GenerateComponent key={idx} className="c2" props={{style:{width:'80%'}}} tag="p">
                        <Skeleton count={4} animation="pulse"/>
                    </GenerateComponent>
                )))}
                </div>
                <div id="paragraphs" className={active[2]}>
                    <h2>This section file explains and summarieses paragraphs of the above document which is sourced from <a href="https://docs.google.com/document/d/1otNipuD-PJ0DfebQUgoEiLYHUaPlCTCww7WfZbVcZWY/edit?usp=sharing">Document</a></h2>
                    {summary.length > 0? (
                        summary.map((item, idx) => (
                            <GenerateComponent key={idx}
                            tag={item.tag}
                            >
                                {item.content}
                            </GenerateComponent>
                            )
                        )
                    ) : (
                    Array.from({length:3}).map((_, idx) => (
                    <GenerateComponent key={idx} tag="p">
                        <Skeleton count={3} />
                    </GenerateComponent>
                )))}
                </div>
            </div>
        </div>
    );
}

export default IndexPage;