using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using Parte01.ConsoleApp.MoneyParts;
using Parte01.ConsoleApp.OrderRange;

public class Program
{
    public static void Main()
    {
        bool exit = false;

        while (!exit)
        {
            Console.Clear();
            Console.WriteLine("===== PRUEBA TÉCNICA C# - PARTE 01 =====");
            Console.WriteLine("1 - Probar Caso 1: OrderRange");
            Console.WriteLine("2 - Probar Caso 2: MoneyParts");
            Console.WriteLine("0 - Salir");
            Console.Write("Seleccione una opción: ");

            string option = Console.ReadLine();

            switch (option)
            {
                case "1":
                    EjecutarCaso1();
                    break;

                case "2":
                    EjecutarCaso2();
                    break;

                case "0":
                    exit = true;
                    break;

                default:
                    Console.WriteLine("Opción inválida. Presione cualquier tecla para continuar...");
                    Console.ReadKey();
                    break;
            }
        }
    }

    private static void EjecutarCaso1()
    {
        Console.Clear();
        Console.WriteLine("=== Caso 1: OrderRange ===");
        Console.WriteLine("Ingrese números positivos separados por coma (ej: 2,1,4,5):");

        string input = Console.ReadLine();

        try
        {
            var numbers = input
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(n => int.Parse(n.Trim()))
                .ToList();

            var orderRange = new OrderRange();
            var result = orderRange.Build(numbers);

            Console.WriteLine("\nResultado:");
            Console.WriteLine("Impares: [" + string.Join(", ", result.Odds) + "]");
            Console.WriteLine("Pares:   [" + string.Join(", ", result.Evens) + "]");
        }
        catch
        {
            Console.WriteLine("Entrada inválida. Ingrese solo números enteros positivos.");
        }

        Console.WriteLine("\nPresione cualquier tecla para volver al menú...");
        Console.ReadKey();
    }

    private static void EjecutarCaso2()
    {
        Console.Clear();
        Console.WriteLine("=== Caso 2: MoneyParts ===");
        Console.WriteLine("Ingrese un monto en soles (ej: 0.1, 0.5, 10.50):");

        string input = Console.ReadLine();

        try
        {
            var moneyParts = new MoneyParts();
            var combinations = moneyParts.Build(input);

            Console.WriteLine($"\nSe encontraron {combinations.Count} combinaciones:\n");

            foreach (var combo in combinations)
            {
                Console.WriteLine("[" + string.Join(", ", combo) + "]");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }

        Console.WriteLine("\nPresione cualquier tecla para volver al menú...");
        Console.ReadKey();
    }
}
