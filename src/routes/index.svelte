<script context="module" lang="ts">
import { SectionSplash, SectionThumbs } from '../components';
export const prerender = true;
</script>

<svelte:head>
  <title>APBA - Accueil</title>
</svelte:head>

<SectionSplash
  backgroundImages="{['/temp/index.jpg']}"
  height="80vh"
  buttonList="{[
    { href: '/blog/parents', text: "Vous êtes un parent du Bois l'Abbé", color: 'primary' },
    { href: '/login', text: 'Vous êtes déjà inscrit', color: 'secondary' }
  ]}"
  body="{`
# Bienvenue sur le site web de **APBA**

**Association des Parents du Bois l'Abbé (Champigny-sur-Marne)**
	`}" />

<SectionThumbs
  thumbs="{[
    {
      pictureUrl: '/temp/school8.jpg',
      pictureAlt: 'salle de classe avec des élèves',
      buttonHref: '/blog/parents',
      body: `
## Parents

Bienvenue chers parents ! Nous vous accueillons dans nos locaux en plein coeur du Bois l'Abbé,
auprès des autres parents et de professionnels. Venez avec vos enfants passer un bon moment,
découvrir nos activités et rencontrer plein de gens.

En cliquant sur ce bouton, vous découvrirez ce que nous pouvons vous apporter, et ce qui importe
le plus dans cette association.
		`
    },
    {
      pictureUrl: '/temp/bois-labbe4.jpg',
      pictureAlt: "bâtiment du bois l'abbé",
      buttonHref: '/blog/quartier',
      buttonColor: 'secondary',
      body: `
## Habitants du Bois l'Abbé

Nos locaux sont au coeur du Bois l'Abbé de Champigny-sur-Marne, c'est un quartier vivant avec ses
belles histoires et ses rencontres. Vous connaissez déjà le quartier pour ses habitants intègres
et courtois, nous vous proposons de nous rejoindre dans nos locaux et durant nos activités.

Vous trouverez toutes les raisons de venir nous voir : vous êtes parents, vous êtes un habitant
qui veut connaitre son environnement, vous venez d'arriver dans le quartier, vous êtes concerné
par le développement du quartier... Nous vous accueillerons à bras ouverts !
		`
    }
  ]}" />

<SectionSplash
  height="80vh"
  backgroundImages="{['/temp/cook.jpg', '/temp/sewing2.jpg']}"
  body="{`<p>Voir toutes les activités d'APBA</p>`}"
  buttonList="{[
    { href: '/blog/quartier', text: 'Convivialité de quartier', color: 'primary' },
    { href: '/blog/activites', text: 'Bien-être et santé', color: 'secondary' },
    { href: '/blog/solidarites', text: 'Solidarités', color: 'primary' }
  ]}"
  variant="left" />

<SectionThumbs
  thumbs="{[
    {
      pictureAlt: 'plat sain végétarien',
      pictureUrl: '/temp/recipe.jpg',
      buttonHref: '/blog/activites',
      body: `
## Diététique et bien-être

Avec nos professionnels dans les locaux et dans les activités, vous retrouverez plein d'informations
autour du bien-être et de la diététique. Nous organisons des thématiques pour passer en revue les
plats tendances, innover avec vos astuces et échanger avec les membres de l'association.

Les professionnels sur place peuvent guider des activités de cuisine, proposer des ingrédients qui
améliore la santé, ou encore choisir avec vous des ingrédients qui vous font du bien, à vous ainsi que
les familles.
		`
    },
    {
      pictureAlt: 'famille caline',
      pictureUrl: '/temp/cook5.jpg',
      buttonHref: '/blog/solidarites',
      buttonColor: 'secondary',
      body: `
## Activités en famille

Nous sommes heureux d'accueillir toutes les semaines des parents, des enfants et souvent des familles
entières. C'est l'occasion d'échanger entre toutes les générations, autour d'activités, de repas et
surtout de nombreux ateliers.

Nous acceuillons les familles tous les mercredis pour des activités en après-midi et tous les vendredis
pour des journées autour des jeux de société.
    `
    }
  ]}" />
