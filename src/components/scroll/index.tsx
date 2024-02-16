import { useEffect, useState } from 'react';
import './style.scss'


export default function Scroll({ url }: { url: string }) {

    const [data, setData] = useState<{ title: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scrollPercentage, setScrollPercentage] = useState(0);


    useEffect(() => {

        fetchData(url);
    }, [url]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scrollPercentage]);

    function handleScroll() {


        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        console.log(document.body.scrollTop,
            document.documentElement.scrollTop,
            document.documentElement.scrollHeight,
            document.documentElement.clientHeight,
            howMuchScrolled,
            height);
        setScrollPercentage((howMuchScrolled / height) * 100);
    }

    async function fetchData(url: string) {
        try {

            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.products && data.products.length > 0)
                setData(data.products);

        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    //console.log(loading);
    //console.log(data);

    return (
        <>
            <h1 className='page-title'>Custom scroll indicator</h1>
            <div className='scroll-progress'>
                <div className='current-scroll-progress' style={{ width: `${scrollPercentage}%` }}></div>
            </div>
            <div className='data-container'>
                {data && data.length > 0 ? data.map((item, index) => <p key={index}>{item.title}</p>) : null}
            </div>
        </>
    )
}