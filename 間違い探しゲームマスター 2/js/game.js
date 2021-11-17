const APPLICATION_KEY = "84674deb927e20d1895097e4104f582d84c682be8f688288e7e0147c16046776";
const CLIENT_KEY = "803fa5850e95c4735c8b1fc98197ccb7b4a7ecb8352be2e5d7d0a48f7cdd56ad";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";

let TestClass = ncmb.DataStore(DBName);

function save(time){
  let test = new TestClass();
  let key = "clearTime";
  let value = time;
  test.set(key,parseInt(value));
  test.save()
    .then(function(){
      console.log("成功");
    })
    .catch(function(err){
      console.log("エラー発生" + err);
    })
}

function load(time){
  TestClass
    .order("clearTime")
    .fetchAll()
    .then(function(results){
      if(time < results[0].clearTime){
        alert("ハイスコア" + time + "秒");
      }
    })
    .catch(function(err){
      console.log("エラー発生:" + err);
    })
}
let timer = null;
const MAX = 3;
let stage = 1;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum= Math.floor(Math.random()*q.length);
  for(let i=0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num" + i);
    s.addEventListener("click", function(){
      if (this.textContent == q[qNum][1]) {
        //alert("正解");
        correct.play();
        while (cells.firstChild){
          cells.removeChild(cells.firstChild);
        }
        stage++;
        if(MAX >= stage){
          gameStart();
        } else {
          save(timer);
          load(timer);
          clearTimeout(timer);
        }
      } else {
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size == size - 1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }//ここまでが２５個書く作業
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
