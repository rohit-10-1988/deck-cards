import React from 'react'

const DisplayCard = (props) =>{

const drawncard = (id) =>{
    props.drawnCardlist(id)
}
return (
    <>
    {props.cardDrawn.map((card,index)=>{
        return <img key={index} className="Card"
        src={card.image}
        alt={card.name}
        onClick={()=>drawncard(card.id)}
        />
        
    })}
    {props.cardDrawn.length > 0 ? <p>Click on the card to draw it</p> : null}
    </>
)
}

export default DisplayCard