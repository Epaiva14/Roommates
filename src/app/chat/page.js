'use client';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import handleLogout from '../utils/handleLogout';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Layout from '../components/layout';
import ChatRoom from '../chat/ChatRoom';
import ChatPage from './ChatData';
import Link from 'next/link';

// render chat page here
export default function Chat() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [chatRooms, setChatRooms] = useState([]);
    const [isLoading, setLoading] = useState(false);

    //********************** expiration to log user out */
    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime >= expirationTime) {
            handleLogout();
            router.push('/users/login');
        }
    }
    //********************** authorizes user's email */
    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)

                .then(response => {
                    // console.log('===> response', response);
                    // console.log('===> response.data', response.data);
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    // console.log('===> userData', userData);

                    if (userData.email === localStorage.getItem('email')) {
                        // console.log('===> email matches');
                        setData(userData);
                        setLoading(false);
                    } else {
                        console.log('===> email does not match');
                        router.push('/users/login');
                    }
                })
                .catch(error => {
                    console.log('===> Error', error);
                    // router.push('/users/login');
                });
        } else {
            router.push('/users/login');
        }
    }, [router]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/chatRoom`)
            .then(response => {
                console.log('===> response', response);
                console.log('===> response.data', response.data);

                setChatRooms(response.data.chatRoom);
            })
            .catch(error => {
                console.error('Error fetching chat rooms:', error);
            });
    }, []);

    if (isLoading) return <div>Loading...</div>;


    return (
        <Layout>
            <div className='chat'>
                <h1>Chat Rooms</h1>
                <ul>
                    {chatRooms.map(chat => (
                        <li key={chat._id}>
                            <Link href={`/chat/singleChat?roomId=${chat._id}`}>
                                <h1>{chat.roomName}</h1>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}