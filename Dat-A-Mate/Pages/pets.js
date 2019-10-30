d3.csv("Summ_pets.csv").then(function(petData) {
    console.log(petData); 

    let arrPets = [];
    let arrPetcount = [];
    petData.forEach(function(data) {
        Object.entries(data).forEach(([key, value]) => {
            if (key === "pets") {
                arrPets.push(value);
            }
            else if (key === "count") {
                arrPetcount.push(value);
            }
            
        });
    });

    //console.log(arrPets);
    //console.log(arrPetnums);
    let data = [
        {
            labels : arrPets,
            values : arrPetcount,
            type :'pie'
        }
    ];

    let layout = {
        title: "Do you have a Pet?",
        height: 500,
        width: 600
      };

    Plotly.newPlot('plot', data, layout);

})