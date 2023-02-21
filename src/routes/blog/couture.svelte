<script lang="ts">
  import { Carrousel, SectionPlain, type CarrouselPicture } from '$lib/client';
  const pictures: CarrouselPicture[] = [
    { alt: '', src: '/couture/sac-habille.jpg' },
    { alt: '', src: '/couture/sac.jpg' },
    { alt: '', src: '/couture/ambiance.jpg' },
    { alt: '', src: '/couture/apprendre.jpg' },
    { alt: '', src: '/couture/atelier.jpg' }
  ];
</script>

<SectionPlain
  body="{`
# Coûture

L'association APBA propose des activités de coûture régulièrement dans ses locaux au square
Lulli. Nous vous donnons rendez-vous !

Au travers cette activité, vous pouvez apprendre à coudre, à broder, à border, faire des
aisances, des ourlets, des patronages...
`}" />

<Carrousel pictures="{pictures}" duration="{2000}" />
