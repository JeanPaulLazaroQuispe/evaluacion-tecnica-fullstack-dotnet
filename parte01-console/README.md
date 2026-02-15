# Prueba Técnica C# — Parte 01

Solución en C# (.NET) para los dos casos planteados en la prueba técnica. El proyecto está organizado como una aplicación de consola con un menú interactivo que permite probar cada caso de forma independiente.

---

## Estructura del Proyecto

```
Parte01.ConsoleApp/
├── Program.cs
├── OrderRange/
│   ├── OrderRange.cs
│   └── OrderResult.cs
└── MoneyParts/
    └── MoneyParts.cs
```

---

## Caso 1 — `OrderRange`

### Descripción

La clase `OrderRange` expone el método `Build`, que recibe una colección de enteros positivos y los separa en dos listas ordenadas ascendentemente: una de números pares y otra de números impares.

**Archivo:** `OrderRange/OrderRange.cs`

### Decisiones de diseño

- Se utiliza LINQ (`.Where`, `.Order`) para mantener el código declarativo, legible y con mínima lógica imperativa.
- Se valida que los números sean estrictamente positivos (`n > 0`) para cumplir el enunciado que indica "enteros positivos (1, 2, 3, …n)".
- El resultado se encapsula en un objeto `OrderResult` con dos propiedades tipadas (`Evens`, `Odds`), evitando retornar tuplas anónimas o listas genéricas que reducirían la claridad del contrato público.
- Se lanza `ArgumentNullException` si la colección recibida es `null`, aplicando _fail-fast_ desde la entrada.

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

#### Trabajo en céntimos (enteros)

Dado que las denominaciones tienen hasta dos decimales, todas las operaciones se realizan internamente multiplicando por 100 y trabajando con enteros (`int`). Esto **evita completamente los errores de precisión flotante** que aparecerían al comparar o acumular valores `decimal` directamente.

```
0.05 → 5
0.10 → 10
0.50 → 50
10.50 → 1050
```

Al retornar el resultado, cada valor se divide entre `100m` para presentar las denominaciones en su forma original.

#### Algoritmo: backtracking con índice de inicio

Se utiliza recursión con un parámetro `startIndex` que garantiza que cada combinación se genere **una sola vez** y siempre en orden no decreciente. Esto descarta duplicados sin necesidad de hashear ni ordenar resultados a posteriori.

```csharp
private void GenerateCombinations(int remaining, int startIndex, List<int> current, List<List<int>> results)
{
    if (remaining == 0) { results.Add(new List<int>(current)); return; }
    for (int i = startIndex; i < _denominations.Length; i++)
    {
        if (_denominations[i] > remaining) continue;
        current.Add(_denominations[i]);
        GenerateCombinations(remaining - _denominations[i], i, current, results);
        current.RemoveAt(current.Count - 1);
    }
}
```

#### Parsing robusto

Se usa `decimal.TryParse` con `CultureInfo.InvariantCulture` para aceptar formatos de punto decimal independientemente de la configuración regional del sistema operativo donde se ejecute.

---

### ⚠️ Limitación: tope de 10 000 combinaciones

#### ¿Por qué existe este límite?

El número de combinaciones crece de forma **combinatoriamente explosiva** con el monto. Algunos ejemplos ilustrativos:

| Monto | Combinaciones aproximadas |
|---|---|
| `0.10` | 2 |
| `0.50` | ~10–20 |
| `1.00` | ~50–100 |
| `5.00` | Cientos de miles |
| `10.50` | Potencialmente millones |

Sin ningún límite, montos a partir de ~3 o 4 soles pueden agotar la memoria de heap disponible y colgar la aplicación. El tope de **10 000 combinaciones** fue elegido como un balance pragmático para la demo: permite cubrir los ejemplos del enunciado y una gama razonable de montos pequeños, sin riesgo de crash en tiempo de ejecución.

#### ¿Cuál sería la solución correcta para producción?

El problema raíz es que la tarea pide **enumerar** todas las combinaciones, pero para montos grandes esa colección simplemente no cabe en memoria. Las alternativas de ingeniería que se evaluaron son:

**1. Lazy evaluation con `IEnumerable<IEnumerable<decimal>>` (streaming)**

En lugar de materializar todas las combinaciones en una `List`, se retorna un iterador con `yield return`. El caller consume de a una combinación a la vez, sin cargar todo en RAM. Es la solución más fiel al enunciado sin explotar la memoria.

```csharp
public IEnumerable<IReadOnlyList<decimal>> Build(string amount)
{
    // yield return combo a medida que se descubre
}
```

**2. Programación dinámica para conteo**

Si solo se necesita **cuántas** combinaciones existen (no listarlas), la DP clásica de _coin change_ responde en O(n × m) tiempo y O(n) espacio, siendo n el monto en céntimos y m la cantidad de denominaciones. Sin embargo, no resuelve el requisito de retornar el arreglo completo.

**3. Paginación / límite con parámetro configurable**

Exponer un parámetro `maxResults` en `Build` para que el caller decida cuántas combinaciones necesita, en lugar de imponer un tope hardcodeado internamente.

**4. Procesamiento paralelo con `Parallel.ForEach`**

Paralelizar ramas del backtracking puede reducir el tiempo de cómputo, pero no resuelve el problema de memoria ya que todas las combinaciones deben almacenarse de igual forma.

**La solución implementada** usa el límite de 10 000 con lanzamiento de excepción explícita y mensaje claro, de modo que el comportamiento ante montos grandes sea transparente y predecible (falla rápido con mensaje descriptivo) en lugar de silencioso o indefinido.

---

## Cómo ejecutar

### Requisitos

- .NET 8 o superior

### Pasos

```bash
git clone https://github.com/JeanPaulLazaroQuispe/evaluacion-tecnica-fullstack-dotnet.git
cd evaluacion-tecnica-fullstack-dotnet/parte01-console/Parte01.ConsoleApp
dotnet run
```

El menú interactivo permite probar cada caso ingresando valores por consola.

### Ejemplos de ejecución

**Caso 1:**
```
Ingrese números positivos separados por coma: 58,60,55,48,57,73
Impares: [55, 57, 73]
Pares:   [48, 58, 60]
```

**Caso 2:**
```
Ingrese un monto en soles: 0.1
Se encontraron 2 combinaciones:
[0.05, 0.05]
[0.10]
```

---

## Tecnologías utilizadas

- **C# / .NET 8+**
- **LINQ** — filtrado y ordenamiento declarativo (Caso 1)
- **Backtracking recursivo** con índice de inicio para generación sin duplicados (Caso 2)
- **Aritmética entera** en céntimos para evitar errores de punto flotante (Caso 2)
- **`CultureInfo.InvariantCulture`** para parsing de decimales independiente del locale del sistema

---

## Autor

Solución desarrollada como parte de la Prueba Técnica C# — Parte 01.
