'use client';
import 'bulma/css/bulma.min.css';
import styles from './page.module.css';
import './css/home.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import handleLogout from './utils/handleLogout';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Layout from './components/layout';
import ChoreCard from './chores/ChoreCard';
import NoteCard from './notes/NoteCard';
import ShoppingList from './shoppinglist/ShoppingList';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slideshow from './components/Slideshow';
import { ReactDOM } from 'react-dom';

// we are going to be fetching data from our API and displaying it on
// the page

export default function Home() {
  // state is what the data is representing in realtime
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [chores, setChores] = useState(null);
  const [notes, setNotes] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [newChore, setNewChore] = useState({
    chore: '',
    dueDate: new Date(),
    assignee: '',
  });
  const [newNote, setNewNote] = useState({
    note: '',
    creator: '',
  });
  const [newShoppingItem, setNewShoppingItem] = useState({
    item: '',
    quantity: '',
    creator: '',
  });



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
          console.log('===> response', response);
          console.log('===> response.data', response.data);
          let userData = jwtDecode(localStorage.getItem('jwtToken'));
          console.log('===> userData', userData);

          if (userData.email === localStorage.getItem('email')) {
            console.log('===> email matches');
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
    fetchChoreData();
  }, []);

  useEffect(() => {
    fetchNoteData();
  }, []);

  useEffect(() => {
    fetchShoppingListData();
  }, []);

  //********************** chores */
  const fetchChoreData = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chores`)
      .then((res) => res.json())
      .then((chores) => {
        // data is an object
        setChores(chores.chore);
        console.log('===> chores', chores)
        setLoading(false);
      });

  }

  //*********************** notes */
  const fetchNoteData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notes`);
      const notes = await response.json();
      setNotes(notes.note);
      setLoading(false);
    } catch (error) {
      console.log('===> Error fetching data', error);
      setLoading(false);
    }
  };

  //*********************** shopping list */

  const fetchShoppingListData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/shoppingList`);
      const shoppingList = await response.json();
      setShoppingList(shoppingList.shoppingList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  //*********************** chores */
  const handleAddChore = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/chores`, newChore);
      const createdChore = response.data; // the newly created chore
      setChores([...chores, createdChore]); // add the chore to the existing chores
      setNewChore({
        chore: '',
        dueDate: new Date(),
        assignee: '',
      });
    } catch (error) {
      console.error('Error adding chore:', error);
    }
  };

  //*********************** notes */
  const handleAddNote = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/notes`, newNote);
      const createdNote = response.data; // the newly created note
      setNotes([...notes, createdNote]); // add the note to the existing notes
      setNewNote({
        note: '',
        creator: '',
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  //*********************** shopping list */
  const handleAddShoppingItem = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/shoppingList`, newShoppingItem);
      const createdShoppingItem = response.data; // the newly created shopping item
      setShoppingList([...shoppingList, createdShoppingItem]); // add the shopping item to the existing shopping items
      setNewShoppingItem({
        item: '',
        quantity: '',
        creator: '',
      });
    } catch (error) {
      console.error('Error adding shopping item:', error);
    }
  };



  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data shown...</p>;
  if (!chores) return <p>No chores shown...</p>;
  if (!notes) return <p>No notes shown...</p>;
  if (!shoppingList) return <p>No shopping list shown...</p>;

  let choresList = null;
  if (chores) {
    choresList = chores.map((chore) => (
      <div className="column" key={chore._id}>
        <ChoreCard chore={chore} />
      </div>
    ));
  }

  let notesList = null;
  if (notes) {
    notesList = notes.map((note) => (
      <div className="column" key={note._id}>
        <NoteCard note={note} />
      </div>
    ));
  }

  let shoppingListItems = null;
  if (shoppingList) {
    shoppingListItems = shoppingList.map((shoppingItem) => (
      <div className="column" key={shoppingItem._id}>
        <ShoppingList shoppingList={shoppingItem} />
      </div>
    ));
  }



  return (
    <>
      <Layout />
      <section className="hero is-primary is-fullheight heroSection">
        <div className="hero-body">
          <Slideshow />
          <div className="container">

            <h1 className="title">
              Welcome Roommate!
            </h1>
            <h2 className="subtitle">
              This is the home page
            </h2>

          </div>

        </div>
      </section>
      <section className="section choreSection">
        <div className="container">
          <h1 className="title">Chores</h1>
          <form>
            <input className='choreInput' type="text" placeholder="Chore" value={newChore.chore} onChange={(event) => setNewChore({ ...newChore, chore: event.target.value })} /> <br />
            <input className='choreAssignee' type="text" placeholder="Assignee" value={newChore.assignee} onChange={(event) => setNewChore({ ...newChore, assignee: event.target.value })} /> <br />
            <input className='choreDate' type="date" placeholder="Due Date" value={newChore.dueDate} onChange={(event) => setNewChore({ ...newChore, dueDate: event.target.value })} />
            <button className="button is-primary choreButton" onClick={handleAddChore} type='submit'>Add Chore</button>
          </form>

          <Carousel showThumbs={false}>
            <div className="columns is-mobile is-centered">
              {choresList}
            </div>
          </Carousel>
        </div>
      </section>

      <section className="section noteSection">
        <div className="container">
          <h1 className="title">Notes</h1>
          <form>
            <input className='choreInput' type="text" placeholder="Note" value={newNote.note} onChange={(event) => setNewNote({ ...newNote, note: event.target.value })} /> <br />
            <input className='choreAssignee' type="text" placeholder="Creator" value={newNote.creator} onChange={(event) => setNewNote({ ...newNote, creator: event.target.value })} /> <br />
            <button className="button is-primary choreButton" onClick={handleAddNote} type='submit'>Add Note</button>
          </form>

          <Carousel showThumbs={false}>
            <div className="columns">
              {notesList}
            </div>
          </Carousel>
        </div>
      </section>

      <section className="sectio shoppingSection">
        <div className="container">
          <h1 className="title">Shopping List</h1>
          <form>
            <input className='choreInput' type="text" placeholder="Item" value={newShoppingItem.item} onChange={(event) => setNewShoppingItem({ ...newShoppingItem, item: event.target.value })} /> <br />
            <input className='choreInput' type="text" placeholder="Quantity" value={newShoppingItem.quantity} onChange={(event) => setNewShoppingItem({ ...newShoppingItem, quantity: event.target.value })} /> <br />
            <input className='choreInput' type="text" placeholder="Creator" value={newShoppingItem.creator} onChange={(event) => setNewShoppingItem({ ...newShoppingItem, creator: event.target.value })} /> <br />
            <button className="button is-primary choreButton" onClick={handleAddShoppingItem} type='submit'>Add Shopping Item</button>
          </form>

          <Carousel showThumbs={false}>
            <div className="columns">
              {shoppingListItems}
            </div>
          </Carousel>
        </div>
      </section>


    </>
  );
}

