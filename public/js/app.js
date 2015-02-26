/* Will return a dom element filled with the dynamic data

<article class="panels">
  <div class="img"></div>
  <h2>Funny &amp; Cute Animals Compilation 2014 New</h2>
  <p class="meta">by <span class="author">funfunnycomic</span> <span class="date">4 months ago</span> <span class="views">680,636 views</span></p>
  <p class="excerpt">
  Funny &amp; Cute Animals Compilation 2014 New , Hilarious Animals Compilation 2014, Fun,funny, hilarious dogs,horses,goat, cats, ...
  </p>
</atricle>

*/
$(function(){
  
  getRandom();

  $(".app").click(getApps);
  $(".boards").click(getBoards);
  $(".random").click(getRandom);

});

//Get all the things

function timeAgo( created ){
  return moment.duration(moment.unix(created)).humanize();
}

function getApps(){ 
  $.get("/api/get_the_app.json", function( data ){
    getArtcles( data );
  });
}

function getBoards(){
  $.get("/api/my_boards.json", function( data ){
    getArtcles( data );
  });
}

function getRandom(){
  $.get("/api/random.json", function( data ){
    getArtcles( data );
  });
}

function getArtcles( data ){
  var articles = data.data.children;
  $.each(articles, function( index, article ){
    
    var newArticle = {
      url : article.data.url,
      title : article.data.title,
      author : article.data.author,
      views : article.data.score,
      age : timeAgo(article.data.created) + " ago"
    };

    renderBox(newArticle);
  });
}


//if url does not have extension - add extention


function renderBox( article_data ){
    $(".demo").remove();
    // console.log(article_data);
    //create the outermost container element
    var box = $("<article>", {
      "class" : "panels"
    });

    //creating img div
    var image = $("<div>", {
      "class" : "img"
    });
    //adding css to img background 
    image.css("background-image", "url("+ article_data.url +")");

    //adding to the box
    //box.append( image );

    //create the tagline, add the article_data.title to it
    var title = $("<h2>", {
      html : article_data.title
    });

    //create meta p
    var metatag = $("<p>", {
      "class" : "meta",
    });

    var author = $("<span>",{
      "class" : "author",
      html: article_data.author
    });


    var date = $("<span>",{
      "class" : "date",
      html: article_data.age
    });

    var count = $("<span>", {
      "class" : "views",
      html: article_data.views + "views"
    });

    var meta = metatag.append( [author, date, count] );

    var desc = $("<p>", {
      "class" : "excerpt",
      html: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia?"
    });

    box.append( [image, title, meta, desc] );

    box.appendTo(".container");
  }


