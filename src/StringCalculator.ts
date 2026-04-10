export class StringCalculator {
  add(numbers: string): number {
    if (!numbers || numbers.length === 0) return 0;

    let delimiter = ",";
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      delimiter = parts[0].substring(2);
      numbers = parts[1];
    }

    const parts = numbers.split(delimiter);
    let sum = 0;
    let negatives: string[] = [];
    // for (let i = 0; i < parts.length; i++) {
    //   if (parts[i].trim() === "") {
    //     continue;
    //   }
    //   if (regex.test(parts[i])) {
    //     continue;
    //   }
    //   sum += parseInt(parts[i]);
    //   if (parseInt(parts[i]) < 0) {
    //     negatives.push(parts[i]);
    //   }
    // }
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].trim() === "") continue;

      const num = parseInt(parts[i]);
      if (num < 0) {
        negatives.push(parts[i]);
      }
      sum += num;
    }
    if (negatives.length > 0) {
      throw new Error(`Nombres negatifs interdits : ${negatives.join(", ")}`);
    }
    return sum;
  }
}
