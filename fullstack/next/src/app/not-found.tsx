'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '@/styles/not-found.module.css'

export default function NotFound() {
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const intervalsRef = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const type = (n: number, t: number) => {
                const codeElements = document.getElementsByTagName("code");
                
                if (codeElements && codeElements[n]) {
                    const element = codeElements[n];
                    const str = element.innerHTML.toString();
                    let i = 0;
                    element.innerHTML = "";
                    
                    const timeoutId = setTimeout(() => {
                        if (document.body.contains(element)) {
                            const intervalId = setInterval(() => {
                                if (!document.body.contains(element)) {
                                    clearInterval(intervalId);
                                    return;
                                }
                                
                                i++;
                                element.innerHTML = str.slice(0, i) + "|";
                                
                                if (i == str.length) {
                                    clearInterval(intervalId);
                                    element.innerHTML = str;
                                }
                            }, 10);
                            
                            intervalsRef.current.push(intervalId);
                        }
                    }, t);
                    
                    timeoutsRef.current.push(timeoutId);
                }
            };

            type(0, 0);
            type(1, 600);
            type(2, 1300);
        }, 100);

        return () => {
            timeoutsRef.current.forEach(id => clearTimeout(id));
            intervalsRef.current.forEach(id => clearInterval(id));
        };
    }, []);

    return (
        <div className={styles.container}>
            <p>HTTP: <span>404</span></p>
            
            <code><span>this_page</span>.<em>not_found</em> = true;</code>
            
            <code>
                <span>if</span> (<b>url_mal_escrita</b>) {'{'}<br/><br />
                    <span>    intentalo_de_nuevo();</span><br /><br />
                {'}'}
            </code>
            <code>
                <span>else if</span> (<b>hemos_metido_la_pata</b>) {'{'}
                <br/><br/>
                <span>    </span><em>alert</em>(<i>&quot;Intentelo mas tarde.&quot;</i>);
                <br/>
                <span>    </span><span>window</span>.<em>location</em> = home;
                <br/><br/>
                {'}'}
            </code>
            <center>
                <Link href="/" className={styles.homeLink}>HOME</Link>
            </center>
        </div>
    )
}