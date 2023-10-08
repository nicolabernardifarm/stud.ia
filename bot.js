function promptAI(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://studia.openai.azure.com/openai/deployments/studIA1/extensions/chat/completions?api-version=2023-08-01-preview');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('api-key', '{API_KEY}');

    let prompt = document.getElementById("inputPrompt").value;

    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            console.log(this.responseText);
            r = JSON.parse(this.responseText);
            res = r.choices[0].message.content;
            
            quotes = JSON.parse(r.choices[0].message.context.messages[0].content);
            quotes = quotes.citations;
            list = "<ol>";
            quotes.forEach(element => {
                list += "<li><a href='" + element.url + "'>"+element.title+"</li>";
            });
            document.getElementById("answer").innerHTML = res.replace(/\[doc\d+\]/g, function(match){res1=match.replace("[doc","<span style='vertical-align:super;font-size:60%;>");return res1.replace("]","</span>");});
            document.getElementById("question").innerHTML = prompt;
            document.getElementById("result").style.visibility = "visible";
            document.getElementById("references").innerHTML = list;

            //generate references
            
        }
    }

    xhr.send(JSON.stringify({
        "dataSources": [
            {
            "type": "AzureCognitiveSearch",
            "parameters": {
                "endpoint": "https://{INSTANCE_ID}.search.windows.net",
                "key": "{SEARCH_API_KEY}",
                "indexName": "{INDEX_NAME}"
            }
            }
        ],
        "messages": [{
            "role": "user",
            "content": prompt
            }]
    }));
}

//"Please provide me a comprehensive summary of what is open innovation"


function quiz(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://studia.openai.azure.com/openai/deployments/studIA1/extensions/chat/completions?api-version=2023-08-01-preview');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('api-key', '{API_KEY}');

    let prompt = "generate a quiz with 15 to 20 multiple choice questions about how to cross the chasm.";

    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            console.log(this.responseText);
            r = JSON.parse(this.responseText);
            res = r.choices[0].message.content;
            res = res.replace(/\[doc\d+\]/g, ""); 
            questions = res.split(/\b\d+\./g);
            questions.shift(); //remove first element which is an introductory thing by chatgpt
            form = "<form>";
            counter = 1;
            questions.forEach(element => {
                element = element.replace(/Answer: [a-z]/g, " ");
                parts = element.split(/\b[a-zA-Z]\./g);
                form += "<p><b>" + parts[0] + "</b></p>";
                parts.shift();
                counterinternal = 1;
                parts.forEach(answer =>{
                    form += "<input type='radio' name='option"+counter+"' value='"+counterinternal+"' id='q"+counter+"-"+counterinternal+"'><label for='q"+counter+"-"+counterinternal+"'>&nbsp;"+$.trim(answer)+"</label><br>";
                    counterinternal++;
                })
                /*form += "<input type='radio' name='option1' value='A' id='q"+counter+"-A'><label for='q"+counter+"-A'>"+parts[1]+"</label><br>";
                form += "<input type='radio' name='option1' value='B' id='q"+counter+"-B'><label for='q"+counter+"-B'>"+parts[2]+"</label><br>";
                form += "<input type='radio' name='option1' value='C' id='q"+counter+"-C'><label for='q"+counter+"-C'>"+parts[3]+"</label><br>";
                form += "<input type='radio' name='option1' value='D' id='q"+counter+"-D'><label for='q"+counter+"-D'>"+parts[4]+"</label><br><hr/>";*/
                form += "<hr/>";
                counter++;
            });
            form += "<button type=\"submit\" style=\"margin-left:15%;width:70%;\" class=\"btn btn-primary\">Correct my quiz!</button></form>";

            /*
            <input type="radio" id="html" name="fav_language" value="HTML">
            <label for="html">HTML</label><br>
            
            */
            //document.getElementById("answer").innerHTML = res.replace(/\[doc\d+\]/g, function(match){res1=match.replace("[doc","<span style='vertical-align:super;font-size:60%;>");return res1.replace("]","</span>");});
            document.getElementById("answer").innerHTML = form;
            document.getElementById("question").innerHTML = "Quiz on Crossing the Chasm";
            document.getElementById("result").style.visibility = "visible";

            //generate references
            
        }
    }

    xhr.send(JSON.stringify({
        "dataSources": [
            {
            "type": "AzureCognitiveSearch",
            "parameters": {
                "endpoint": "https://{INSTANCE_NAME}.search.windows.net",
                "key": "{SEARCH_API_KEY}",
                "indexName": "{INDEX_NAME}"
            }
            }
        ],
        "messages": [{
            "role": "user",
            "content": prompt
            }]
    }));
}