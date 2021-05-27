// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
// Version 1.0

const now = new Date()
const tag = now.getDate()
const month = now.getMonth()
const url = `https://raw.githubusercontent.com/rekkep/DayOf/main/Day%20Of%201.0%20.json`

//const tag = 1;
//const month = 0;

var monat = "monat1";
var Name = "Name1";
var ort = "ort1";
var beschreibung = "beschreibung1";

const Monat = ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember'];
var AktuellerMonat = Monat[month];
var AktuellesSternzeichen = "stern";
var AktuellesSternzeichenCartoon = "stern";
var AktuellesSternzeichenSymbol = "stern";


//Sternzeichen


const stern = await sternzeichen();

const data = await DayOf();

async function DayOf(){
    const urlToFetch = url;
    const JSON = await fetchJSON(`${urlToFetch}`);
	monat = await JSON.month[month];
    Name = await JSON[monat][tag][0].name;
    beschreibung = await JSON[monat][tag][0].beschreibung;
    ort = await JSON[monat][tag][0].ort;
    console.log("monat: " + monat);
	console.log("tag: " + tag);
	console.log("name: " + Name);
	console.log("beschreibung: " + beschreibung);
    console.log("ort: " + ort);
	//console.log(JSON);
    return{
        monat,
        Name,
        beschreibung,
        ort
    };
};

async function sternzeichen(){

    //const Monat = ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember'];
    //var AktuellerMonat = Monat[month];

    const sternzeichen = ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau', 'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische', 'Widder'];
    //var AktuellesSternzeichen;

    const sternzeichenSymbol = ['♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️'];
    //var AktuellesSternzeichenSymbol;

    const sternzeichenCartoon = ['🐏', '🐂', '👯', '🦀', '🦁', 'Jungfrau', '⚖️', '🦂', '🏹', '🐐', '🧜‍♂️', '🐟'];
    //var AktuellesSternzeichenCartoon;

    const TagWechselA = [21, 21, 21, 22, 23, 24, 24, 24, 23, 22, 21, 20];
    const TagWechselB = [20, 20, 21, 22, 23, 23, 23, 22, 21, 20, 20, 20];

    const m = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2]
    var n = 0;
    var a = 0;

    for(var i = 0; i < 12; i++){
        if(month == m[a] && tag >= TagWechselA[n] || month == m[a+1] && tag <= TagWechselB[n]){

            if(n == 11){
                AktuellesSternzeichen = sternzeichen[11];
                AktuellesSternzeichenSymbol = sternzeichenSymbol[11];
                AktuellesSternzeichenCartoon = sternzeichenCartoon[11];	
                //console.log("ist 11 m: " + m[a]);
            }
            else{
                AktuellesSternzeichen = sternzeichen[n];
                AktuellesSternzeichenSymbol = sternzeichenSymbol[n];
                AktuellesSternzeichenCartoon = sternzeichenCartoon[n];	
                //console.log("n: " + n);
                }
            };
            if(n == 12){
                n = 0;
            }
            //console.log(sternzeichen[n] + "." + n)
        n ++;
        a ++;
        
    };
    console.log(AktuellesSternzeichen);

    return{
        AktuellerMonat,
        AktuellesSternzeichen,
        AktuellesSternzeichenCartoon,
        AktuellesSternzeichenSymbol
    };
};



let widget = await createWidget();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} else {
  // Show the medium widget inside the app
  widget.presentMedium();
}
Script.complete();

async function createWidget() {
  // Create new empty ListWidget instance
  let listwidget = new ListWidget();

  // Set new background color
  listwidget.backgroundColor = new Color("#000000");

  listwidget.setPadding(-10, 0, 0, 0)


  var Header = listwidget.addStack();
  let DATUM = Header.addText(tag + "." + AktuellerMonat);
  Header.addSpacer(150)
  let stern = Header.addText(AktuellesSternzeichenSymbol + " " + AktuellesSternzeichen)
  stern.leftAlignText();
  stern.font = Font.lightSystemFont(10)
  stern.textColor = new Color("#ffffff")
  DATUM.font = Font.lightSystemFont(10);

  var NameStack = listwidget.addStack();
  let ORT = NameStack.addText(ort);
  let NAME = NameStack.addText(Name);
  ORT.font = Font.lightSystemFont(25);
  NAME.font = Font.lightSystemFont(25);
  NAME.textColor = new Color("#ffffff");

  listwidget.addSpacer(10);

  let BeschreibungStack = listwidget.addStack()
  let Beschreibung = BeschreibungStack.addText(beschreibung)
  Beschreibung.leftAlignText();
  Beschreibung.font = Font.lightSystemFont(15)
  Beschreibung.textColor = new Color("#ffffff")

  

  return listwidget;
}




async function fetchJSON(url, headers) {
        try {
            //console.log(`Fetching url: ${url}`);
            const request = new Request(url);
            //req.headers = headers;
            const response = await request.loadJSON();
            return response;
        } catch (error) {
            console.log(`Couldn't fetch ${url}`);
        }
    }

