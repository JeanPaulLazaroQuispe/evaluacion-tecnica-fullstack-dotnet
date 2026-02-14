using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parte01.ConsoleApp.MoneyParts
{
    public class MoneyParts
    {
        private readonly int[] _denominations = new int[]
        {
            5, 10, 20, 50,
            100, 200, 500, 1000,
            2000, 5000, 10000, 20000
        };

        private const int MaxCombinations = 10000;

        public List<List<decimal>> Build(string amount)
        {
            if (string.IsNullOrWhiteSpace(amount))
                throw new ArgumentException("Ingrese un monto válido.");

            if (!decimal.TryParse(amount, NumberStyles.Number, CultureInfo.InvariantCulture, out decimal parsedAmount))
                throw new ArgumentException("Formato de monto inválido.");

            if (parsedAmount < 0)
                throw new ArgumentException("El monto debe ser positivo.");

            int targetInCents = (int)(parsedAmount * 100);

            var resultsInCents = new List<List<int>>();
            GenerateCombinations(targetInCents, 0, new List<int>(), resultsInCents);

            if (resultsInCents.Count >= MaxCombinations)
                throw new InvalidOperationException("El monto es demasiado grande y genera demasiadas combinaciones.");

            return resultsInCents
                .Select(combo => combo.Select(c => c / 100m).ToList())
                .ToList();
        }

        private void GenerateCombinations(int remaining, int startIndex, List<int> current, List<List<int>> results)
        {
            if (results.Count >= MaxCombinations)
                return;

            if (remaining == 0)
            {
                results.Add(new List<int>(current));
                return;
            }

            for (int i = startIndex; i < _denominations.Length; i++)
            {
                int coin = _denominations[i];
                if (coin > remaining) continue;

                current.Add(coin);
                GenerateCombinations(remaining - coin, i, current, results);
                current.RemoveAt(current.Count - 1);
            }
        }
    }
}
