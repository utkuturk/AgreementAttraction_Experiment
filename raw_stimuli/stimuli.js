var shuffleSequence = seq("intro", 
                          "intro_sep", 
                          sepWith("within_intro_sep", "practice"), 
                          "practice_sep", 
                          sepWith("sep", rshuffle(startsWith("condition_"), startsWith("filler"))), //
                          "send_results",
                         "debrief"); 
var practiceItemTypes = ["prac"];

var defaults = [
    "Separator", {
        normalMessage: "LÃ¼tfen bekleyiniz."
    },
    "DashedSentence", {
        mode: "speeded acceptability", display: "in place",
        wordTime:350,
        wordPauseTime:150,
    },
    "DashedAcceptabilityJudgment", {
        hasCorrect: false
    },
    "Question", {
        as: [["q","KÃ–TÃœ (Q'ya basÄ±n)"],["p","Ä°YÄ° (P'ye basÄ±n)"]],
        q: "Bu cÃ¼mle nasÄ±l bir cÃ¼mleydi?"
        hasCorrect: false,
        presentAsScale: true,
        randomOrder: false,
        showNumbers: true,
        autoFirstChar: false, 
        wordTime:300,
        wordPauseTime:200,
        instructions: " "
    },
    "Message", {
        hideProgressBar: false
    },
    "Form", {
        hideProgressBar: false,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Devam etmek iÃ§in buraya tÄ±klayÄ±nÄ±z.",
        obligatoryCheckboxErrorGenerator: function (field) { return "Bu alanÄ± doldurmanÄ±z gerekmektedir." },
        obligatoryErrorGenerator: function (field) { return "Bu alanÄ± doldurmanÄ±z gerekmektedir."; },
        obligatoryRadioErrorGenerator: function (field) { return "SeÃ§eneklerden birini seÃ§iniz."; }
        
    }
];

 // insert breaks
function modifyRunningOrder(ro) {

 for (var i = 0; i < ro.length; ++i) {
 if (i % 20 == 25 && i > 20 && i < 200) {
 ro[i].push(new DynamicElement(
 "Message",
 { html: "<p>KÄ±sa bir ara verelim. Deney 10 saniye iÃ§erisinde devam edecektir.</p>", transfer: 10000 },
 true
 ));
 }
 }
 return ro;
 }



var items = [
    ["send_results", "__SendResults__", { }],

    ["sep", "Separator", {
        normalMessage: "",
        errorMessage: "",
        ignoreFailure: false}],
    
    ["intro_sep", "Separator", {
        transfer: "keypress",
        normalMessage: "AlÄ±stÄ±rma kÄ±smÄ±na baÅŸlamak iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z.",
        errorMessage: "AlÄ±stÄ±rma kÄ±smÄ±na baÅŸlamak iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z." }],


    ["within_intro_sep", "Separator", {
        transfer: "keypress",
        normalMessage: "Harika. Ä°yi gidiyorsunuz. Bir sonraki cÃ¼mleye geÃ§mek iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z.",
        errorMessage: "OdaklanÄ±nÄ±z. Bir sonraki soruya geÃ§mek iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z."}],
    
    ["practice_sep", "Separator", {
        transfer: "keypress",
        normalMessage: "Deneye baÅŸlamak iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z.",
        errorMessage: "OdaklanÄ±nÄ±z. Bir sonraki soruya geÃ§mek iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z." }],


    ["intro", "Form", {
        html: { include: "intro1.html" },
        obligatoryCheckboxErrorGenerator: function (field) { return "Devam etmeden Ã¶nce Ã§alismaya katÄ±lmayÄ± kabul etmelisiniz."; }
    } ],
    
    ["intro", "Form", {
        html: { include: "intro2.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "YaÅŸÄ±nÄ±zÄ± sayÄ± olarak giriniz."; },
        }
    } ],

    ["intro", "Form", {
        html: { include: "intro3.html" } } ],

    ["intro", "Form", {
        html: { include: "intro4.html" },
        transfer: "keypress"
        //continueMessage: "AlÄ±ÅŸtÄ±rma kÄ±smÄ±na baÅŸlamak iÃ§in boÅŸluk tuÅŸuna basÄ±nÄ±z." 
    } ],

    ["debrief", "Message", {
        html: { include: "debrief.html" },
                transfer: 3000  }],

// Practice
    
["prac", "DashedSentence", {s: ["Bu", "kÄ±sÄ±m", "deneye", "ve", "sunum", "yÃ¶ntemine", "alÄ±ÅŸmanÄ±z", "iÃ§in", "bulunmaktadÄ±r."]}],
["prac", "DashedSentence", {s: ["Bu", "cÃ¼mle", "Ã¶ncekinden", "daha", "uzun", "bir", "cÃ¼mle.", "          ", "OkumasÄ±", "biraz", "daha", "zor", "olsa_da", "sunum", "ÅŸekli", "aslÄ±nda", "aynÄ±."]}],

["prac", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Harika! Åimdi deneyde gÃ¶receÄŸiniz tÃ¼rden cÃ¼mlelere bakalÄ±m. Birazdan gÃ¶receÄŸiniz cÃ¼mleler Ä°YÄ° diyebileceÄŸimiz cÃ¼mlelerden. "],
                           ["p", "Devam etmek iÃ§in 'boÅŸluk' tuÅŸuna basÄ±nÄ±z."]
                           ]}],

