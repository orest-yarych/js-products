export function toggleAcctiveClass(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
}
