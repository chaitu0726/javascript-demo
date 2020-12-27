$(document).ready(function(){
    fetchQuestions();
    fetchAnswers();
});

var submittedAnswers = [];
var correctAnswers = [];
var answerExplaination=[];
function fetchAnswers(){
    $.getJSON("data/answer.json",function(data){
        $.each(data, function(key,val){
            correctAnswers.push(val["Answer"]);
            answerExplaination.push(val["Explaination"]);
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
            var outerDivision = $("#questions");
           
           var innerDivElement =  "<div class='question-margin'>";
           var questionTitleElement = "<h3 class='question-title-margin'>"+(count+1)+". "+val["question"] +"</h3>"
          
              var codingDataPreDataElemet="";
             
             if(val["isCodingQuestion"]){
                var fileName = key.toLowerCase()+".txt";
                $.get('data/snippets/'+fileName,function(data){
                    // $.wait(500);
                    codingDataPreDataElemet =  "<pre class='coding-style'>"+data+"</pre><br>";
                });
             }
                var answersOptions = val["choices"];
                var answerOptionValue = "A";
                var insideUnorderList ="";
                answersOptions.forEach(function(value,index,array){
  
                   insideUnorderList +=  "<span><input type='radio' name="+"answer_"+count+" value="+ answerOptionValue+" class="+count+" onChange='onSetAnswer(this.className,this.value)'/><b>"+answerOptionValue +".</b> "+value+"</span><br>"
                   answerOptionValue= String.fromCharCode(answerOptionValue.charCodeAt(answerOptionValue.length - 1)+1);

                });
                setTimeout(function(){
                outerDivision.append(innerDivElement+questionTitleElement+codingDataPreDataElemet+"<ul>"+ insideUnorderList+"</ul><hr id="+key+"></div>");
                },150);
           
            count += 1;
        
        });
    });
}

function onSetAnswer(index,val){
//console.log(this);
submittedAnswers.splice(index,1,val);
console.log(submittedAnswers);
}

function onSubmitTest(){
var marks = 0;
$("#loader").addClass("spinner-border text-info");
$("#marks").html("");
console.log(correctAnswers);


setTimeout(function(){
    
    for(var i=0; i<submittedAnswers.length;i++){
        if(submittedAnswers[i] == correctAnswers[i]){
            marks += 1;
        }
        $("<div class='coding-style'><span><b>Correct Answer : "+correctAnswers[i]+"</b></span><br><span><b>Explaination : </b>"+ answerExplaination[i]+"</span><br></div>").insertBefore("#Question_"+(i+1));
    }
    $("#marks").html("<b>Marks: "+marks+"</b>");
    $("#loader").removeClass("spinner-border text-info");

},2500);

}