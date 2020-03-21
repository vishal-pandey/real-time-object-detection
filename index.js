async function startVideo(){
	const video = document.querySelector('#video')
	navigator.getUserMedia(
		{
			video: {}
		},
		stream => video.srcObject = stream,
		err => console.error(err)
	)
}



window.onload = ()=>{
	
	startVideo()
	const c = document.querySelector("#canvas")
	var ctx = c.getContext("2d");



	cocoSsd.load().then(model => {

		startVideo().then(
			setInterval(()=>{
				var h = document.querySelector("#video").videoHeight
				var w = document.querySelector("#video").videoWidth

				document.querySelector(".content").style.height = h+"px"
				document.querySelector(".content").style.width = w+"px"
				
				ctx.clearRect(0, 0, c.width, c.height)
			    model.detect(video).then(predictions => {
					// console.log('Predictions: ', predictions);
					// console.log(video)
					for(var i of predictions){
						ctx.strokeStyle = "blue";
						ctx.beginPath();
						ctx.lineWidth = 3;
						ctx.rect(i['bbox'][0], i['bbox'][1], i['bbox'][2], i['bbox'][3])
						ctx.font = "18px Comic Sans MS";
						ctx.fillStyle = "blue";
						ctx.fillText(i['class']+ " " + Math.round(i['score'] * 100)+"%", i['bbox'][0], i['bbox'][1]-5);
						ctx.stroke();
					}
			    });
			}, 500)
		)

  	});

}