var shuffleSequence = seq("setcounter", "intro", "sepprac",
                          sepWith("sepprac", seq("prac")), "presepA", "dummysep", "sepexp",
                          sepWith("sepexp", rshuffle(startsWith("condition_"), startsWith("filler"))));
var practiceItemTypes = ["prac"];
var completionMessage = "Deneye kat?ld???n?z i?in te?ekk?rler"


var defaults = [
    "Separator", {
        normalMessage: "L?tfen bekleyiniz."
    },
    "DashedSentence", {
        mode: "speeded acceptability", display: "in place",
        wordTime:300,
        wordPauseTime:200,
    },
    "DashedAcceptabilityJudgment", {
        hasCorrect: false
    },
    "Question", {
        as: [["f","K?T? (F'e bas?n)"],["j","?Y? (J'ye bas?n)"]],
        q: ["Bu c?mle nas?l bir c?mleydi?"],
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
    }
];

 // insert breaks
function modifyRunningOrder(ro) {

 for (var i = 0; i < ro.length; ++i) {
 if (i % 20 == 25 && i > 20 && i < 200) {
 ro[i].push(new DynamicElement(
 "Message",
 { html: "<p>K?sa bir ara verelim. Deney 10 saniye i?erisinde devam edecektir.</p>", transfer: 10000 },
 true
 ));
 }
 }
 return ro;
 }



var items = [

   ["setcounter", "__SetCounter__", { }], 

   ["intro", "Form", {consentRequired: true, html: {include: "intro.html" }} ],
   ["intro", "Form", {consentRequired: true, html: {include: "intro1.html" }} ],
   ["exit", "Form", {consentRequired: false, html: {include: "exit.html" }} ],
    
    ["sepprac", "Separator",  {transfer: "keypress", normalMessage: "? ?", ignoreFailure: true} ],
    
    ["sepexp", "Separator",  {transfer: "keypress", normalMessage: "? ?", ignoreFailure: true} ],

    ["break", "Message", {
        html: { include: "break.html" },
        transfer: "keypress"
    } ],

// Practice
    
["prac", "DashedSentence", {s: ["Bu", "k?s?m", "deneye", "ve", "sunum", "y?ntemine", "al??man?z", "i?in", "bulunmaktad?r."]}],
["prac", "DashedSentence", {s: ["Bu", "c?mle", "?ncekinden", "daha", "uzun", "bir", "c?mle.", "          ", "Okumas?", "biraz", "daha", "zor", "olsa_da", "sunum", "?ekli", "asl?nda", "ayn?."]}],

["prac", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Harika! ?imdi deneyde g?rece?iniz t?rden c?mlelere bakal?m. Birazdan g?rece?iniz c?mleler ?Y? diyebilece?imiz c?mlelerden. "],
                           ["p", "Devam etmek i?in 'bo?luk' tu?una bas?n?z."]
                           ]}],

["prac", "DashedSentence", {s: ["Teyzemin", "kom?usu", "yerden", "kalk?p", "oturunca", "?n?ndeki", "kedinin", "ba??n?", "ok?ad?."]}],
["prac", "DashedSentence", {s: ["Utku'nin", "k?z?", "y?r?yene", "kadar", "bir","s?r?","oyuncak","al?nm??t?"]}],

["prac", Message, {consentRequired: false, transfer: "keypress",
                    html: ["div",
                          ["p", "Az ?nce okudu?unuz c?mleler gibi c?mleler T?rk?e'de kabul edilebilir c?mlelerdir."],
                          ["p", "Bir de K?T? diyebilece?imiz c?mlelerden ?rnekler g?relim."],
                          ["p", "Devam etmek i?in 'bo?luk' tu?una bas?n?z."]
                          ]}],

["prac", "DashedSentence", {s: ["??rencinin", "asistan?", "gelince", "ders", "?ok", "g?zel", "anlatt?."]}],
["prac", "DashedSentence", {s: ["Asistan?n", "??rencisi", "dinlenince", "ders", "ara", "verdiler."]}],   

["prac", Message, {consentRequired: false, transfer: "keypress",
                    html: ["div",
                          ["p", "Nas?l gidiyor? Elinin al??mas? i?in biraz daha ?rnek c?mle g?relim."],
                          ["p", "Devam etmek i?in 'bo?luk' tu?una bas?n?z."]
                          ]}],

