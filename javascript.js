document.addEventListener("DOMContentLoaded", () => {
  const animZone = document.getElementById("animZone");
  if (!animZone) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const ANIM_MIN_WIDTH = 576;
  let timer = null;

  function triggerAnimation() {
    clearTimeout(timer);
    // sécurité : retirer l'anim si on veut rejouer proprement
    animZone.classList.remove("animate");

    // on lance l'anim après 1,5s pour bien voir l'état initial
    timer = setTimeout(() => animZone.classList.add("animate"), 1500);
  }

  function applyAnimationState() {
    if (window.innerWidth >= ANIM_MIN_WIDTH && !prefersReducedMotion.matches) {
      triggerAnimation();
    } else {
      clearTimeout(timer);
      animZone.classList.remove("animate"); // pas d’anim en mobile / reduced motion
    }
  }

  // Initialisation
  applyAnimationState();

  // Écoute les changements de taille d’écran
  window.addEventListener("resize", () => {
    applyAnimationState();
  });

  // Écoute la préférence "réduire les animations"
  prefersReducedMotion.addEventListener("change", applyAnimationState);
});
