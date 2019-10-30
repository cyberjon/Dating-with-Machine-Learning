d3.json("Summ_adj.json").then(function(defaultData) {
	chg();
})

function chg() {
	let sel = document.getElementById('selAdj');
	let strAdj = (sel.options[sel.selectedIndex].value);
	d3.json("Summ_adj.json").then(arrData => {
		console.log(arrData);
		arrData.forEach(obj => {
			Object.entries(obj).forEach(([key, value]) => {
				if (value === strAdj) {
					console.log(obj);
					buildPlots(obj);
				} 
			})
		})
	})
}

function buildPlots(obj) {	
	let sel = document.getElementById('selDim');
	let strDim = (sel.options[sel.selectedIndex].value);

	let arrX = [];
	let arrY = [];
	Object.entries(obj).forEach(([key, value]) => {
		if (key.includes(strDim + ":")) {
			arrX.push(key);
			arrY.push(parseInt(value));
		}
	})

	arrChartData = [{
		y : arrY,
		x : arrX,
		type: 'bar'
	}];

	let dictLayout = {
		title: "DataMate Query Results"
	}

	Plotly.react("plot", arrChartData, dictLayout);
}