["prac", "DashedSentence", {s: ["?mam?n", "kedisi", "do?urunca", "mahalle", "sevin?", "olduk?a" , "katland?."]}],
["prac", "DashedSentence", {s: ["Evin","cephesi", "bitince", "boyalar?","toplay?p","gittiler."]}],
["prac", "DashedSentence", {s: ["Kimsenin","?ocu?u", "a?lamay?nca","yeni", "yaz?lan", "kitap", "kimseye", "okumad?"]}],

    
["prac", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Elinizin ?s?nd???n? umuyorum. Haz?r oldu?unuz hissetti?inizde 'bo?luk' tu?una basarak ilerleyeiniz."],
                           ["p", "NOT: Verece?iniz cevaplar ?zerine ?ok d???nmeyin! Tamamlayaca??n?z deneyde 'do?ru' ya da 'yanl??' cevap bulunmamaktad?r. Deney yakla??k X dakika s?recek ve bu s?re zarf?nda deneye odaklanman?z gerekmektedir. Kat?l?m?n?z i?in ?ok te?ekk?rler!"]
                           ]}],


["presepA", Separator, {transfer: 3000, normalMessage: "Telefonunuzu ve di?er dikkat da??t?c? unsurlardan deney esnas?nda uzak durman?z bizim i?in ?ok daha iyi olacakt?." }],
["dummysep", Separator, {transfer: 100, normalMessage: ""}],


// "conditional items" Stimuli List: sample items

