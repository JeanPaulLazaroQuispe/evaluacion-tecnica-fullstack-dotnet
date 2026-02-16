using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parte01.ConsoleApp.OrderRange
{
    public class OrderResult
    {
        public required List<int> Evens { get; set; }
        public required List<int> Odds { get; set; }
    }
}
