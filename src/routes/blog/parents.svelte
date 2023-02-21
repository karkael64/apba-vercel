<script lang="ts">
  import { Carrousel, SectionPlain, type CarrouselPicture } from '$lib/client';
  const pictures: CarrouselPicture[] = [
    { alt: '', src: '/parents/famille.jpg' },
    { alt: '', src: '/equipe/benevoles.jpg' },
    { alt: '', src: '/decouvrir/marche1.jpg' },
    { alt: '', src: '/decouvrir/marche2.jpg' },
    { alt: '', src: '/decouvrir/marche3.jpg' },
    { alt: '', src: '/decouvrir/marche4.jpg' }
  ];
</script>

<SectionPlain
  body="{`
# Parents du Bois l'Abbé

La première mission d'APBA est de donner aux parents un lieu de rencontre et d'échange. Nous
avons commencé l'association pour sortir les parents de chez eux, pour rencontrer toute la
diversité du Bois l'Abbé et ses environs.

Nous souhaitons rompre la solitude des parents. Bien trop souvent, les personnes s'isolent à
cause des barières sociales, comme la timidité, la peur des autres, les langues ou les
traditions différentes. APBA accueille tout le monde et change régulièrement son accueil pour
s'adapter à vous : nous faisons des événements extérieurs pour tous ou nous proposons des
rendez-vous, vous pouvez nous rencontrer ici virtuellement ou pendant des activités avec des
adhérents.

APBA a effectué de nombreuses actions pour les parents, parmis celles-ci :

* Vous aider dans la **scolarité** de vos enfants, à comprendre ce qu'attendent les enseignants
et vos droits.
* Permettre une médiation entre les établissements scolaires, **résoudre des conflits** entre
les familles.
* Suivre et **réunir les informations** des établissements scolaires, puis les diffuser.
* Accueillir les nouveaux habitants.

L'association accueille les parents, et nous avons bien compris qu'après les échanges, nous
avons besoin d'activités, et qui s'adapte au besoin de chaque personne. Vous trouverez dans
l'agenda beaucoup d'activités : jeux de société parents-enfants, ateliers cuisine, ateliers
bien-être, ateliers informatiques.
`}" />

<Carrousel height="60vh" duration="{2000}" pictures="{pictures}" />