[["condition_a", 1], "DashedSentence", {s: "yöneticilerin", "aşçısı", "mutfakta_sürekli", "zıpladılar"}],
[["condition_b", 1], "DashedSentence", {s: "yöneticilerin", "aşçısı", "mutfakta_sürekli", "zıpladı"}],
[["condition_c", 1], "DashedSentence", {s: "yöneticinin", "aşçısı", "mutfakta_sürekli", "zıpladılar"}],
[["condition_d", 1], "DashedSentence", {s: "yöneticinin", "aşçısı", "mutfakta_sürekli", "zıpladı"}],
[["condition_a", 2], "DashedSentence", {s: "öğrencilerin", "ablası", "sınıfta_birden", "bayıldılar"}],
[["condition_b", 2], "DashedSentence", {s: "öğrencilerin", "ablası", "sınıfta_birden", "bayıldı"}],
[["condition_c", 2], "DashedSentence", {s: "öğrencinin", "ablası", "sınıfta_birden", "bayıldılar"}],
[["condition_d", 2], "DashedSentence", {s: "öğrencinin", "ablası", "sınıfta_birden", "bayıldı"}],
[["condition_a", 3], "DashedSentence", {s: "marangozların", "abisi", "atölyeden_hızla", "uzaklaştılar"}],
[["condition_b", 3], "DashedSentence", {s: "marangozların", "abisi", "atölyeden_hızla", "uzaklaştı"}],
[["condition_c", 3], "DashedSentence", {s: "marangozun", "abisi", "atölyeden_hızla", "uzaklaştılar"}],
[["condition_d", 3], "DashedSentence", {s: "marangozun", "abisi", "atölyeden_hızla", "uzaklaştı"}],
[["condition_a", 4], "DashedSentence", {s: "mahallelilerin", "emlakçısı", "aniden_küstahça", "güldüler"}],
[["condition_b", 4], "DashedSentence", {s: "mahallelilerin", "emlakçısı", "aniden_küstahça", "güldü"}],
[["condition_c", 4], "DashedSentence", {s: "mahallelinin", "emlakçısı", "aniden_küstahça", "güldüler"}],
[["condition_d", 4], "DashedSentence", {s: "mahallelinin", "emlakçısı", "aniden_küstahça", "güldü"}],
[["condition_a", 5], "DashedSentence", {s: "kızların", "halası", "sabaha_kadar", "ağladılar"}],
[["condition_b", 5], "DashedSentence", {s: "kızların", "halası", "sabaha_kadar", "ağladı"}],
[["condition_c", 5], "DashedSentence", {s: "kızın", "halası", "sabaha_kadar", "ağladılar"}],
[["condition_d", 5], "DashedSentence", {s: "kızın", "halası", "sabaha_kadar", "ağladı"}],
[["condition_a", 6], "DashedSentence", {s: "damatların", "dayısı", "arada_sırada", "sıkıldılar"}],
[["condition_b", 6], "DashedSentence", {s: "damatların", "dayısı", "arada_sırada", "sıkıldı"}],
[["condition_c", 6], "DashedSentence", {s: "damatın", "dayısı", "arada_sırada", "sıkıldılar"}],
[["condition_d", 6], "DashedSentence", {s: "damatın", "dayısı", "arada_sırada", "sıkıldı"}],
[["condition_a", 7], "DashedSentence", {s: "doktorların", "çiçekçisi", "günden_güne", "zayıfladılar"}],
[["condition_b", 7], "DashedSentence", {s: "doktorların", "çiçekçisi", "günden_güne", "zayıfladı"}],
[["condition_c", 7], "DashedSentence", {s: "doktorun", "çiçekçisi", "günden_güne", "zayıfladılar"}],
[["condition_d", 7], "DashedSentence", {s: "doktorun", "çiçekçisi", "günden_güne", "zayıfladı"}],
[["condition_a", 8], "DashedSentence", {s: "stajyerlerin", "eniştesi", "geceden_önce", "uyudular"}],
[["condition_b", 8], "DashedSentence", {s: "stajyerlerin", "eniştesi", "geceden_önce", "uyudu"}],
[["condition_c", 8], "DashedSentence", {s: "stajyerin", "eniştesi", "geceden_önce", "uyudular"}],
[["condition_d", 8], "DashedSentence", {s: "stajyerin", "eniştesi", "geceden_önce", "uyudu"}],
[["condition_a", 9], "DashedSentence", {s: "aristokratların", "hizmetçisi", "yorgun_argın", "yattılar"}],
[["condition_b", 9], "DashedSentence", {s: "aristokratların", "hizmetçisi", "yorgun_argın", "yattı"}],
[["condition_c", 9], "DashedSentence", {s: "aristokratın", "hizmetçisi", "yorgun_argın", "yattılar"}],
[["condition_d", 9], "DashedSentence", {s: "aristokratın", "hizmetçisi", "yorgun_argın", "yattı"}],
[["condition_a", 10], "DashedSentence", {s: "konuşmacıların", "sunucusu", "olağanüstü_hızlı", "koştular"}],
[["condition_b", 10], "DashedSentence", {s: "konuşmacıların", "sunucusu", "olağanüstü_hızlı", "koştu"}],
[["condition_c", 10], "DashedSentence", {s: "konuşmacının", "sunucusu", "olağanüstü_hızlı", "koştular"}],
[["condition_d", 10], "DashedSentence", {s: "konuşmacının", "sunucusu", "olağanüstü_hızlı", "koştu"}],
[["condition_a", 11], "DashedSentence", {s: "psikiyatristlerin", "eczacısı", "aç_susuz", "dolaştılar"}],
[["condition_b", 11], "DashedSentence", {s: "psikiyatristlerin", "eczacısı", "aç_susuz", "dolaştı"}],
[["condition_c", 11], "DashedSentence", {s: "psikiyatristin", "eczacısı", "aç_susuz", "dolaştılar"}],
[["condition_d", 11], "DashedSentence", {s: "psikiyatristin", "eczacısı", "aç_susuz", "dolaştı"}],
[["condition_a", 12], "DashedSentence", {s: "politikacıların", "hocası", "adliyeden_çabucak", "çıktılar"}],
[["condition_b", 12], "DashedSentence", {s: "politikacıların", "hocası", "adliyeden_çabucak", "çıktı"}],
[["condition_c", 12], "DashedSentence", {s: "politikacının", "hocası", "adliyeden_çabucak", "çıktılar"}],
[["condition_d", 12], "DashedSentence", {s: "politikacının", "hocası", "adliyeden_çabucak", "çıktı"}],
[["condition_a", 13], "DashedSentence", {s: "hakimlerin", "çaycısı", "nedensiz_yere", "kızdılar"}],
[["condition_b", 13], "DashedSentence", {s: "hakimlerin", "çaycısı", "nedensiz_yere", "kızdı"}],
[["condition_c", 13], "DashedSentence", {s: "hakimin", "çaycısı", "nedensiz_yere", "kızdılar"}],
[["condition_d", 13], "DashedSentence", {s: "hakimin", "çaycısı", "nedensiz_yere", "kızdı"}],
[["condition_a", 14], "DashedSentence", {s: "oyuncuların", "hemşiresi", "etrafta_amaçsızca", "gezdiler"}],
[["condition_b", 14], "DashedSentence", {s: "oyuncuların", "hemşiresi", "etrafta_amaçsızca", "gezdi"}],
[["condition_c", 14], "DashedSentence", {s: "oyuncunun", "hemşiresi", "etrafta_amaçsızca", "gezdiler"}],
[["condition_d", 14], "DashedSentence", {s: "oyuncunun", "hemşiresi", "etrafta_amaçsızca", "gezdi"}],
[["condition_a", 15], "DashedSentence", {s: "öğretmenlerin", "müdiresi", "biraz_önce", "aradılar"}],
[["condition_b", 15], "DashedSentence", {s: "öğretmenlerin", "müdiresi", "biraz_önce", "aradı"}],
[["condition_c", 15], "DashedSentence", {s: "öğretmenin", "müdiresi", "biraz_önce", "aradılar"}],
[["condition_d", 15], "DashedSentence", {s: "öğretmenin", "müdiresi", "biraz_önce", "aradı"}],
[["condition_a", 16], "DashedSentence", {s: "milyonerlerin", "terzisi", "tamamen_gereksizce", "bağırdılar"}],
[["condition_b", 16], "DashedSentence", {s: "milyonerlerin", "terzisi", "tamamen_gereksizce", "bağırdı"}],
[["condition_c", 16], "DashedSentence", {s: "milyonerin", "terzisi", "tamamen_gereksizce", "bağırdılar"}],
[["condition_d", 16], "DashedSentence", {s: "milyonerin", "terzisi", "tamamen_gereksizce", "bağırdı"}],
[["condition_a", 17], "DashedSentence", {s: "bebeklerin", "bakıcısı", "çok_kibar", "davrandılar"}],
[["condition_b", 17], "DashedSentence", {s: "bebeklerin", "bakıcısı", "çok_kibar", "davrandı"}],
[["condition_c", 17], "DashedSentence", {s: "bebeğin", "bakıcısı", "çok_kibar", "davrandılar"}],
[["condition_d", 17], "DashedSentence", {s: "bebeğin", "bakıcısı", "çok_kibar", "davrandı"}],
[["condition_a", 18], "DashedSentence", {s: "çocukların", "dadısı", "yüksek_sesle", "konuştular"}],
[["condition_b", 18], "DashedSentence", {s: "çocukların", "dadısı", "yüksek_sesle", "konuştu"}],
[["condition_c", 18], "DashedSentence", {s: "çocuğun", "dadısı", "yüksek_sesle", "konuştular"}],
[["condition_d", 18], "DashedSentence", {s: "çocuğun", "dadısı", "yüksek_sesle", "konuştu"}],
[["condition_a", 19], "DashedSentence", {s: "futbolcuların", "sürücüsü", "çok_yavaş", "çalıştılar"}],
[["condition_b", 19], "DashedSentence", {s: "futbolcuların", "sürücüsü", "çok_yavaş", "çalıştı"}],
[["condition_c", 19], "DashedSentence", {s: "futbolcunun", "sürücüsü", "çok_yavaş", "çalıştılar"}],
[["condition_d", 19], "DashedSentence", {s: "futbolcunun", "sürücüsü", "çok_yavaş", "çalıştı"}],
[["condition_a", 20], "DashedSentence", {s: "modacıların", "taksicisi", "saatlerce_durmaksızın", "içtiler"}],
[["condition_b", 20], "DashedSentence", {s: "modacıların", "taksicisi", "saatlerce_durmaksızın", "içti"}],
[["condition_c", 20], "DashedSentence", {s: "modacının", "taksicisi", "saatlerce_durmaksızın", "içtiler"}],
[["condition_d", 20], "DashedSentence", {s: "modacının", "taksicisi", "saatlerce_durmaksızın", "içti"}],
[["condition_a", 21], "DashedSentence", {s: "sanatçıların", "çalgıcısı", "feci_bir_şekilde", "öldüler"}],
[["condition_b", 21], "DashedSentence", {s: "sanatçıların", "çalgıcısı", "feci_bir_şekilde", "öldü"}],
[["condition_c", 21], "DashedSentence", {s: "sanatçının", "çalgıcısı", "feci_bir_şekilde", "öldüler"}],
[["condition_d", 21], "DashedSentence", {s: "sanatçının", "çalgıcısı", "feci_bir_şekilde", "öldü"}],
[["condition_a", 22], "DashedSentence", {s: "dedektiflerin", "dişçisi", "ilk_kez_çılgınca", "eğlendiler"}],
[["condition_b", 22], "DashedSentence", {s: "dedektiflerin", "dişçisi", "ilk_kez_çılgınca", "eğlendi"}],
[["condition_c", 22], "DashedSentence", {s: "dedektifin", "dişçisi", "ilk_kez_çılgınca", "eğlendiler"}],
[["condition_d", 22], "DashedSentence", {s: "dedektifin", "dişçisi", "ilk_kez_çılgınca", "eğlendi"}],
[["condition_a", 23], "DashedSentence", {s: "esnafların", "müşterisi", "şikayettten_hemen_sonra", "sustular"}],
[["condition_b", 23], "DashedSentence", {s: "esnafların", "müşterisi", "şikayettten_hemen_sonra", "sustu"}],
[["condition_c", 23], "DashedSentence", {s: "esnafın", "müşterisi", "şikayettten_hemen_sonra", "sustular"}],
[["condition_d", 23], "DashedSentence", {s: "esnafın", "müşterisi", "şikayettten_hemen_sonra", "sustu"}],
[["condition_a", 24], "DashedSentence", {s: "şarkıcıların", "koruması", "her_zamanki_gibi", "geciktiler"}],
[["condition_b", 24], "DashedSentence", {s: "şarkıcıların", "koruması", "her_zamanki_gibi", "gecikti"}],
[["condition_c", 24], "DashedSentence", {s: "şarkıcının", "koruması", "her_zamanki_gibi", "geciktiler"}],
[["condition_d", 24], "DashedSentence", {s: "şarkıcının", "koruması", "her_zamanki_gibi", "gecikti"}],
[["condition_a", 25], "DashedSentence", {s: "göstericilerin", "izleyicisi", "akşama_kadar_sessizce", "oturdular"}],
[["condition_b", 25], "DashedSentence", {s: "göstericilerin", "izleyicisi", "akşama_kadar_sessizce", "oturdu"}],
[["condition_c", 25], "DashedSentence", {s: "göstericinin", "izleyicisi", "akşama_kadar_sessizce", "oturdular"}],
[["condition_d", 25], "DashedSentence", {s: "göstericinin", "izleyicisi", "akşama_kadar_sessizce", "oturdu"}],
[["condition_a", 26], "DashedSentence", {s: "cerrahların", "hastası", "akşamki_gösteriden_önce", "kaçtılar"}],
[["condition_b", 26], "DashedSentence", {s: "cerrahların", "hastası", "akşamki_gösteriden_önce", "kaçtı"}],
[["condition_c", 26], "DashedSentence", {s: "cerrahın", "hastası", "akşamki_gösteriden_önce", "kaçtılar"}],
[["condition_d", 26], "DashedSentence", {s: "cerrahın", "hastası", "akşamki_gösteriden_önce", "kaçtı"}],
[["condition_a", 27], "DashedSentence", {s: "dalgıçların", "annesi", "bile_bile", "geç kaldılar"}],
[["condition_b", 27], "DashedSentence", {s: "dalgıçların", "annesi", "bile_bile", "geç kaldı"}],
[["condition_c", 27], "DashedSentence", {s: "dalgıcın", "annesi", "bile_bile", "geç kaldılar"}],
[["condition_d", 27], "DashedSentence", {s: "dalgıcın", "annesi", "bile_bile", "geç kaldı"}],
[["condition_a", 28], "DashedSentence", {s: "fabrikatörlerin", "işçisi", "beklenmedik_bir_anda", "hastalandılar"}],
[["condition_b", 28], "DashedSentence", {s: "fabrikatörlerin", "işçisi", "beklenmedik_bir_anda", "hastalandı"}],
[["condition_c", 28], "DashedSentence", {s: "fabrikatörün", "işçisi", "beklenmedik_bir_anda", "hastalandılar"}],
[["condition_d", 28], "DashedSentence", {s: "fabrikatörün", "işçisi", "beklenmedik_bir_anda", "hastalandı"}],
[["condition_a", 29], "DashedSentence", {s: "komedyenlerin", "yardımcısı", "poyrazdan_dolayı", "üşüdüler"}],
[["condition_b", 29], "DashedSentence", {s: "komedyenlerin", "yardımcısı", "poyrazdan_dolayı", "üşüdü"}],
[["condition_c", 29], "DashedSentence", {s: "komedyenin", "yardımcısı", "poyrazdan_dolayı", "üşüdüler"}],
[["condition_d", 29], "DashedSentence", {s: "komedyenin", "yardımcısı", "poyrazdan_dolayı", "üşüdü"}],
[["condition_a", 30], "DashedSentence", {s: "şoförlerin", "yolcusu", "yemekten_sonra_yine", "acıktılar"}],
[["condition_b", 30], "DashedSentence", {s: "şoförlerin", "yolcusu", "yemekten_sonra_yine", "acıktı"}],
[["condition_c", 30], "DashedSentence", {s: "şoförün", "yolcusu", "yemekten_sonra_yine", "acıktılar"}],
[["condition_d", 30], "DashedSentence", {s: "şoförün", "yolcusu", "yemekten_sonra_yine", "acıktı"}],
[["condition_a", 31], "DashedSentence", {s: "mühendislerin", "kapıcısı", "erken_ödemeden_dolayı", "sevindiler"}],
[["condition_b", 31], "DashedSentence", {s: "mühendislerin", "kapıcısı", "erken_ödemeden_dolayı", "sevindi"}],
[["condition_c", 31], "DashedSentence", {s: "mühendisin", "kapıcısı", "erken_ödemeden_dolayı", "sevindiler"}],
[["condition_d", 31], "DashedSentence", {s: "mühendisin", "kapıcısı", "erken_ödemeden_dolayı", "sevindi"}],
[["condition_a", 32], "DashedSentence", {s: "pazarcıların", "nakliyecisi", "mesaiden_hemen_sonra", "uzandılar"}],
[["condition_b", 32], "DashedSentence", {s: "pazarcıların", "nakliyecisi", "mesaiden_hemen_sonra", "uzandı"}],
[["condition_c", 32], "DashedSentence", {s: "pazarcının", "nakliyecisi", "mesaiden_hemen_sonra", "uzandılar"}],
[["condition_d", 32], "DashedSentence", {s: "pazarcının", "nakliyecisi", "mesaiden_hemen_sonra", "uzandı"}],
[["condition_a", 33], "DashedSentence", {s: "oyuncuların", "eğitimcisi", "ilk_denemede_epey", "zorlandılar"}],
[["condition_b", 33], "DashedSentence", {s: "oyuncuların", "eğitimcisi", "ilk_denemede_epey", "zorlandı"}],
[["condition_c", 33], "DashedSentence", {s: "oyuncunun", "eğitimcisi", "ilk_denemede_epey", "zorlandılar"}],
[["condition_d", 33], "DashedSentence", {s: "oyuncunun", "eğitimcisi", "ilk_denemede_epey", "zorlandı"}],
[["condition_a", 34], "DashedSentence", {s: "mankenlerin", "modacısı", "geç_bir_vakitte", "kalktılar"}],
[["condition_b", 34], "DashedSentence", {s: "mankenlerin", "modacısı", "geç_bir_vakitte", "kalktı"}],
[["condition_c", 34], "DashedSentence", {s: "mankenin", "modacısı", "geç_bir_vakitte", "kalktılar"}],
[["condition_d", 34], "DashedSentence", {s: "mankenin", "modacısı", "geç_bir_vakitte", "kalktı"}],
[["condition_a", 35], "DashedSentence", {s: "konukların", "teyzesi", "müthiş_bir_ağrıyla", "uyandılar"}],
[["condition_b", 35], "DashedSentence", {s: "konukların", "teyzesi", "müthiş_bir_ağrıyla", "uyandı"}],
[["condition_c", 35], "DashedSentence", {s: "konuğun", "teyzesi", "müthiş_bir_ağrıyla", "uyandılar"}],
[["condition_d", 35], "DashedSentence", {s: "konuğun", "teyzesi", "müthiş_bir_ağrıyla", "uyandı"}],
[["condition_a", 36], "DashedSentence", {s: "oğlanların", "amcası", "boş_bir_caddede", "yürüdüler"}],
[["condition_b", 36], "DashedSentence", {s: "oğlanların", "amcası", "boş_bir_caddede", "yürüdü"}],
[["condition_c", 36], "DashedSentence", {s: "oğlanın", "amcası", "boş_bir_caddede", "yürüdüler"}],
[["condition_d", 36], "DashedSentence", {s: "oğlanın", "amcası", "boş_bir_caddede", "yürüdü"}],
[["condition_a", 37], "DashedSentence", {s: "avukatların", "komşusu", "toplantıdan_sonra_birden", "sarardılar"}],
[["condition_b", 37], "DashedSentence", {s: "avukatların", "komşusu", "toplantıdan_sonra_birden", "sarardı"}],
[["condition_c", 37], "DashedSentence", {s: "avukatın", "komşusu", "toplantıdan_sonra_birden", "sarardılar"}],
[["condition_d", 37], "DashedSentence", {s: "avukatın", "komşusu", "toplantıdan_sonra_birden", "sarardı"}],
[["condition_a", 38], "DashedSentence", {s: "ünlülerin", "falcısı", "yabancı_bir_ülkede", "kayboldular"}],
[["condition_b", 38], "DashedSentence", {s: "ünlülerin", "falcısı", "yabancı_bir_ülkede", "kayboldu"}],
[["condition_c", 38], "DashedSentence", {s: "ünlünün", "falcısı", "yabancı_bir_ülkede", "kayboldular"}],
[["condition_d", 38], "DashedSentence", {s: "ünlünün", "falcısı", "yabancı_bir_ülkede", "kayboldu"}],
[["condition_a", 39], "DashedSentence", {s: "çiftçilerin", "bekçisi", "normalden_çok_yavaş", "gezindiler"}],
[["condition_b", 39], "DashedSentence", {s: "çiftçilerin", "bekçisi", "normalden_çok_yavaş", "gezindi"}],
[["condition_c", 39], "DashedSentence", {s: "çiftçinin", "bekçisi", "normalden_çok_yavaş", "gezindiler"}],
[["condition_d", 39], "DashedSentence", {s: "çiftçinin", "bekçisi", "normalden_çok_yavaş", "gezindi"}],
[["condition_a", 40], "DashedSentence", {s: "kadınların", "ninesi", "geçen_seneye_göre", "dinçleştiler"}],
[["condition_b", 40], "DashedSentence", {s: "kadınların", "ninesi", "geçen_seneye_göre", "dinçleşti"}],
[["condition_c", 40], "DashedSentence", {s: "kadının", "ninesi", "geçen_seneye_göre", "dinçleştiler"}],
[["condition_d", 40], "DashedSentence", {s: "kadının", "ninesi", "geçen_seneye_göre", "dinçleşti"}],

