const connection = require("../utility/database");

module.exports = class ConnectX {
    constructor(urunadi,urunsatisfiyati,urunalisfiyati,urunaffilate,urunposkomisyon,urunkdv,urunkazanc){
        this.urunadi = urunadi;
        this.urunsatisfiyati = urunsatisfiyati;
        this.urunalisfiyati = urunalisfiyati;
        this.urunaffilate = urunaffilate;
        this.urunposkomisyon = urunposkomisyon;
        this.urunkdv = urunkdv;
        this.urunkazanc = urunkazanc;
    }
    saveProduct(){
        return connection.execute("INSERT INTO urun (urunadi,urunsatisfiyati,urunalisfiyati,urunaffilate,urunposkomisyon,urunkdv,urunkazanc) VALUES(?,?,?,?,?,?,?)",[this.urunadi,this.urunsatisfiyati,this.urunalisfiyati,this.urunaffilate,this.urunposkomisyon,this.urunkdv,this.urunkazanc])
    }
    static getByProfile(url){
        return connection.execute("SELECT * FROM profile WHERE profileurl=?",[url])
    }
    static getAll(){
        return connection.execute("SELECT * FROM urun");
    }
    static toplamFiyat(){
        return connection.execute("SELECT SUM(urunkazanc) FROM urun")
    }
    static toplamSatis(){
        return connection.execute("SELECT SUM(urunsatisfiyati) FROM urun")
    }
    static toplamAlis(){
        return connection.execute("SELECT SUM(urunalisfiyati) FROM urun")
    }
    // static getByUrl(url){
    //     return connection.execute("SELECT * FROM generator WHERE url=?",[url]);
    // }
    // static getByCode(code){
    //     return connection.execute("SELECT * FROM generator WHERE code=?",[code]);
    // }
    // static getByRaffleRoom(raffleroom){
    //     return connection.execute("SELECT * FROM generator WHERE raffleroom=?",[raffleroom]);
    // }
    // static AddNewUser(code,name,active,raffleroom){
    //     return connection.execute("UPDATE generator SET name=?,activisioncount=?,raffleroom=? WHERE code=? ",[name,active,raffleroom,code,])
    // }
    // static getByWinner(winner){
    //     return connection.execute("SELECT * FROM generator WHERE winner=?",[winner]);        
    // }
    // static updateWinner(code,winnerStatus){
    //     return connection.execute("UPDATE generator SET winner=? WHERE code=? ",[winnerStatus,code])
    // }
    static reset(){
        return connection.execute("TRUNCATE urun")
    }
    static delete(id){
        return connection.execute("DELETE FROM urun WHERE id=?",[id])
    }
}