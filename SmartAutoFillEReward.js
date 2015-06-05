(function(){
	console.clear();
	//console.info("SmartEReward Start");
	
	var inputList = document.getElementsByTagName("input");
	var radioNameList = [];
	var radioList;
	var i, jj, myselect;
	
	for(i=0;i<inputList.length;i++) {
		//console.info(inputList[i])
		if(inputList[i].getAttribute("type").toLowerCase() == "radio" && !ArrayContains(radioNameList, inputList[i].getAttribute("name"))) {
			radioNameList.push(inputList[i].getAttribute("name"));
        } else if(inputList[i].getAttribute("type").toLowerCase() == "checkbox") {
            inputList[i].setAttribute("checked", "checked");
        }
	}
	
	for(i=0;i<radioNameList.length;i++){
		//console.info(radioNameList[i])
		radioList = document.getElementsByName(radioNameList[i]);
		
		myselect = Math.round(Math.random()*1000) % radioList.length;
		radioList[myselect].setAttribute("checked", "checked");
		radioList[myselect].click();
	}
	
	// process form in iframe:
	var iframeList = document.getElementsByTagName("iframe");
	for(jj=0;jj<iframeList.length;jj++){
		inputList = iframeList[jj].contentDocument.getElementsByTagName("input");
		radioNameList = [];
		
		for(i=0;i<inputList.length;i++) {
			//console.info(inputList[i])
			if(inputList[i].getAttribute("type").toLowerCase() == "radio" && !ArrayContains(radioNameList, inputList[i].getAttribute("name"))) {
				radioNameList.push(inputList[i].getAttribute("name"));
			}
		}
		
		for(i=0;i<radioNameList.length;i++){
			//console.info(radioNameList[i])
			radioList = iframeList[jj].contentDocument.getElementsByName(radioNameList[i]);
			
			myselect = Math.round(Math.random()*1000) % radioList.length;
			radioList[myselect].setAttribute("checked", "checked");
			radioList[myselect].click();
		}
	}
})();

function ArrayContains(arr, elm) {
	var i;
	for(i=arr.length-1;i>=0;i--){
		if(arr[i] == elm) return true;
	}
	return false;
}
