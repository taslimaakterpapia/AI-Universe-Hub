const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaycard(data.data.tools));
  
};

const displaycard = cards => {
    const cardsContainer = document.getElementById('card-container');
    // cardsContainer.textContent= ' '; 

    // cards = cards.slice(0, 6);

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = ` 
   
    <div class="card p-4 ">

        <img src="${card.image}" class="card-img-top" alt="...">


        <div class="card-body pb-0 ">
            <p class="card-text fs-4 fw-bolder">Features</p>
            <p class="card-title">1. ${card.features[0]}</p>
            <p class="card-title">2. ${card.features[1]}</p>
            <p class="card-title">3. ${card.features[2]}</p> <hr>
            
        </div>
        

        
        <div class="d-flex justify-content-between align-items-center">

        
        <div>
            <p class="card-text fs-4 fw-bolder">${card.name}</p>
            <p class="card-text "><img class="pe-2 " src="images/vector.png"  alt="...">${card.published_in}</p>
         </div>


        <div class="arrow-btn ">

        <button type="button" class="btn btn-outline-light"><img class="pe-2 " src="images/Vector (1).png"  alt="..."></button>
            
         </div>
         </div>

         
    </div>
`;
        cardsContainer.appendChild(cardDiv);
    })
}

document.getElementById('btn-see-more').addEventListener('click', function(){
   console.log('btn work');

} )


loadData();
