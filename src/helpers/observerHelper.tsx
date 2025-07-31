export function addElementToObserver(elementId: string, className: string) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -200px 0px',
    }
  );

  const element = document.getElementById(elementId);
  if (element) {
    observer.observe(element);
  } else {
    console.warn(`Elemento con ID "${elementId}" no encontrado`);
  }

  // Retornar función de cleanup manual
  return () => observer.disconnect();
}

export function addMultipleElementsToObserver(
  elementIds: string[],
  className: string
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -200px 0px',
    }
  );

  elementIds.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    } else {
      console.warn(`Elemento con ID "${elementId}" no encontrado`);
    }
  });

  // Retornar función de cleanup manual
  return () => observer.disconnect();
}
