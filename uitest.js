console.log("hello");
//
//color things
//
// Version 4.0 coolest thing ive stolen yet
var pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
const colr = "#417a63";
var amountadjust=-.15;
function colorLines(){
    var singlelines = document.getElementsByClassName("single");
    for (let i = 0; i < singlelines.length; i++) {
        const e = singlelines[i];
        var partsOfLine = e.getElementsByClassName("part");
        if (i%2==0) {
            
            for (let j = 0; j < partsOfLine.length; j++) {
                const f = partsOfLine[j];
                var bg= partsOfLine[j].getElementsByClassName("partBackground")[0];
                const ncl=pSBC(amountadjust*j,colr);
                const incl=pSBC(amountadjust*(partsOfLine.length-1-j),colr);
                if (bg!=undefined) {
                    console.log(incl);
                    bg.style.color=incl;
                   
                }
                f.dataset.incl=incl;
                f.dataset.ncl=ncl;
                f.style.backgroundColor=ncl;
            }
        }else{
            for (let j = 0; j < partsOfLine.length; j++) {
                const f = partsOfLine[j];
                var bg= partsOfLine[j].getElementsByClassName("partBackground")[0];
                const ncl=pSBC(amountadjust*j,colr);
                const incl=pSBC(amountadjust*(partsOfLine.length-1-j),colr);
                if (bg!=undefined) {
                    console.log(incl);
                    bg.style.color=ncl;
                   
                }
                f.dataset.incl=incl;
                f.dataset.ncl=ncl;
                f.style.backgroundColor=incl;
            }
        }
    }
}
colorLines();

//
//music things
//
var playflag=false;
var pf1=true;
var pf2=true;
var pf3=true;
var pf4=true;
var steptime=0;
var stepoffset=-3;
var globalBpm=120;
var audioElements=document.getElementsByTagName("audio");


//timed things
function runTimed(){
var interval = 10; // ms
var expected = Date.now() + interval;
setTimeout(step, interval);
function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
    }
    
    expected += interval;
    if (playflag) {
        setFlags();
        steptime++;
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
    }
}
}
    //the runtime function executed in timer
function setFlags(){
    const beatToStep=((60/globalBpm)*100);
    if ((beatToStep*16)>steptime) {
        for (let i = 0; i < audioElements.length; i++) {
            const e = audioElements[i];
            if (e.dataset.beat==1) {
                e.playbackRate=e.duration/((60/(+globalBpm))*16);
            }
            if (pf1) {
                if (e.dataset.beat==1) {
                    e.pause();
                    e.currentTime=0;
                    e.play();
                }
            }
        }
        pf1=false;
    }
    if ((beatToStep*16)<=steptime-stepoffset) {
        for (let i = 0; i < audioElements.length; i++) {
            const e = audioElements[i];
            if (e.dataset.beat==1||e.dataset.beat==2) {
                e.playbackRate=e.duration/((60/(+globalBpm))*16);
            }
            if (pf2) {
                if (e.dataset.beat==1||e.dataset.beat==2) {
                    e.pause();
                    e.currentTime=0;
                    e.play();
                }
            }
        }
        pf2=false;
    }
    
    if ((beatToStep*32)<=steptime-(stepoffset*2)) {
        for (let i = 0; i < audioElements.length; i++) {
            const e = audioElements[i];
            if (e.dataset.beat==1||e.dataset.beat==2||e.dataset.beat==3) {
                e.playbackRate=e.duration/((60/(+globalBpm))*16);
            }
            if (pf3) {
                if (e.dataset.beat==1||e.dataset.beat==2||e.dataset.beat==3) {
                    e.pause();
                    e.currentTime=0;
                    e.play();
                }
            }
        }
        pf3=false;
    }
    if ((beatToStep*48)<=steptime-(stepoffset*3)) {
        for (let i = 0; i < audioElements.length; i++) {
            const e = audioElements[i];
            if (e.dataset.beat==1||e.dataset.beat==2||e.dataset.beat==3||e.dataset.beat==4) {
                e.playbackRate=e.duration/((60/(+globalBpm))*16);
            }
            if (pf4) {
                if (e.dataset.beat==1||e.dataset.beat==2||e.dataset.beat==3||e.dataset.beat==4) {
                    e.pause();
                    e.currentTime=0;
                    e.play();
                }
            }
        }
        pf4=false;
    } 
    if ((beatToStep*64)<=steptime-(stepoffset*4)) {
        pf1=true;
        pf2=true;
        pf3=true;
        pf4=true;
        steptime=0;
    }
    console.log(pf1+pf2+pf3+pf4)
}

function play(){
    playflag=true;
    runTimed();
}
function stop(){
    pf1=true;
    pf2=true;
    pf3=true;
    pf4=true;
    playflag=false;
    steptime=-1;
}
function changeBpm(e){
    globalBpm=e.value;
}
function changeSrc(e){
    var nsrc = e.options[e.selectedIndex].getAttribute('data-src');
    console.log(    e.parentElement.getElementsByClassName("partName"));
    var beat = e.parentElement.getElementsByClassName("partBackground")[0].innerHTML;
    e.parentElement.getElementsByTagName("source")[0].src=nsrc;
    var audio =  e.parentElement.getElementsByTagName("audio")[0];
    audio.dataset.beat=beat;
    audio.load();
    buildRow(document.getElementsByTagName("body")[0]);
    e.parentElement.getElementsByClassName("partName")[0].innerHTML=e.options[e.selectedIndex].innerHTML;
}

//
//page things
//
buildRow(document.getElementsByTagName("body")[0]);
function buildRow(appendage){
    console.log(appendage);
    let single = document.createElement("div");
    single.className="single";
    for (let i = 1; i <= 4; i++) {
        let part=document.createElement("div",0);
        part.className="part"
        let partBackground=document.createElement("div",0);
        partBackground.className="partBackground";
        partBackground.innerHTML=i;
        part.append(partBackground);

        let partName=document.createElement("div",0);
        partName.className="partName";
        part.append(partName);

        let partAddData=document.createElement("div",0);
        partAddData.className="partAddData";
        let partBpm=document.createElement("div",0);
        partBpm.className="partBpm";
        partAddData.append(partBpm);
        let partKey=document.createElement("div",0);
        partKey.className="partKey";
        partAddData.append(partKey);
        part.append(partAddData);

        let aud= document.createElement("audio");
        let sourc = document.createElement("source");
        sourc.type="audio/mp3";
        aud.append(sourc);
        part.append(aud);

        part.append(buildSelection());
        

        single.append(part);
        
    }
    appendage.append(single);
    colorLines();
}
function buildSelection(){
    let selection=document.createElement("select");
    selection.className="partSelector";
    selection.onchange=function(){
        changeSrc(selection);
      };
    var o;

    o=null;
    o=document.createElement("option");
    o.dataset.src="";
    selection.append(o);

    o=null;
    o=document.createElement("option");
    o.dataset.src="prisesk_4onflor.mp3";
    o.innerHTML="Prisesk 4ondafloor percs";
    selection.append(o);

    o=null;
    o=document.createElement("option");
    o.dataset.src="prisesk_gmelody.mp3";
    o.innerHTML="Prisesk backing guitar melody";
    selection.append(o);

    o=null;
    o=document.createElement("option");
    o.dataset.src="sadnessv5_bassline.mp3";
    o.innerHTML="Saddnessv5 bassline";
    selection.append(o);

    o=null;
    o=document.createElement("option");
    o.dataset.src="prisesk_dsmelody.mp3";
    o.innerHTML="Prisesk ds lead melody";
    selection.append(o);

    return selection;
}