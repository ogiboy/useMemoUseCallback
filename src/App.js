import "./styles.css";
import { useState, useMemo, useCallback } from "react";

const wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) now = Date.now();
};

const wrapperFunction = (cb) => {
  // ağır hesaplamalar yapan fonksiyonumuz
  wait(300);
  return cb;
};

const SomeComponent = (props) => {
  return null;
};

export default function App() {
  const [state, setState] = useState(1);

  // wrapperFunction useMemo ve useCallback içinde doğrudan çalıştırıldığından
  // her zaman her renderda çalışacaktır bu da bu hookların kullanılma anlamına ters düşmektedir.
  // Callback fonksiyon olarak çağırıp bağımlıkları ayarladığımızda ise
  // sadece bağımlılıkları değiştiğinde çalışacaklardır.

  const data = useMemo(() => {
    return wrapperFunction(() => [1, 2, 3]);
  }, [wrapperFunction]);

  const onSubmit = useCallback(() => {
    wrapperFunction(() => {
      // burada bir şeyler yapılacak
    });
  }, [wrapperFunction]);

  return (
    <div className="App">
      <h1>useMemo vs useCallback example</h1>
      Click the button to re-render
      <button onClick={() => setState((s) => s + 1)}>click me {state}</button>
      <SomeComponent data={data} onSubmit={onSubmit} />
    </div>
  );
}
