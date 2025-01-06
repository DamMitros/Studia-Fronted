export function getComparisonList() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("comparisonList") || "[]");
  }
  return [];
}

export function addToComparisonList(pokemon) {
  const list = getComparisonList();
  if (list.length < 2) {
    list.push(pokemon);
    localStorage.setItem("comparisonList", JSON.stringify(list));
    return { success: true };
  } else {
    return { success: false, message: "Możesz porównać maksymalnie 2 Pokemony." };
  }
}

export function removeFromComparisonList(name) {
  let list = getComparisonList();
  list = list.filter((p) => p.name !== name);
  localStorage.setItem("comparisonList", JSON.stringify(list));
}

export function clearComparisonList() {
  localStorage.setItem("comparisonList", JSON.stringify([]));
}