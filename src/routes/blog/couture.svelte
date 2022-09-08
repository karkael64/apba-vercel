<script lang="ts">
import type { CarrouselPicture } from '$lib/components';
import { Carrousel, SectionPlain } from '$lib/components';
const pictures: CarrouselPicture[] = [
  { alt: '', src: '/couture/sac-habille.jpg' },
  { alt: '', src: '/couture/sac.jpg' },
  { alt: '', src: '/couture/ambiance.jpg' },
  { alt: '', src: '/couture/apprendre.jpg' },
  { alt: '', src: '/couture/atelier.jpg' }
];
</script>

<SectionPlain>
  <h1>Coûture</h1>
  <p>
    L'association APBA propose des activités de coûture régulièrement dans ses locaux au square
    Lulli. Nous vous donnons rendez-vous !
  </p>
  <p>
    Au travers cette activité, vous pouvez apprendre à coudre, à broder, à border, faire des
    aisances, des ourlets, des patronages...
  </p>
</SectionPlain>

<Carrousel pictures="{pictures}" duration="{2000}" />
