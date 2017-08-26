(function(){
  // let tempQ="";
  // let tempA="";
  let submitButton = $("#submit-button");
  let skipButton = $("#skip-button");
  let questionButton = $(".question");
  let categoryButton = $(".category");//change category when clicked?
  let categoryNum = 0;
  let questionNum = 0;
  let score = 0;
  let tempQuestion = "";
  let tempAnswer = "";
  let tempValue = 0;
  let createId = "";
  function Subject(name, index, num) {
    this.name=name;
    this.num=num;
    this.index=index;
    this.apiUrl="http://jservice.io/api/clues?count=5&category=" + index;
  }

  let category1 = new Subject("Herbs & Spice Girls", 3764,1);
      $("#cat1").html(category1.name);
      //populate(category1);
  let category2 = new Subject("British Fictional Characters", 3723, 2);
      $("#cat2").html(category2.name);
      //populate(category2);
  let category3 = new Subject("Let Your Geek Flag Fly", 10270, 3);
      $("#cat3").html(category3.name);
      //populate(category3);
  let category4 = new Subject("Super Heroes", 58, 4);
      $("#cat4").html(category4.name);
      //populate(category4);
  let category5 = new Subject("'90s Movie Lines", 7363, 5);
      $("#cat5").html(category5.name);
      //populate(category5);
  let categories = [category1, category2, category3, category4, category5];
// Additional categories if needed
  // let cateogry7 = new Subject("Tv's Comic Book Heroes", 4902, 7);
  // let category8 = new Subject("Movie Heroes", 1882, 8);
  // let category9 = new Subject("Marvelous Marvel", 9546, 9);
  // let category10 = new Subject("That's So '90s", 7300, 10);
  // let category11 = new Subject("No. 1 Hits Of The '90s", 4177, 11);
  // let category12 = new Subject("'90s Sitcoms", 5489, 12);
  // let category13 = new Subject("Films Of The '90s", 1012, 13);
  // let category14 = new Subject("British Bands", 11891, 14);
  // let category15 = new Subject("British Fictional Characters", 3723, 15);




  function populate (tempSubject){
    $.get(tempSubject.apiUrl, function(data){
      for(let i=0; i < 5; i++) {
        //console.log(i + ": " + data[i].question);
        tempQ = ("c" + tempSubject.num+ "q" + (i+1));
        console.log(tempQ);
        console.log(data[i].question);
        tempA = ("c" + tempSubject.num+ "a" + (i+1));
        $("#" + tempQ).html(data[i].question);
        $("#" + tempA).html(data[i].answer);
        //console.log($("#" + tempQ).html(data[i].question), $("#" + tempA).html(data[i].answer))
        }
    })//end function
  }//feed in subject object with category and url info

  function getSubject(tempNum) {
    for(let i = 0; i < categories.length; i++){
      if(categories[i].num==tempNum){
        return categories[i];
      }
    }
  }

  function setItems() {
    $(createId).addClass('populated');
  }

  $(function(){
    //hit the api endpoint and put the question in the div with the id of question and answer
    questionButton.click(function(){
      categoryNum=$currentCheck=this.id.slice(1,2);
      questionNum=$currentCheck=this.id.slice(-1);
      createId = "#" + this.id.slice();
      let tempSubject = getSubject(categoryNum);
      console.log(tempSubject.name);
      //call request for question and set variables
      $.get(tempSubject.apiUrl, function(data){
        tempQuestion = data[questionNum-1].question;
        $(createId).html(tempQuestion);
        $("#question").val(tempQuestion);
        $("#currentCategory").html(tempSubject.name);
        console.log(tempQuestion);
        tempAnswer = data[questionNum-1].answer;
        console.log(tempAnswer);
        tempValue = questionNum*100;
        $("#currentValue").html(tempValue);
        console.log(tempValue);
      })
      setItems();
    })

    //when submit button is clicked
    //
    // populate question in square on top and middle of page -> also when skipped
    // change background to gray -> also when skipped
    // validate answer
    // award points as needed






  })//end of functions that run after page loads

})()
