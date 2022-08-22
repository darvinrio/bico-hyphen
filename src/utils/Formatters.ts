export const NumberFormatter = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };