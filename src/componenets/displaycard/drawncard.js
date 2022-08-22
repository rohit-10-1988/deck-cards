import React,{useEffect,useState} from 'react'


const DrawnCards = (props) =>{
    const [sortdeckCards,setsortdeckCards]=useState([])
    useEffect(()=>{
        
        let cardName = props.updatedcardDrawn.map((v)=>{
            return {name: v[0].name, image: v[0].image, value: v[0].value} 
        })
        if(props.updatedcardDrawn.length > 0){
            setsortdeckCards(cardName.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })));
        }
        
    },[props.updatedcardDrawn])
return (
    <>
        {sortdeckCards.map((card,index)=>{
            return <img key={index} 
            src={card.image}
            alt={card.name}/>
        })}
        
    </>
    )
}

export default DrawnCards