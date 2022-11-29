objects=[];
 Status ="";

 function setup()
 {
    canvas = createCanvas(500,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(500,350);
    video.hide();
 }

function modelLoaded()
{
   console.log("modelo cargado");
   Status = true;

}

function gotResult(error,results)
{
   if(error)
   {
      console.log(error);
   }
   console.log(results);
   objects=results;
}

function start()
{
   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detectando objeto";
    object_name= document.getElementById("objectname").value;
}

 function draw()
 {
    image(video,0,0,500,350);
    if(Status != "")
    {
      objectDetector.detect(video, gotResult);
      for(var i=0; i<objects.length; i++ )
      {
document.getElementById("status").innerHTML = "status: objeto detectado";
fill("#FF0000");
 porcent = floor(objects[i].confidence *100);
    text(objects[i].label + "" + porcent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("#FF0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label==object_name)
    {
      video.stop();
      objectDetector.detect(gotResult);
      document.getElementById("objectstatus").innerHTML = object_name + " encontrado";
      synth=window.speechSynthesis;
      utterThis=new SpeechSynthesisUtterance(object_name + " encontrado");
      synth.speak(utterThis);
    }
    else{
      document.getElementById("objectstatus").innerHTML = object_name + " encontrado";
    }
      }
    }
 }

