function hasShare() {
  return !!navigator.share;
}
function share(shareData: any) {
  if (navigator.share) {
    navigator.share(shareData)
  }
}

function states() {
  return [
    "bw", "be", "bb", "hb", "by", "hh", "he", "mv", "ni", "nw", "rp", "sl",
    "sn", "st", "sh", "th" ]
}
function stateToName(state: string): string | undefined {
  return ({
    bw: "Baden-Württemberg",
    be: "Berlin",
    bb: "Brandenburg",
    hb: "Bremen",
    by: "Bayern",
    hh: "Hamburg",
    he: "Hessen",
    mv: "Mecklenburg-Vorpommern",
    ni: "Niedersachsen",
    nw: "Nordrhein-Westfalen",
    rp: "Rheinland-Pfalz",
    sl: "Saarland",
    sn: "Sachsen",
    st: "Sachsen-Anhalt",
    sh: "Schleswig-Holstein",
    th: "Thüringen",
  } as any)[state];
}

const exports = { hasShare, share, states, stateToName };
export default (_context: any, inject: any) => {
  inject('util', exports);
}