["prac", "DashedSentence", {s: ["Teyzemin", "komÅŸusu", "yerden", "kalkÄ±p", "oturunca", "Ã¶nÃ¼ndeki", "kedinin", "baÅŸÄ±nÄ±", "okÅŸadÄ±."]}],
["prac", "DashedSentence", {s: ["Utku'nun", "kÄ±zÄ±", "yÃ¼rÃ¼yene", "kadar", "bir","sÃ¼rÃ¼","oyuncak","alÄ±nmÄ±ÅŸtÄ±."]}],

["prac", Message, {consentRequired: false, transfer: "keypress",
                    html: ["div",
                          ["p", "Az Ã¶nce okuduÄŸunuz cÃ¼mleler gibi cÃ¼mleler TÃ¼rkÃ§e'de kabul edilebilir cÃ¼mlelerdir."],
                          ["p", "Bir de KÃ–TÃœ diyebileceÄŸimiz cÃ¼mlelerden Ã¶rnekler gÃ¶relim."],
                          ["p", "Devam etmek iÃ§in 'boÅŸluk' tuÅŸuna basÄ±nÄ±z."]
                          ]}],

["prac", "DashedSentence", {s: ["Ã–ÄŸrencinin", "asistanÄ±", "gelince", "ders", "Ã§ok", "gÃ¼zel", "anlattÄ±."]}],
["prac", "DashedSentence", {s: ["AsistanÄ±n", "Ã¶ÄŸrencisi", "dinlenince", "ders", "ara", "verdiler."]}],   

["prac", Message, {consentRequired: false, transfer: "keypress",
                    html: ["div",
                          ["p", "NasÄ±l gidiyor? Elinin alÄ±ÅŸmasÄ± iÃ§in biraz daha Ã¶rnek cÃ¼mle girelim."],
                          ["p", "Devam etmek iÃ§in 'boÅŸluk' tuÅŸuna basÄ±nÄ±z."]
                          ]}],

["prac", "DashedSentence", {s: ["Ä°mamÄ±n", "kedisi", "doÄŸurunca", "mahalle", "sevinÃ§", "oldukÃ§a" , "katlandÄ±."]}],
["prac", "DashedSentence", {s: ["Evin","cephesi", "bitince", "boyalarÄ±","toplayÄ±p","gittiler."]}],
["prac", "DashedSentence", {s: ["Kimsenin","Ã§ocuÄŸu", "aÄŸlamayÄ±nca","yeni", "yazÄ±lan", "kitap", "kimseye", "okumadÄ±."]}],

    
["prac", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Elinizin Ä±sÄ±ndÄ±ÄŸÄ±nÄ± umuyorum. HazÄ±r olduÄŸunuzu hissettiÄŸinizde 'boÅŸluk' tuÅŸuna basarak ilerleyiniz."],
                           ["p", "NOT: VereceÄŸiniz cevaplar Ã¼zerine Ã§ok dÃ¼ÅŸÃ¼nmeyin! TamamlayacaÄŸÄ±nÄ±z deneyde 'doÄŸru' ya da 'yanlÄ±ÅŸ' cevap bulunmamaktadÄ±r. Deney yaklaÅŸÄ±k X dakika sÃ¼recek ve bu sÃ¼re zarfÄ±nda deneye odaklanmanÄ±z gerekmektedir. KatÄ±lÄ±mÄ±nÄ±z iÃ§in Ã§ok teÅŸekkÃ¼rler!"]
                           ]}],


