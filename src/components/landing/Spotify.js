'use client'

import React, { useEffect, useState } from 'react'
import Container from '../common/Container'
import Image from 'next/image'

const Spotify = () => {
    const [song, setSong] = useState(null)

    useEffect(() => {
        let isMounted = true;

        const fetchSong = async () => {
            try {
                const res = await fetch('/api/spotify')
                if (!res.ok) {
                    throw new Error('Failed to fetch Spotify data')
                };
                const data = await res.json()
                if (isMounted) setSong(data)

            } catch (error) {
                console.error("Error fetching Spotify data", error)
            }
        }

        fetchSong()

        const interval = setInterval(fetchSong, 50000)

        return () => {
            isMounted = false;
            clearInterval(interval)
        }
    }, []);

    const isOffline = !song || !song.isPlaying;

    if (isOffline) {
        return (
            <Container className={''}>
                <Image src={'/spotify.svg'} alt='Spotify' width={48} height={48} className='rounded-md shrink-0' />

                <div className='flex flex-col min-w-0'>
                    <p className='text-secondary font-semibold text-sm truncate'>Offline</p>
                    <p className='text-secondary text-xs truncate'>Not currently listening</p>
                    <p className='text-secondary text-xs truncate'>Music Activity unavailable</p>
                </div>
            </Container>
        )
    }

    return (
        <Link href={song.spotifyUrl} target='_blank'>
            <Container className={''}>
                <Image src={song.albumImageUrl}/>

            </Container>
        </Link>
    )
}

export default Spotify


const Play = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 256 256"
        >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48.24-94.78-64-40A8,8,0,0,0,100,88v80a8,8,0,0,0,12.24,6.78l64-40a8,8,0,0,0,0-13.56ZM116,153.57V102.43L156.91,128Z"></path>
        </svg>
    )
}