# Prueba Técnica C# — Parte 01

Solución en C# (.NET) para los dos casos planteados en la prueba técnica. El proyecto está organizado como una aplicación de consola con un menú interactivo que permite probar cada caso de forma independiente.

---

## 🚀 Cómo ejecutar

### Requisitos

- .NET 8 o superior

### Pasos

```bash
git clone https://github.com/JeanPaulLazaroQuispe/evaluacion-tecnica-fullstack-dotnet.git
cd evaluacion-tecnica-fullstack-dotnet/parte01-console/Parte01.ConsoleApp
dotnet run
```

El menú interactivo permite probar cada caso ingresando valores por consola.

---

## Estructura del Proyecto

```
Parte01.ConsoleApp/
├── Program.cs
├── OrderRange/
│   └── OrderRange.cs (Contiene OrderRange y OrderResult)
└── MoneyParts/
    └── MoneyParts.cs
```

---

## Caso 1 — `OrderRange`

### Descripción

La clase `OrderRange` expone el método `Build`, que recibe una colección de enteros positivos y los separa en dos listas ordenadas ascendentemente: una de números pares y otra de números impares.

**Archivo:** `OrderRange/OrderRange.cs`

### Decisiones de diseño

- Se cumple el requisito de **archivo único** consolidando el resultado en el mismo fuente.
- Se utiliza LINQ (`.Where`, `.Order`) para mantener el código declarativo, legible y con mínima lógica imperativa.
- Se valida que los números sean estrictamente positivos (`n > 0`) para cumplir el enunciado que indica "enteros positivos (1, 2, 3, …n)".
- El resultado se encapsula en un objeto `OrderResult` con dos propiedades tipadas (`Evens`, `Odds`).
- Se lanza `ArgumentNullException` si la colección recibida es `null`.

### Ejemplos

| Entrada | Impares | Pares |
|---|---|---|
| `[2, 1, 4, 5]` | `[1, 5]` | `[2, 4]` |
| `[4, 2, 9, 3, 6]` | `[3, 9]` | `[2, 4, 6]` |
| `[58, 60, 55, 48, 57, 73]` | `[55, 57, 73]` | `[48, 58, 60]` |

---

## Caso 2 — `MoneyParts`

### Descripción

La clase `MoneyParts` expone el método `Build`, que recibe un monto en soles como cadena de texto y devuelve todas las combinaciones posibles de denominaciones que suman exactamente ese monto.

**Archivo:** `MoneyParts/MoneyParts.cs`

**Denominaciones soportadas:** `0.05, 0.10, 0.20, 0.50, 1, 2, 5, 10, 20, 50, 100, 200`

### Decisiones de diseño

#### Trabajo en céntimos (enteros) con redondeo seguro

Dado que las denominaciones tienen hasta dos decimales, todas las operaciones se realizan internamente trabajando con enteros (`int`). Se utiliza `Math.Round(monto * 100)` para asegurar que la conversión de `decimal` a `int` sea exacta y libre de errores de precisión binaria.

#### Algoritmo: backtracking con índice de inicio

Se utiliza recursión con un parámetro `startIndex` que garantiza que cada combinación se genere **una sola vez** y siempre en orden no decreciente. Esto descarta duplicados sin necesidad de hashear ni ordenar resultados a posteriori.

#### Parsing robusto

Se usa `decimal.TryParse` con `CultureInfo.InvariantCulture` para aceptar formatos de punto decimal independientemente de la configuración regional.

---

### ⚠️ Limitación: tope de 10 000 combinaciones

#### ¿Por qué existe este límite?

El número de combinaciones crece de forma **combinatoriamente explosiva** con el monto. Sin ningún límite, montos a partir de ~3 o 4 soles pueden agotar la memoria de heap disponible. El tope de **10 000 combinaciones** fue elegido para permitir cubrir los ejemplos del enunciado (incluyendo 10.50) de forma segura en una demo.

#### ¿Cuál sería la solución correcta para producción?

1. **Lazy evaluation** con `yield return` para hacer streaming de resultados sin cargarlos todos en RAM.
2. **Programación dinámica** si solo se requiere el conteo.
3. **Paginación** de resultados.

---

## Tecnologías utilizadas

- **C# / .NET 8+**
- **LINQ** — filtrado y ordenamiento declarativo (Caso 1)
- **Backtracking recursivo** (Caso 2)
- **Aritmética entera** para precisión decimal (Caso 2)

---

## Autor

Solución desarrollada como parte de la Prueba Técnica C# — Parte 01.
