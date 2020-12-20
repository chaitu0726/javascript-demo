$(document).ready(function(){
    fetchQuestions();
    fetchAnswers();
});

var submittedAnswers = [];
var correctAnswers = [];

function fetchAnswers(){
    $.getJSON("data/answer.json",function(data){
        $.each(data, function(key,val){
            correctAnswers.push(val["Answer"]);
            // count += 1;
        });
        submittedAnswers = new Array(correctAnswers.length);
    });
}
function fetchQuestions(){
    // $("#questions").html("<h2> Hello World!! </h2>");
    $.getJSON("data/question.json",function(data){
       // var items =[];
        var count = 0;
        $.each(data, function(key,val){
            // Outer question Division
            var questionDivElement = createElementsOnFly("DIV",{
                "class":"question-margin"
            });

            // Question Title
            var questionTitleH3Element = createElementsOnFly("H3",{
                "class":"question-title-margin"
            });
            var questionData = document.createTextNode(count+1+". "+val["question"]);
            questionTitleH3Element.appendChild(questionData);
            questionDivElement.appendChild(questionTitleH3Element);

            //Coding data
            var codingDataPreElement;
            if(val["isCodingQuestion"]){
                codingDataPreElement = createElementsOnFly("PRE",{
                    "class":"coding-style"
                });
                var fileName = key.toLowerCase()+".txt";
                $.get('data/snippets/'+fileName,function(data){
                        var textCodeNode = document.createTextNode(data);
                        codingDataPreElement.appendChild(textCodeNode)
                });
                questionDivElement.appendChild(codingDataPreElement);
            }

            //break element 
            var breakElement = createElementsOnFly("BR");
            questionDivElement.appendChild(breakElement);

            //Unordered List element
            var optionsULElement = createElementsOnFly("UL");

                /* Answers options list*/
                var answersOptions = val["choices"];
                var answerOptionValue = "@";
                
                answersOptions.forEach(function(value,index,array){
                    var tempSpanElement = createElementsOnFly("SPAN");
                    var tempInputElement = createElementsOnFly("INPUT",{
                        "type":"radio",
                        "name":"answer_"+count,
                        "value": String.fromCharCode(answerOptionValue.charCodeAt(answerOptionValue.length - 1)+1),
                        "class":count
                        
                    });
                    answerOptionValue= String.fromCharCode(answerOptionValue.charCodeAt(answerOptionValue.length - 1)+1);
                    tempInputElement.addEventListener("change",onSetAnswer,false);
                    var tempBoldElement = createElementsOnFly("B");
                    var tempboldTextNode = document.createTextNode(answerOptionValue+". ")
                    var tempOptionTextNode = document.createTextNode(value);
                    tempBoldElement.appendChild(tempboldTextNode);
                    tempSpanElement.appendChild(tempInputElement);
                    tempSpanElement.appendChild(tempBoldElement);
                    tempSpanElement.appendChild(tempOptionTextNode);
                    tempSpanElement.appendChild(createElementsOnFly("BR"));

                    optionsULElement.appendChild(tempSpanElement);
                });
                questionDivElement.appendChild(optionsULElement);
                //Horizontal line;
                var horizontalLineElement  = createElementsOnFly("HR");
                questionDivElement.appendChild(horizontalLineElement);
                $("#questions").append(questionDivElement);
            count += 1;
        });
        
    });
}

function createElementsOnFly(name,attributes={}){
    var node = document.createElement(name);
    $.each(attributes ,function(key,val){
        node.setAttribute(key,val);
    });

    return node;
}

function onSetAnswer(){
// console.log(this.value + " "+this.className);
submittedAnswers.splice(this.className,1,this.value);
console.log(submittedAnswers);
}

function onSubmitTest(){
var marks = 0;

console.log(correctAnswers)
for(var i=0; i<submittedAnswers.length;i++){
    if(submittedAnswers[i] == correctAnswers[i])
        marks += 1;
}
$("#marks").html("<b>Marks: "+marks+"</b>");
// $('.1').attr('checked',false);
}