import { ref } from "vue";

const showParticles = ref(true);

export function useUISettings() {
  const toggleParticles = () => {
    showParticles.value = !showParticles.value;
  };

  return {
    showParticles,
    toggleParticles,
  };
}