// FILLERS


[["filler", 101], "DashedSentence", {s: "Adamın", "annesi", "fenalaşınca", "inek", "kurban", "ettiler"}],
[["filler", 102], "DashedSentence", {s: "Sosyologun", "öğrencisi", "konuşunca", "tutarsızlık", "açığa", "çıkardılar"}],
[["filler", 103], "DashedSentence", {s: "Doktorun", "hemşiresi", "gelene kadar", "hasta", "taburcu", "ettiler"}],
[["filler", 104], "DashedSentence", {s: "Kemancının", "sevgilisi", "ölünce", "mezar", "ziyaret", "ettiler"}],
[["filler", 105], "DashedSentence", {s: "Hocanın", "kapıcısı", "bayılınca", "doktor", "rahatsız", "ettiler"}],
[["filler", 106], "DashedSentence", {s: "Medyumun", "kocası", "saçmalayınca", "falcı", "zengin", "ettiler"}],
[["filler", 107], "DashedSentence", {s: "Başkanın", "dişçisi", "tırsınca", "stajyer", "kabul", "ettiler"}],
[["filler", 108], "DashedSentence", {s: "Eleştirmenin", "karısı", "kıvırtınca", "sapık", "tahrik", "ettiler"}],
[["filler", 109], "DashedSentence", {s: "Patronun", "kahyası", "düşünce", "düşman", "mutlu", "ettiler"}],
[["filler", 110], "DashedSentence", {s: "Müdürün", "aşçısı", "hazırlanınca", "yemek", "hazır", "ettiler"}],
[["filler", 111], "DashedSentence", {s: "Çocuğun", "abisi", "üzülünce", "oyuncak", "icat", "ettiler"}],
[["filler", 112], "DashedSentence", {s: "Psikologun", "hastası", "gecikince", "vakit", "hiç", "ettiler"}],
[["filler", 113], "DashedSentence", {s: "Ressamın", "tedarikçisi", "kaybolunca", "tuval", "ithal", "ettiler"}],
[["filler", 114], "DashedSentence", {s: "Dişçinin", "temizlikçisi", "yorulunca", "hademe", "ikna", "ettiler"}],
[["filler", 115], "DashedSentence", {s: "Kimyagerin", "kuryesi", "hapşurunca", "deney", "akıl", "ettiler"}],
[["filler", 116], "DashedSentence", {s: "Mankenin", "motorcusu", "sızınca", "çırak", "meşgul", "ettiler"}],
[["filler", 117], "DashedSentence", {s: "Dekanın", "davetlisi", "geçince", "seyirci", "ayağa", "kaldırdılar"}],
[["filler", 118], "DashedSentence", {s: "Mafyanın", "yatırımcısı", "batınca", "kuyumcu", "tehdit", "ettiler"}],
[["filler", 119], "DashedSentence", {s: "Aşçının", "manavı", "kapanınca", "et", "tedarik", "ettiler"}],
[["filler", 120], "DashedSentence", {s: "Öğrencinin", "hocası", "anlatınca", "makine", "icat", "ettiler"}],
[["filler", 121], "DashedSentence", {s: "Bakanın", "yardımcısı", "bulununca", "koltuk", "geri", "getirdi"}],
[["filler", 122], "DashedSentence", {s: "Öğrencinin", "hocası", "ayrılınca", "proje", "birden", "unuttu"}],
[["filler", 123], "DashedSentence", {s: "Pizzacının", "kuryesi", "tökezleyince", "soslar", "yere", "saçtı"}],
[["filler", 124], "DashedSentence", {s: "Kralın", "soytarısı", "asılınca", "şapka", "yerinde", "buldu"}],
[["filler", 125], "DashedSentence", {s: "Dekanın", "davetlisi", "hapşurunca", "çaylar", "aniden", "düşürdü"}],
[["filler", 126], "DashedSentence", {s: "Dedektifin", "gözlükçüsü", "evlenince", "hediyeler", "ağlanarak", "verdi"}],
[["filler", 127], "DashedSentence", {s: "Politikacının", "sözcüsü", "yakalanınca", "açıklama", "haliyle", "kesti"}],
[["filler", 128], "DashedSentence", {s: "Kadının", "temizlikçisi", "bayılınca", "deterjan", "tekrar", "saçtı"}],
[["filler", 129], "DashedSentence", {s: "Mankenin", "nişanlısı", "vurulunca", "haber", "hızlıca", "yaydı"}],
[["filler", 130], "DashedSentence", {s: "Çobanın", "sözlüsü", "tutuklanınca", "kamera", "sessizce", "söktü"}],
[["filler", 131], "DashedSentence", {s: "Dansözün", "kocası", "varınca", "kapı", "sakince", "açtı"}],
[["filler", 132], "DashedSentence", {s: "Çevirmenin", "kaynanası", "aramayınca", "metin", "keyfince", "bitirdi"}],
[["filler", 133], "DashedSentence", {s: "Fabrikatörün", "muhasebecisi", "kovulunca", "hesap", "tamamen", "karıştırdı"}],
[["filler", 134], "DashedSentence", {s: "Ünlünün", "kürkçüsü", "dönünce", "kumaş", "erkenden", "dikti"}],
[["filler", 135], "DashedSentence", {s: "Rektörün", "yardımcısı", "atanınca", "kütüphane", "gece", "kapattı"}],
[["filler", 136], "DashedSentence", {s: "Şarkıcının", "taksicisi", "gecikince", "trafik", "aniden", "kilitledi"}],
[["filler", 137], "DashedSentence", {s: "Çocuğun", "dadısı", "aramayınca", "bulaşık", "saatlerce", "yıkadı"}],
[["filler", 138], "DashedSentence", {s: "Çiftçinin", "tesisatçısı", "gelince", "borular", "güçlükle", "söktü"}],
[["filler", 139], "DashedSentence", {s: "Çiftin", "mobilyacısı", "kızınca", "koltuk", "sinirle", "parçaladı"}],
[["filler", 140], "DashedSentence", {s: "Adamın", "falcısı", "yanılınca", "fincan", "öfkeyle", "kırdı"}]


];