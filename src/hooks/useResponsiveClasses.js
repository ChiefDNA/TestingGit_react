import { useEffect } from "react";


export default function useResponsiveClasses(configs =[]){
    useEffect(() => {

        const applyResponsiveClasses = () => {
            configs.forEach(({elements, className, maxWidth }) => {
                elements.forEach(el => {
                    if (!el) return;
                    if(window.outerWidth <+ maxWidth) {
                        el.classList.remove(className);
                    } else {
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