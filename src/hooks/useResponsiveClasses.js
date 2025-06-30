import { useEffect } from "react";


export default function useResponsiveClasses(configs =[]){
    useEffect(() => {

        const applyResponsiveClasses = () => {
            configs.forEach(({elements, className, maxWidth, initial }) => {
                elements.forEach(el => {
                    if (!el) return;
                    const trigger = (window.outerWidth <= maxWidth)? true : false;
                    if((trigger&&initial) || (!trigger&&!initial)) {
                        el.classList.remove(className);
                    } else if((trigger&&!initial) || (!trigger&&initial)){
                        el.classList.add(className);
                    }
                });
            });
            //for sidebar responsiveness
            
        };

        window.addEventListener('resize', applyResponsiveClasses);
        applyResponsiveClasses(); // run on mount

        return () => {
            window.removeEventListener('resize', applyResponsiveClasses);
        };
    }, [configs]);
}