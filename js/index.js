const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaycard(data.data.tools));
  
};


loadData();