["presepA", Separator, {transfer: 3000, normalMessage: "Telefonunuzu ve diÄŸer dikkat daÄŸÄ±tÄ±cÄ± unsurlardan deney esnasÄ±nda uzak durmanÄ±z bizim iÃ§in Ã§ok daha iyi olacaktÄ±r." }],
["dummysep", Separator, {transfer: 10, normalMessage: ""}],
[["condition_a", 1], "DashedSentence", {s: "yöneticilerin", "asçisi", "mutfakta sürekli", "zipladilar"}],
[["condition_b", 1], "DashedSentence", {s: "yöneticilerin", "asçisi", "mutfakta sürekli", "zipladi"}],
[["condition_c", 1], "DashedSentence", {s: "yöneticinin", "asçisi", "mutfakta sürekli", "zipladilar"}],
[["condition_d", 1], "DashedSentence", {s: "yöneticinin", "asçisi", "mutfakta sürekli", "zipladi"}],
[["condition_a", 2], "DashedSentence", {s: "ögrencilerin", "ablasi", "sinifta birden", "bayildilar"}],
[["condition_b", 2], "DashedSentence", {s: "ögrencilerin", "ablasi", "sinifta birden", "bayildi"}],
[["condition_c", 2], "DashedSentence", {s: "ögrencinin", "ablasi", "sinifta birden", "bayildilar"}],
[["condition_d", 2], "DashedSentence", {s: "ögrencinin", "ablasi", "sinifta birden", "bayildi"}],
[["condition_a", 3], "DashedSentence", {s: "marangozlarin", "abisi", "atölyeden hizla", "uzaklastilar"}],
[["condition_b", 3], "DashedSentence", {s: "marangozlarin", "abisi", "atölyeden hizla", "uzaklasti"}],
[["condition_c", 3], "DashedSentence", {s: "marangozun", "abisi", "atölyeden hizla", "uzaklastilar"}],
[["condition_d", 3], "DashedSentence", {s: "marangozun", "abisi", "atölyeden hizla", "uzaklasti"}],
[["condition_a", 4], "DashedSentence", {s: "mahallelilerin", "emlakçisi", "aniden küstahça", "güldüler"}],
[["condition_b", 4], "DashedSentence", {s: "mahallelilerin", "emlakçisi", "aniden küstahça", "güldü"}],
[["condition_c", 4], "DashedSentence", {s: "mahallelinin", "emlakçisi", "aniden küstahça", "güldüler"}],
[["condition_d", 4], "DashedSentence", {s: "mahallelinin", "emlakçisi", "aniden küstahça", "güldü"}],
[["condition_a", 5], "DashedSentence", {s: "kizlarin", "halasi", "sabaha kadar", "agladilar"}],
[["condition_b", 5], "DashedSentence", {s: "kizlarin", "halasi", "sabaha kadar", "agladi"}],
[["condition_c", 5], "DashedSentence", {s: "kizin", "halasi", "sabaha kadar", "agladilar"}],
[["condition_d", 5], "DashedSentence", {s: "kizin", "halasi", "sabaha kadar", "agladi"}],
[["condition_a", 6], "DashedSentence", {s: "damatlarin", "dayisi", "arada sirada", "sikildilar"}],
[["condition_b", 6], "DashedSentence", {s: "damatlarin", "dayisi", "arada sirada", "sikildi"}],
[["condition_c", 6], "DashedSentence", {s: "damatin", "dayisi", "arada sirada", "sikildilar"}],
[["condition_d", 6], "DashedSentence", {s: "damatin", "dayisi", "arada sirada", "sikildi"}],
[["condition_a", 7], "DashedSentence", {s: "doktorlarin", "çiçekçisi", "günden güne", "zayifladilar"}],
[["condition_b", 7], "DashedSentence", {s: "doktorlarin", "çiçekçisi", "günden güne", "zayifladi"}],
[["condition_c", 7], "DashedSentence", {s: "doktorun", "çiçekçisi", "günden güne", "zayifladilar"}],
[["condition_d", 7], "DashedSentence", {s: "doktorun", "çiçekçisi", "günden güne", "zayifladi"}],
[["condition_a", 8], "DashedSentence", {s: "stajyerlerin", "enistesi", "geceden önce", "uyudular"}],
[["condition_b", 8], "DashedSentence", {s: "stajyerlerin", "enistesi", "geceden önce", "uyudu"}],
[["condition_c", 8], "DashedSentence", {s: "stajyerin", "enistesi", "geceden önce", "uyudular"}],
[["condition_d", 8], "DashedSentence", {s: "stajyerin", "enistesi", "geceden önce", "uyudu"}],
[["condition_a", 9], "DashedSentence", {s: "aristokratlarin", "hizmetçisi", "yorgun argin", "yattilar"}],
[["condition_b", 9], "DashedSentence", {s: "aristokratlarin", "hizmetçisi", "yorgun argin", "yatti"}],
[["condition_c", 9], "DashedSentence", {s: "aristokratin", "hizmetçisi", "yorgun argin", "yattilar"}],
[["condition_d", 9], "DashedSentence", {s: "aristokratin", "hizmetçisi", "yorgun argin", "yatti"}],
[["condition_a", 10], "DashedSentence", {s: "konusmacilarin", "sunucusu", "olaganüstü hizli", "kostular"}],
[["condition_b", 10], "DashedSentence", {s: "konusmacilarin", "sunucusu", "olaganüstü hizli", "kostu"}],
[["condition_c", 10], "DashedSentence", {s: "konusmacinin", "sunucusu", "olaganüstü hizli", "kostular"}],
[["condition_d", 10], "DashedSentence", {s: "konusmacinin", "sunucusu", "olaganüstü hizli", "kostu"}],
[["condition_a", 11], "DashedSentence", {s: "psikiyatristlerin", "eczacisi", "aç susuz", "dolastilar"}],
[["condition_b", 11], "DashedSentence", {s: "psikiyatristlerin", "eczacisi", "aç susuz", "dolasti"}],
[["condition_c", 11], "DashedSentence", {s: "psikiyatristin", "eczacisi", "aç susuz", "dolastilar"}],
[["condition_d", 11], "DashedSentence", {s: "psikiyatristin", "eczacisi", "aç susuz", "dolasti"}],
[["condition_a", 12], "DashedSentence", {s: "politikacilarin", "hocasi", "adliyeden çabucak", "çiktilar"}],
[["condition_b", 12], "DashedSentence", {s: "politikacilarin", "hocasi", "adliyeden çabucak", "çikti"}],
[["condition_c", 12], "DashedSentence", {s: "politikacinin", "hocasi", "adliyeden çabucak", "çiktilar"}],
[["condition_d", 12], "DashedSentence", {s: "politikacinin", "hocasi", "adliyeden çabucak", "çikti"}],
[["condition_a", 13], "DashedSentence", {s: "hakimlerin", "çaycisi", "nedensiz yere", "kizdilar"}],
[["condition_b", 13], "DashedSentence", {s: "hakimlerin", "çaycisi", "nedensiz yere", "kizdi"}],
[["condition_c", 13], "DashedSentence", {s: "hakimin", "çaycisi", "nedensiz yere", "kizdilar"}],
[["condition_d", 13], "DashedSentence", {s: "hakimin", "çaycisi", "nedensiz yere", "kizdi"}],
[["condition_a", 14], "DashedSentence", {s: "oyuncularin", "hemsiresi", "etrafta amaçsizca", "gezdiler"}],
[["condition_b", 14], "DashedSentence", {s: "oyuncularin", "hemsiresi", "etrafta amaçsizca", "gezdi"}],
[["condition_c", 14], "DashedSentence", {s: "oyuncunun", "hemsiresi", "etrafta amaçsizca", "gezdiler"}],
[["condition_d", 14], "DashedSentence", {s: "oyuncunun", "hemsiresi", "etrafta amaçsizca", "gezdi"}],
[["condition_a", 15], "DashedSentence", {s: "ögretmenlerin", "müdiresi", "biraz önce", "aradilar"}],
[["condition_b", 15], "DashedSentence", {s: "ögretmenlerin", "müdiresi", "biraz önce", "aradi"}],
[["condition_c", 15], "DashedSentence", {s: "ögretmenin", "müdiresi", "biraz önce", "aradilar"}],
[["condition_d", 15], "DashedSentence", {s: "ögretmenin", "müdiresi", "biraz önce", "aradi"}],
[["condition_a", 16], "DashedSentence", {s: "milyonerlerin", "terzisi", "tamamen gereksizce", "bagirdilar"}],
[["condition_b", 16], "DashedSentence", {s: "milyonerlerin", "terzisi", "tamamen gereksizce", "bagirdi"}],
[["condition_c", 16], "DashedSentence", {s: "milyonerin", "terzisi", "tamamen gereksizce", "bagirdilar"}],
[["condition_d", 16], "DashedSentence", {s: "milyonerin", "terzisi", "tamamen gereksizce", "bagirdi"}],
[["condition_a", 17], "DashedSentence", {s: "bebeklerin", "bakicisi", "çok kibar", "davrandilar"}],
[["condition_b", 17], "DashedSentence", {s: "bebeklerin", "bakicisi", "çok kibar", "davrandi"}],
[["condition_c", 17], "DashedSentence", {s: "bebegin", "bakicisi", "çok kibar", "davrandilar"}],
[["condition_d", 17], "DashedSentence", {s: "bebegin", "bakicisi", "çok kibar", "davrandi"}],
[["condition_a", 18], "DashedSentence", {s: "çocuklarin", "dadisi", "yüksek sesle", "konustular"}],
[["condition_b", 18], "DashedSentence", {s: "çocuklarin", "dadisi", "yüksek sesle", "konustu"}],
[["condition_c", 18], "DashedSentence", {s: "çocugun", "dadisi", "yüksek sesle", "konustular"}],
[["condition_d", 18], "DashedSentence", {s: "çocugun", "dadisi", "yüksek sesle", "konustu"}],
[["condition_a", 19], "DashedSentence", {s: "futbolcularin", "sürücüsü", "çok yavas", "çalistilar"}],
[["condition_b", 19], "DashedSentence", {s: "futbolcularin", "sürücüsü", "çok yavas", "çalisti"}],
[["condition_c", 19], "DashedSentence", {s: "futbolcunun", "sürücüsü", "çok yavas", "çalistilar"}],
[["condition_d", 19], "DashedSentence", {s: "futbolcunun", "sürücüsü", "çok yavas", "çalisti"}],
[["condition_a", 20], "DashedSentence", {s: "modacilarin", "taksicisi", "saatlerce durmaksizin", "içtiler"}],
[["condition_b", 20], "DashedSentence", {s: "modacilarin", "taksicisi", "saatlerce durmaksizin", "içti"}],
[["condition_c", 20], "DashedSentence", {s: "modacinin", "taksicisi", "saatlerce durmaksizin", "içtiler"}],
[["condition_d", 20], "DashedSentence", {s: "modacinin", "taksicisi", "saatlerce durmaksizin", "içti"}],
[["condition_a", 21], "DashedSentence", {s: "sanatçilarin", "çalgicisi", "feci bir sekilde", "öldüler"}],
[["condition_b", 21], "DashedSentence", {s: "sanatçilarin", "çalgicisi", "feci bir sekilde", "öldü"}],
[["condition_c", 21], "DashedSentence", {s: "sanatçinin", "çalgicisi", "feci bir sekilde", "öldüler"}],
[["condition_d", 21], "DashedSentence", {s: "sanatçinin", "çalgicisi", "feci bir sekilde", "öldü"}],
[["condition_a", 22], "DashedSentence", {s: "dedektiflerin", "disçisi", "ilk kez çilginca", "eglendiler"}],
[["condition_b", 22], "DashedSentence", {s: "dedektiflerin", "disçisi", "ilk kez çilginca", "eglendi"}],
[["condition_c", 22], "DashedSentence", {s: "dedektifin", "disçisi", "ilk kez çilginca", "eglendiler"}],
[["condition_d", 22], "DashedSentence", {s: "dedektifin", "disçisi", "ilk kez çilginca", "eglendi"}],
[["condition_a", 23], "DashedSentence", {s: "esnaflarin", "müsterisi", "sikayettten hemen sonra", "sustular"}],
[["condition_b", 23], "DashedSentence", {s: "esnaflarin", "müsterisi", "sikayettten hemen sonra", "sustu"}],
[["condition_c", 23], "DashedSentence", {s: "esnafin", "müsterisi", "sikayettten hemen sonra", "sustular"}],
[["condition_d", 23], "DashedSentence", {s: "esnafin", "müsterisi", "sikayettten hemen sonra", "sustu"}],
[["condition_a", 24], "DashedSentence", {s: "sarkicilarin", "korumasi", "her zamanki gibi", "geciktiler"}],
[["condition_b", 24], "DashedSentence", {s: "sarkicilarin", "korumasi", "her zamanki gibi", "gecikti"}],
[["condition_c", 24], "DashedSentence", {s: "sarkicinin", "korumasi", "her zamanki gibi", "geciktiler"}],
[["condition_d", 24], "DashedSentence", {s: "sarkicinin", "korumasi", "her zamanki gibi", "gecikti"}],
[["condition_a", 25], "DashedSentence", {s: "göstericilerin", "izleyicisi", "aksama kadar sessizce", "oturdular"}],
[["condition_b", 25], "DashedSentence", {s: "göstericilerin", "izleyicisi", "aksama kadar sessizce", "oturdu"}],
[["condition_c", 25], "DashedSentence", {s: "göstericinin", "izleyicisi", "aksama kadar sessizce", "oturdular"}],
[["condition_d", 25], "DashedSentence", {s: "göstericinin", "izleyicisi", "aksama kadar sessizce", "oturdu"}],
[["condition_a", 26], "DashedSentence", {s: "cerrahlarin", "hastasi", "aksamki gösteriden önce", "kaçtilar"}],
[["condition_b", 26], "DashedSentence", {s: "cerrahlarin", "hastasi", "aksamki gösteriden önce", "kaçti"}],
[["condition_c", 26], "DashedSentence", {s: "cerrahin", "hastasi", "aksamki gösteriden önce", "kaçtilar"}],
[["condition_d", 26], "DashedSentence", {s: "cerrahin", "hastasi", "aksamki gösteriden önce", "kaçti"}],
[["condition_a", 27], "DashedSentence", {s: "dalgiçlarin", "annesi", "bile bile", "geç kaldilar"}],
[["condition_b", 27], "DashedSentence", {s: "dalgiçlarin", "annesi", "bile bile", "geç kaldi"}],
[["condition_c", 27], "DashedSentence", {s: "dalgicin", "annesi", "bile bile", "geç kaldilar"}],
[["condition_d", 27], "DashedSentence", {s: "dalgicin", "annesi", "bile bile", "geç kaldi"}],
[["condition_a", 28], "DashedSentence", {s: "fabrikatörlerin", "isçisi", "beklenmedik bir anda", "hastalandilar"}],
[["condition_b", 28], "DashedSentence", {s: "fabrikatörlerin", "isçisi", "beklenmedik bir anda", "hastalandi"}],
[["condition_c", 28], "DashedSentence", {s: "fabrikatörün", "isçisi", "beklenmedik bir anda", "hastalandilar"}],
[["condition_d", 28], "DashedSentence", {s: "fabrikatörün", "isçisi", "beklenmedik bir anda", "hastalandi"}],
[["condition_a", 29], "DashedSentence", {s: "komedyenlerin", "yardimcisi", "poyrazdan dolayi", "üsüdüler"}],
[["condition_b", 29], "DashedSentence", {s: "komedyenlerin", "yardimcisi", "poyrazdan dolayi", "üsüdü"}],
[["condition_c", 29], "DashedSentence", {s: "komedyenin", "yardimcisi", "poyrazdan dolayi", "üsüdüler"}],
[["condition_d", 29], "DashedSentence", {s: "komedyenin", "yardimcisi", "poyrazdan dolayi", "üsüdü"}],
[["condition_a", 30], "DashedSentence", {s: "soförlerin", "yolcusu", "yemekten sonra yine", "aciktilar"}],
[["condition_b", 30], "DashedSentence", {s: "soförlerin", "yolcusu", "yemekten sonra yine", "acikti"}],
[["condition_c", 30], "DashedSentence", {s: "soförün", "yolcusu", "yemekten sonra yine", "aciktilar"}],
[["condition_d", 30], "DashedSentence", {s: "soförün", "yolcusu", "yemekten sonra yine", "acikti"}],
[["condition_a", 31], "DashedSentence", {s: "mühendislerin", "kapicisi", "erken ödemeden dolayi", "sevindiler"}],
[["condition_b", 31], "DashedSentence", {s: "mühendislerin", "kapicisi", "erken ödemeden dolayi", "sevindi"}],
[["condition_c", 31], "DashedSentence", {s: "mühendisin", "kapicisi", "erken ödemeden dolayi", "sevindiler"}],
[["condition_d", 31], "DashedSentence", {s: "mühendisin", "kapicisi", "erken ödemeden dolayi", "sevindi"}],
[["condition_a", 32], "DashedSentence", {s: "pazarcilarin", "nakliyecisi", "mesaiden hemen sonra", "uzandilar"}],
[["condition_b", 32], "DashedSentence", {s: "pazarcilarin", "nakliyecisi", "mesaiden hemen sonra", "uzandi"}],
[["condition_c", 32], "DashedSentence", {s: "pazarcinin", "nakliyecisi", "mesaiden hemen sonra", "uzandilar"}],
[["condition_d", 32], "DashedSentence", {s: "pazarcinin", "nakliyecisi", "mesaiden hemen sonra", "uzandi"}],
[["condition_a", 33], "DashedSentence", {s: "oyuncularin", "egitimcisi", "ilk denemede epey", "zorlandilar"}],
[["condition_b", 33], "DashedSentence", {s: "oyuncularin", "egitimcisi", "ilk denemede epey", "zorlandi"}],
[["condition_c", 33], "DashedSentence", {s: "oyuncunun", "egitimcisi", "ilk denemede epey", "zorlandilar"}],
[["condition_d", 33], "DashedSentence", {s: "oyuncunun", "egitimcisi", "ilk denemede epey", "zorlandi"}],
[["condition_a", 34], "DashedSentence", {s: "mankenlerin", "modacisi", "geç bir vakitte", "kalktilar"}],
[["condition_b", 34], "DashedSentence", {s: "mankenlerin", "modacisi", "geç bir vakitte", "kalkti"}],
[["condition_c", 34], "DashedSentence", {s: "mankenin", "modacisi", "geç bir vakitte", "kalktilar"}],
[["condition_d", 34], "DashedSentence", {s: "mankenin", "modacisi", "geç bir vakitte", "kalkti"}],
[["condition_a", 35], "DashedSentence", {s: "konuklarin", "teyzesi", "müthis bir agriyla", "uyandilar"}],
[["condition_b", 35], "DashedSentence", {s: "konuklarin", "teyzesi", "müthis bir agriyla", "uyandi"}],
[["condition_c", 35], "DashedSentence", {s: "konugun", "teyzesi", "müthis bir agriyla", "uyandilar"}],
[["condition_d", 35], "DashedSentence", {s: "konugun", "teyzesi", "müthis bir agriyla", "uyandi"}],
[["condition_a", 36], "DashedSentence", {s: "oglanlarin", "amcasi", "bos bir caddede", "yürüdüler"}],
[["condition_b", 36], "DashedSentence", {s: "oglanlarin", "amcasi", "bos bir caddede", "yürüdü"}],
[["condition_c", 36], "DashedSentence", {s: "oglanin", "amcasi", "bos bir caddede", "yürüdüler"}],
[["condition_d", 36], "DashedSentence", {s: "oglanin", "amcasi", "bos bir caddede", "yürüdü"}],
[["condition_a", 37], "DashedSentence", {s: "avukatlarin", "komsusu", "toplantidan sonra birden", "sarardilar"}],
[["condition_b", 37], "DashedSentence", {s: "avukatlarin", "komsusu", "toplantidan sonra birden", "sarardi"}],
[["condition_c", 37], "DashedSentence", {s: "avukatin", "komsusu", "toplantidan sonra birden", "sarardilar"}],
[["condition_d", 37], "DashedSentence", {s: "avukatin", "komsusu", "toplantidan sonra birden", "sarardi"}],
[["condition_a", 38], "DashedSentence", {s: "ünlülerin", "falcisi", "yabanci bir ülkede", "kayboldular"}],
[["condition_b", 38], "DashedSentence", {s: "ünlülerin", "falcisi", "yabanci bir ülkede", "kayboldu"}],
[["condition_c", 38], "DashedSentence", {s: "ünlünün", "falcisi", "yabanci bir ülkede", "kayboldular"}],
[["condition_d", 38], "DashedSentence", {s: "ünlünün", "falcisi", "yabanci bir ülkede", "kayboldu"}],
[["condition_a", 39], "DashedSentence", {s: "çiftçilerin", "bekçisi", "normalden çok yavas", "gezindiler"}],
[["condition_b", 39], "DashedSentence", {s: "çiftçilerin", "bekçisi", "normalden çok yavas", "gezindi"}],
[["condition_c", 39], "DashedSentence", {s: "çiftçinin", "bekçisi", "normalden çok yavas", "gezindiler"}],
[["condition_d", 39], "DashedSentence", {s: "çiftçinin", "bekçisi", "normalden çok yavas", "gezindi"}],
[["condition_a", 40], "DashedSentence", {s: "kadinlarin", "ninesi", "geçen seneye göre", "dinçlestiler"}],
[["condition_b", 40], "DashedSentence", {s: "kadinlarin", "ninesi", "geçen seneye göre", "dinçlesti"}],
[["condition_c", 40], "DashedSentence", {s: "kadinin", "ninesi", "geçen seneye göre", "dinçlestiler"}],
[["condition_d", 40], "DashedSentence", {s: "kadinin", "ninesi", "geçen seneye göre", "dinçlesti"}][["filler", 101], "DashedSentence", {s: "Adamin", "annesi", "fenalasinca", "inek", "kurban", "ettiler"}],
[["filler", 102], "DashedSentence", {s: "Sosyologun", "ögrencisi", "konusunca", "tutarsizlik", "açiga", "çikardilar"}],
[["filler", 103], "DashedSentence", {s: "Doktorun", "hemsiresi", "gelene kadar", "hasta", "taburcu", "ettiler"}],
[["filler", 104], "DashedSentence", {s: "Kemancinin", "sevgilisi", "ölünce", "mezar", "ziyaret", "ettiler"}],
[["filler", 105], "DashedSentence", {s: "Hocanin", "kapicisi", "bayilinca", "doktor", "rahatsiz", "ettiler"}],
[["filler", 106], "DashedSentence", {s: "Medyumun", "kocasi", "saçmalayinca", "falci", "zengin", "ettiler"}],
[["filler", 107], "DashedSentence", {s: "Baskanin", "disçisi", "tirsinca", "stajyer", "kabul", "ettiler"}],
[["filler", 108], "DashedSentence", {s: "Elestirmenin", "karisi", "kivirtinca", "sapik", "tahrik", "ettiler"}],
[["filler", 109], "DashedSentence", {s: "Patronun", "kahyasi", "düsünce", "düsman", "mutlu", "ettiler"}],
[["filler", 110], "DashedSentence", {s: "Müdürün", "asçisi", "hazirlaninca", "yemek", "hazir", "ettiler"}],
[["filler", 111], "DashedSentence", {s: "Çocugun", "abisi", "üzülünce", "oyuncak", "icat", "ettiler"}],
[["filler", 112], "DashedSentence", {s: "Psikologun", "hastasi", "gecikince", "vakit", "hiç", "ettiler"}],
[["filler", 113], "DashedSentence", {s: "Ressamin", "tedarikçisi", "kaybolunca", "tuval", "ithal", "ettiler"}],
[["filler", 114], "DashedSentence", {s: "Disçinin", "temizlikçisi", "yorulunca", "hademe", "ikna", "ettiler"}],
[["filler", 115], "DashedSentence", {s: "Kimyagerin", "kuryesi", "hapsurunca", "deney", "akil", "ettiler"}],
[["filler", 116], "DashedSentence", {s: "Mankenin", "motorcusu", "sizinca", "çirak", "mesgul", "ettiler"}],
[["filler", 117], "DashedSentence", {s: "Dekanin", "davetlisi", "geçince", "seyirci", "ayaga", "kaldirdilar"}],
[["filler", 118], "DashedSentence", {s: "Mafyanin", "yatirimcisi", "batinca", "kuyumcu", "tehdit", "ettiler"}],
[["filler", 119], "DashedSentence", {s: "Asçinin", "manavi", "kapaninca", "et", "tedarik", "ettiler"}],
[["filler", 120], "DashedSentence", {s: "Ögrencinin", "hocasi", "anlatinca", "makine", "icat", "ettiler"}],
[["filler", 121], "DashedSentence", {s: "Bakanin", "yardimcisi", "bulununca", "koltuk", "geri", "getirdi"}],
[["filler", 122], "DashedSentence", {s: "Ögrencinin", "hocasi", "ayrilinca", "proje", "birden", "unuttu"}],
[["filler", 123], "DashedSentence", {s: "Pizzacinin", "kuryesi", "tökezleyince", "soslar", "yere", "saçti"}],
[["filler", 124], "DashedSentence", {s: "Kralin", "soytarisi", "asilinca", "sapka", "yerinde", "buldu"}],
[["filler", 125], "DashedSentence", {s: "Dekanin", "davetlisi", "hapsurunca", "çaylar", "aniden", "düsürdü"}],
[["filler", 126], "DashedSentence", {s: "Dedektifin", "gözlükçüsü", "evlenince", "hediyeler", "aglanarak", "verdi"}],
[["filler", 127], "DashedSentence", {s: "Politikacinin", "sözcüsü", "yakalaninca", "açiklama", "haliyle", "kesti"}],
[["filler", 128], "DashedSentence", {s: "Kadinin", "temizlikçisi", "bayilinca", "deterjan", "tekrar", "saçti"}],
[["filler", 129], "DashedSentence", {s: "Mankenin", "nisanlisi", "vurulunca", "haber", "hizlica", "yaydi"}],
[["filler", 130], "DashedSentence", {s: "Çobanin", "sözlüsü", "tutuklaninca", "kamera", "sessizce", "söktü"}],
[["filler", 131], "DashedSentence", {s: "Dansözün", "kocasi", "varinca", "kapi", "sakince", "açti"}],
[["filler", 132], "DashedSentence", {s: "Çevirmenin", "kaynanasi", "aramayinca", "metin", "keyfince", "bitirdi"}],
[["filler", 133], "DashedSentence", {s: "Fabrikatörün", "muhasebecisi", "kovulunca", "hesap", "tamamen", "karistirdi"}],
[["filler", 134], "DashedSentence", {s: "Ünlünün", "kürkçüsü", "dönünce", "kumas", "erkenden", "dikti"}],
[["filler", 135], "DashedSentence", {s: "Rektörün", "yardimcisi", "ataninca", "kütüphane", "gece", "kapatti"}],
[["filler", 136], "DashedSentence", {s: "Sarkicinin", "taksicisi", "gecikince", "trafik", "aniden", "kilitledi"}],
[["filler", 137], "DashedSentence", {s: "Çocugun", "dadisi", "aramayinca", "bulasik", "saatlerce", "yikadi"}],
[["filler", 138], "DashedSentence", {s: "Çiftçinin", "tesisatçisi", "gelince", "borular", "güçlükle", "söktü"}],
[["filler", 139], "DashedSentence", {s: "Çiftin", "mobilyacisi", "kizinca", "koltuk", "sinirle", "parçaladi"}],
[["filler", 140], "DashedSentence", {s: "Adamin", "falcisi", "yanilinca", "fincan", "öfkeyle", "kirdi"}]


];