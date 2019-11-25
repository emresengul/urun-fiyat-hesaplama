
const ConnectX = require("../models/connect");

const mainPw = "emre123";


exports.getIndex = (req, res, next) => {
    ConnectX.getAll()
    .then((result) => {
        ConnectX.toplamFiyat()
        .then((toplam) => {
            var x = toplam[0][0];
            var y = (JSON.stringify(x)).split(":");
            var z = (y[1].split("}"))[0];
            if(z == "null"){
                var z = "henüz veri girilmemiş";
            }
            ConnectX.toplamSatis()
            .then((toplamsatis) => {
                var c = toplamsatis[0][0];
                var f = (JSON.stringify(c)).split(":");
                var g = (f[1].split("}"))[0];
                if(g == "null"){
                    var g = "henüz veri girilmemiş";
                }
                ConnectX.toplamAlis()
                .then((toplamalis) => {
                    var m = toplamalis[0][0];
                    var n = (JSON.stringify(m)).split(":");
                    var u = (n[1].split("}"))[0];
                    if(u == "null"){
                        var u = "henüz veri girilmemiş";
                    }
                    res.render("main/index",{
                        product: result[0],
                        toplamKazanc: z,
                        toplamsatis: g,
                        toplamalis:u,
                        toplamurun:result[0].length,
                        action: req.query.action,
                    })


                    
                }).catch((err) => {
                    
                });

                
                
            }).catch((err) => {
                
            });
  

            
        }).catch((err) => {
            
        });
        // console.log(kazanc)

        
    }).catch((err) => {
        console.log(err)
        
    });
    
}
exports.addNewProduct = (req,res,next)=>{
    const urunAdi = (req.body.name).trim();
    const urunSatisFiyati = Number((req.body.satis).trim());
    const urunAlisFiyati = Number((req.body.alis).trim());
    var urunAffilate = Number((req.body.affilate).trim());
    const urunPos = Number((req.body.pos).trim());
    const urunKdv = Number((req.body.kdv).trim());
    const sifre = req.body.sifre;
    if (sifre == mainPw){
        if(urunAffilate == ""){ // Hesaplama
            var urunAffilate = null;
            let a = (urunSatisFiyati * urunKdv) / 100;
            let b = (urunSatisFiyati * urunPos) / 100;
            let c = a + b + urunAlisFiyati;
            var urunKazanc = urunSatisFiyati - c;
        }
        else{
            let a = (urunSatisFiyati * urunKdv) / 100;
            let b = (urunSatisFiyati * urunPos) / 100;
            let c = (urunSatisFiyati * urunAffilate) / 100;
            let d = a + b + c + urunAlisFiyati;
            // var urunKazanc = Number((urunSatisFiyati - d).toLocaleString());
            var urunKazanc = urunSatisFiyati - d;
        }
        const savedProduct = new ConnectX();
        savedProduct.urunadi = urunAdi;
        savedProduct.urunsatisfiyati = urunSatisFiyati;
        savedProduct.urunalisfiyati = urunAlisFiyati;
        savedProduct.urunaffilate = urunAffilate;
        savedProduct.urunposkomisyon = urunPos;
        savedProduct.urunkdv = urunKdv;
        savedProduct.urunkazanc = urunKazanc;
        // console.log(urunAdi,urunSatisFiyati,urunAlisFiyati,urunAffilate,urunPos,urunKdv,sifre)
        savedProduct.saveProduct()
        .then(() => {
            res.redirect("/")
        }).catch((err) => {
            console.log(err)
        });
        
    }
    else{
        res.redirect("/");
    }
   
    
}
exports.urunuSil = (req,res,next)=>{
    const silinecekUrun = req.body.silinecekurun;
    const sifre = req.body.silineceksifre;
    if (sifre == mainPw){
        ConnectX.delete(silinecekUrun)
        .then((result) => {
            res.redirect("/?action=sil")
            
        }).catch((err) => {
            
        });
    }
    else{
        res.redirect("/?action=hata")
    }
}
