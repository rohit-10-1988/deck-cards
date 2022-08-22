import React, { useEffect, useState } from 'react'
import axios from "axios";
import DisplayCard from '../displaycard/displaycard';
import DrawnCards from '../displaycard/drawncard';
const BASE_URL = "https://deckofcardsapi.com/api/deck/";
const DeckCard = () => {
    const [deck, setdeck] = useState(null)
    const [cardDrawn, setcardDrawn] = useState([])
    const [updatedcardDrawn, setcardupdatedcardDrawn] = useState([])
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () =>{
      const response = await axios.get(`${BASE_URL}/new/shuffle/`);
      setdeck(response.data)
    }

    const drawnCardlist = (id) =>{
        let cardd = cardDrawn.filter((val)=>{
          return val.id === id
        })
        let deleteitem = cardDrawn.filter((val)=>{
          return val.id !== id
        })
        setcardDrawn(deleteitem);
        setcardupdatedcardDrawn(previous =>  [...previous,cardd])
    }
    const  shuffleCard= async ()=>{
        let deckId = deck.deck_id;
        try {
          let cardUrl = `${BASE_URL}/${deckId}/draw/`;
          let resCard = await axios.get(cardUrl);
          if (!resCard.data.success) {
            throw new Error("No Cards Remaining");
          }
          let card = resCard.data.cards[0];
         setcardDrawn(previous => [...previous ,
              {
                id: card.code,
                image: card.image,
                name: `${card.suit} ${card.value}`,
                value: card.value
              }
              
            ]
            
          );
        } catch (err) {
          alert(err);
        }
    }
    return (
        <>
            <div className="Deck">
               <button className="deal-button" onClick={shuffleCard}>
                    Shuffle and Add to Deck
                </button>
                <div className="Cards">
                    <DisplayCard cardDrawn={cardDrawn} drawnCardlist={drawnCardlist}/>
                </div>
                <div className="new">
                    <DrawnCards updatedcardDrawn={updatedcardDrawn}/>
                </div>
            </div>
        </>
    )
}

export default DeckCard