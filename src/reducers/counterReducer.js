/**
 * reducer:useReducer ile yönetilen state in nasil aldigi aksiyonlara göre nasil degisecegine karar veren fonksiyon
 * 
 * aldigi parametreler
 * >>state'in son hali
 * >>aldigi action
 * reducer fonksiyonu gelen aksiyona göre state in nasıl degisecegini karar verir
 * aksiyonları bilesenlerde dispatch methodu yardımıyla reducer'a gönderir
 * reducer fonksiyonun return ettigi deger state in son hali olur
 */




const reducer = (state, action) => {
    if (action === "ARTTIR") {
        return state + 1
    }
    if (action === "AZALT") {
        return state - 1
    }
    if (action === "SIFIRLA") { return 0 }
    return;
};
export default reducer