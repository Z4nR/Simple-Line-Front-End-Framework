document.getElementById('output').style.visibility = 'hidden';
		document.getElementById('celInput').addEventListener
		('input', function(e){
			document.getElementById('output').style.visibility = 'visible';
			let celcius = e.target.value;
			document.getElementById('fahOutput').innerHTML 
			= 32+(9/5)*celcius;
			document.getElementById('kelOutput').innerHTML 
			= 237+celcius*1;
			document.getElementById('reaOutput').innerHTML 
			= (4/5)*celcius;
		});