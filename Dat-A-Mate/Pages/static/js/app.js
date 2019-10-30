// define "debug" function--throws audit msgs to browser console
function debug(strMsg, thing) {
    console.log(`${intDebugCount++}) ${strMsg}`);
    if (thing !== undefined) { console.log(thing); }
}

// from data.js. Let's use LETs instead of VARs.
let intDebugCount = 1;
debug("declared variables");

// YOUR CODE HERE!
// declare variable for the "Filter Table" button
let btnFilter = d3.select("#filter-btn");
debug("captured Filter button");

// declare handler for the "Filter Table" button
btnFilter.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    let inpUsername = d3.select("#Username");
    let inpCity = d3.select("#City");
    let inpMaritial = d3.select("#Maritial");
    let inpDrugs = d3.select("#drugs");
    let inpHair = d3.select("#hair");
    let inpEye = d3.select("#eye");
    let inpCar = d3.select("#car");
    let inpChildren = d3.select("#children");
    let inpRelationship = d3.select("#relationship");
    let inpAmbitious = d3.select("#ambitious");
    let inpPets = d3.select("#pets");
    let inpLanguage = d3.select("#language");
    debug("captured inputboxes");
    debugger;
    // Get the value property of the input element
    let strUsername = inpUsername.property("value").toLowerCase();
    let strCity = inpCity.property("value").toLowerCase();
    let strMaritial = inpMaritial.property("value").toLowerCase();
    let strDrugs = inpDrugs.property("value").toLowerCase();
    let strHair = inpHair.property("value").toLowerCase();
    let strEye = inpEye.property("value").toLowerCase();
    let strCar = inpCar.property("value").toLowerCase();
    let strChildren = inpChildren.property("value").toLowerCase();
    let strRelationship = inpRelationship.property("value").toLowerCase();
    let strAmbitious = inpAmbitious.property("value").toLowerCase();
    let strPets = inpPets.property("value").toLowerCase();
    let strLanguage = inpLanguage.property("value").toLowerCase();
    debug("captured criteria");

    // Use the form input to filter by form data
    let arrMatch = data;

    if (strUsername !== "") { arrMatch = arrMatch.filter(itm => itm.username == strUsername); }
    if (strCity !== "") { arrMatch = arrMatch.filter(itm => itm.city == strCity); }
    if (strMaritial !== "") { arrMatch = arrMatch.filter(itm => itm.Marital == strMaritial); }
    if (strDrugs !== "") { arrMatch = arrMatch.filter(itm => itm.Drugs == strDrugs); }

    if (strHair !== "") { arrMatch = arrMatch.filter(itm => itm.Hair == strHair); }

    if (strEye !== "") { arrMatch = arrMatch.filter(itm => itm.Eye == strEye); }
    if (strCar !== "") { arrMatch = arrMatch.filter(itm => itm.Car == strCar); }
    if (strChildren !== "") { arrMatch = arrMatch.filter(itm => itm.Children == strChildren); }
    if (strRelationship !== "") { arrMatch = arrMatch.filter(itm => itm.Realtionship == strRelationship); }
    if (strAmbitious !== "") { arrMatch = arrMatch.filter(itm => itm.Ambitious == strAmbitious); }
    if (strPets !== "") { arrMatch = arrMatch.filter(itm => itm.Pets == strPets); }
    if (strLanguage !== "") { arrMatch = arrMatch.filter(itm => itm.Language == strLanguage); }
    debug("created filtered array", arrMatch);
    let tbodCurr = document.getElementById("date-table-body");
    let tbodBlank = document.createElement("tbody");
    tbodCurr.parentNode.replaceChild(tbodBlank, tbodCurr);
    tbodBlank.id = "date-table-body";
    debug("cleared tbod contents", tbodBlank);
    let tbod = d3.select("#date-table").select("tbody");
    arrMatch.map(itm => {
        let tr = tbod.append("tr");
        tr.append("td").text(itm.Username);
        tr.append("td").text(itm.City);
        tr.append("td").text(itm.Marital);
        tr.append("td").text(itm.Drugs);
        tr.append("td").text(itm.Hair);
        tr.append("td").text(itm.Eye);
        tr.append("td").text(itm.Car);
        tr.append("td").text(itm.Children);
        tr.append("td").text(itm.Relationship);
        tr.append("td").text(itm.Ambitious);
        tr.append("td").text(itm.Pets);
        tr.append("td").text(itm.Language);
        debug(`added table row ${itm}`, tr);
    });
});