/**
 * SmartAutoFillEReward
 * 
 * This is used to deal with the boring and endless survey. You will never need to repeat clicking
 * your mouse to check the radios and checkbox. BE CAREFUL: this tool has no intelligence to understand
 * what's the question is. The only thing it does is randomly check a radio and always check a checkbox.
 * 
 * Only use it if 1) you don't need to understand the survey, 2) you don't care what your answers will be,
 * and 3) the outcome of the survey will not bring any damages.
 * 
 * How to install and use it:
 * 1) You must have a webserver that you can access it from public domain.
 * 2) Put this file in the web folder of the server.
 * 3) Create a browser bookmark in the computer where you want to use this tool, and copy and paste following
 *    to the URL box: 
 *    javascript:document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).setAttribute('src','<<Your web host address>>/SmartEReward.js');
 * 4) Click the bookmark when you need to use it.
 * 
 * Enjoy!
 * 
 **/

(function(){
	//console.clear();
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
	
	// process form in iframes:
	var iframeList = document.getElementsByTagName("iframe");
	for(jj=0;jj<iframeList.length;jj++){
		inputList = iframeList[jj].contentDocument.getElementsByTagName("input");
		radioNameList = [];
		
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
