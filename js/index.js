const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaycard(data.data.tools.slice(0,6)));

};


// --------------- sort---------------------

 const sortToolsByDate = (tools) => {
  tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
}

const displaycard = (cards) => {
    const cardsContainer = document.getElementById('card-container');
    
// ------------------------------------------------------- 
    // cards = cards.slice(0, 6);

    cardsContainer.innerText = '';
    // Button Sort
    document.getElementById('sort-by-date').addEventListener('click', function(){
      sortToolsByDate(cards);
      displaycard(cards);
    });
    // button sort end//



  const showMoreBtn = document.getElementById('show-details')

  if (cards.length <= 6) {
    
    showMoreBtn.classList.remove('d-none')
  }
  else {
    showMoreBtn.classList.add('d-none')

  }


     
// ----------------------------------------------------------
    cards.forEach(card => {
      console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = ` 
   
    <div class="card p-4 ">

        <img src="${card.image}" class="card-img-top" alt="...">


        <div class="card-body pb-4 ">
            <p class="card-text fs-4 fw-bolder">Features</p>
            <p class="card-title">1. ${card.features[0]}</p>
            <p class="card-title">2. ${card.features[1]}</p>
            <p class="card-title">3. ${card.features[2]}</p>

            </div>
            <div class="card-footer pt-4 d-flex justify-content-between align-items-center ">
                <div >
                   <div>
                      <h3 class="fs-3">${card.name}</h3>
                    </div>
                
                    <div>
                       <p><i class="fa-solid bold fa-calendar-days pe-2"></i> ${card.published_in}</p>
                    </div>
                </div>


                    <div>
                     <button type="button" class="btn btn-light"> <i style="color: #EB5757 !important;" class="fa-solid fa-arrow-right " onclick="cardModal('${card.id}')"
                      data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#extraLargeModal"></i></button>
                    </div>
                
              
            </div>
            
        </div>
         
       

         
    </div>
`;
        cardsContainer.appendChild(cardDiv);
    });

    toggleSpinner(false);

}

// -------------------------spinner---------------------

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById('spinner');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none')
  }
};


















        // ------------------------------model-----------------------





const cardModal = (id) => {

    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayModal(data))



}

const displayModal = (data) => {

    console.log(data.data.features);

    const cardModal = document.getElementById('card-modal');
    const person = data.data.features
    const propertyValues = Object.values(person);

    cardModal.innerHTML = `
  
  
    <div class="container text-center p-4 ">
  <div class="row align-items-start gap-2">
    <div  class="col">
    <div id="left-side" class="border border-danger-subtle rounded height: 80%">
    <h5 class="card-title fw-bold mt-4 fs-2 text-start px-4">${data.data.description} </h5>
    <div class="d-flex justify-content-between align-items-center px-5  fs-5 gap-5 mt-4">
      <p id="pricing-box" class="text-success border border fw-bold rounded ">${data.data.pricing[0].price}<br> ${data.data.pricing[0].plan}</p>
      <p id="pricing-box" class="text-warning-emphasis border border fw-bold rounded">${data.data.pricing[1].price}<br> ${data.data.pricing[1].plan}</p>
      <p id="pricing-box" class="text-danger border border fw-bold rounded">${data.data.pricing[2].price}<br> ${data.data.pricing[2].plan}</p>
    </div>
  
  
    <div class="d-flex justify-content-between mt-2 ">
  
  
  <div>
  <h1 class="fw-bold text-start px-3 ">features</h1>
  <div class="text-start px-4">
  <li>${propertyValues[0].feature_name ? propertyValues[0].feature_name : 'Not Available'}</li>
  <li>${propertyValues[1].feature_name ? propertyValues[1].feature_name : 'Not Available'}</li>
  <li>${propertyValues[2].feature_name ? propertyValues[2].feature_name : 'Not Available'}</li>
  </div>
  
  </div>
  
  
  <div class="px-3">
  <h1 class="fw-bold">integrations</h1>
  <ul class="text-start">
  <li >${data.data.integrations[0] ? data.data.integrations[0] : 'Not Available'}</li>
  <li >${data.data.integrations[1] ? data.data.integrations[1] : 'Not Available'}</li>
  <li>${data.data.integrations[2] ? data.data.integrations[2] : 'Not Available'}</li>
  </ul>
  
  </div>
  </div>
  </div>
  </div>
    <div class="col">
    <div id="right-side" class="card p-4 ">
    <button class="btn btn-danger position-absolute top-10 end-0 mt-2 me-5">${data.data.accuracy.score ===0? 'none' : 'block'?  data.data.accuracy.score * 100 : ''}% accuracy</button>
    <img src="${data.data.image_link[0]}" class="card-img-top" alt="...">
    <div class="card-body">
    ${
      data.data?.input_output_examples
        ? `<h4>${data.data?.input_output_examples[0]?.input}</h4>`
        : "Can you give any example?"
    }
    <br>
  
    ${
      data.data?.input_output_examples
        ? `${data.data?.input_output_examples[0]?.output}`
        : "No! Not Yet! Take a break!!!"
    }
    
      
  </div>
  </div>
  
  
      
    </div>
      </div>
    </div>
  </div>
  </div>
  
    `



}


// -------------------------------------- See More Button -------------------------

const btnShow = ()=>{
  toggleSpinner(true);
  
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then((res) => res.json())
  .then((data) => displaycard(data.data.tools))
  // const showBtn = document.getElementById('btn-show')
  // showBtn.innerHTML = '';
}

document.getElementById('btn-see-more').addEventListener('click', function (){
 
  btnShow();
  

})

loadData();
