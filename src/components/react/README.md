# React islands

Este directorio es exclusivamente para componentes que necesiten estado o comportamiento en el navegador.

Regla del proyecto: si una pieza puede renderizarse con Astro, HTML o CSS, no debe convertirse en React. Cuando una isla React sea necesaria, usa la directiva de hidratación menos agresiva posible (`client:idle`, `client:visible`, etc.) y justifica `client:load`.
