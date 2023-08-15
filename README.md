## Roommates!

Do you have roommates that you have trouble keeping tabs on? Is there a way you wish to communicate your roommates so they dont forget something you've mentioned? 

Welcome to the Roommates App! Were here you can communicate with roommates, and take care a list of things that will help keep communication in check!

Just click here to start your own Roommates room app! : [post link here]


### Features
- Create notes, a shopping list, chores, all for members to read and check off after completed.
- Chat system where you can communicate and relay messages to one another.
- A calendar to mark down vacation days or even movie nights at the house.

## Install
This app uses the MERN stack, (`MongoDB`, `Express.js, `React.js, and `Node.js). 
Please make sure you have met the necessary requirements in order to start the app creation process.

## Backend Engineering
- `fork` and `clone` [room-mates](https://github.com/Epaiva14/room-mates).
- Run `npm install` for all the necessary dependencies.
- install dotenv in your terminal, and create a .env file at the root to hold environment variables necessary for your backend server.

### Backend Code
This is a model for the room for all "Roommates".

```javascript
const mongoose = require('mongoose');

const roomDetailSchema = new mongoose.Schema({
    roomName: String,
    inviteCode: String,
    roommates: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    chores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chore' }],
    shoppingList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' }],
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    landlord: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rent: Number,
    rentDue: Date,
    rentPaid: Boolean,
}, { timestamps: true });

// create model
const RoomDetail = mongoose.model('RoomDetail', roomDetailSchema);

// export the model to be used
module.exports = RoomDetail;
```



## Frontend Engineering
- `fork` and `clone` [Roommates](https://github.com/Epaiva14/Roommates).
- repeat the same steps as above, and ensure both servers are running properly. 

## Frontend Code
Here we fetch from the database.

```javascript
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
```
With this data we are able to return and render to the webpage.

```javascript
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
```
## Wireframes
[Wireframes](src/app/components/images/Untitled-2023-08-08-2101.png)
[Entity Relationship Diagram](src/app/components/images/drawSQL-roomates-export-2023-08-15.png)

*****************

# Roadmap
- Figure out the chatsystem using Socket.io to have a live updating system.
- Home page needs to look cleaner, maybe simpler with dropdowns for Chores, Notes, and Shopping lists.
- Calendar needs to be implemented. It would be nice to have one page be the calendar, and responsive, and be able to add events to any day of the year. 
- Update profile page. 

** still a work in progress **


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

