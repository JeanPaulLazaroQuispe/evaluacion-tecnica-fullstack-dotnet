using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parte01.ConsoleApp.OrderRange
{
    public class OrderRange
    {
        public OrderResult Build(IEnumerable<int> numbers)
        {
            if (numbers == null)
                throw new ArgumentNullException(nameof(numbers));

            var evens = numbers
                .Where(n => n > 0 && n % 2 == 0)
                .Order()
                .ToList();

            var odds = numbers
                .Where(n => n > 0 && n % 2 != 0)
                .Order()
                .ToList();

            return new OrderResult
            {
                Evens = evens,
                Odds = odds
            };
        }
    }
}
