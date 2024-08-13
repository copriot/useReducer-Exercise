import { useReducer } from "react";
import reducer from "../reducers/counterReducer";

const Counter = () => {
  /**useState yerine yönetilmesi zor durumlarda sayısı arttıkça useReducer kullanırız
   * reducer=> statein nasıl degisicegine karar veren fonksiyon
   * initialState=>tutacagimiz statenin ilk degeri
   * 2 deger döndürür count >>statein güncel hali digeri dispatch
   * dispatch statei güncellemek icin kullanilan method
   */

  const [state, dispatch] = useReducer(reducer, 10);

  return (
    <div className="d-flex gap-4 align-items-center">
      <button onClick={() => dispatch("SIFIRLA")}>Sıfırla</button>
      <button onClick={() => dispatch("ARTTIR")}>+</button>
      <span className="fs-1 lead">{state}</span>
      <button onClick={() => dispatch("AZALT")}>-</button>
    </div>
  );
};

export default Counter;
