/** Program prices in PKR. `list` is shown struck through; `launch` is what students pay now. */
export type Price = { list: number; launch: number; unit?: string; monthly?: { months: number; amount: number } };

export const PRICES: Record<"diploma" | "bootcamp" | "sprints", Price> = {
  diploma:  { list: 75000, launch: 60000, monthly: { months: 8, amount: 8000 } },
  bootcamp: { list: 30000, launch: 24000 },
  sprints:  { list: 5000,  launch: 3500, unit: "per sprint" },
};

export const PRICE_NOTE = "Launch price for the first cohort. You pay only after you are accepted.";
export const pkr = (n: number) => `PKR ${n.toLocaleString("en-US")}`;
