'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/not-found.module.css'

export default function NotFound() {
    useEffect(() => {
        const type = (n: number, t: number) => {
            const codeElements = document.getElementsByTagName("code");
            if (codeElements && codeElements[n]) {
                const str = codeElements[n].innerHTML.toString();
                let i = 0;
                codeElements[n].innerHTML = "";

                setTimeout(() => {
                    const se = setInterval(() => {
                        i++;
                        codeElements[n].innerHTML = str.slice(0, i) + "|";
                        if (i == str.length) {
                            clearInterval(se);
                            codeElements[n].innerHTML = str;
                        }
                    }, 10);
                }, t);
            }
        };

        type(0, 0);
        type(1, 600);
        type(2, 1300);
    }, []);

    return (
            <div className={styles.container}>
                <p>HTTP: <span>404</span></p>
                
                <code><span>this_page</span>.<em>not_found</em> = true;</code>
                
                <code>
                    <span>if</span> (<b>url_mal_escrita</b>) {'{'}<br/><br />
                        <span>    intentalo_de_nuevo();</span><br /><br />
                    {'}'}
                {/* </code> */}
                {/* <code> */}
                    <span> else if</span> (<b>hemos_metido_la_pata</b>) {'{'}
                    <br/><br/>
                    <span>    </span><em>alert</em>(<i>"Intentelo mas tarde."</i>);
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
