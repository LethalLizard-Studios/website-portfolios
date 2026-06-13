<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const companies = {
  GH:  { name: 'Gold Hoarders',     color: '#eae43f', icon: '/sot/24px-Gold_Hoarders_icon.webp' },
  OOS: { name: 'Order of Souls',    color: '#af4a7e', icon: '/sot/24px-Order_of_Souls_icon.webp' },
  MA:  { name: 'Merchant Alliance', color: '#1395b2', icon: '/sot/24px-Merchant_Alliance_icon.webp' },
  HC:  { name: "The Hunter's Call", color: '#668b91', icon: "/sot/76px-The_Hunter's_Call_icon.webp" },
  AF:  { name: "Athena's Fortune",  color: '#6aeda8', icon: "/sot/24px-Athena's_Fortune_icon.webp" },
  RB:  { name: "Reaper's Bones",    color: '#b22517', icon: '/sot/Reapers_Bones_icon.webp' },
  SL:  { name: "Smugglers' League", color: '#b9b065', icon: "/sot/24px-Smugglers'_League_icon.webp" },
  ANY: { name: 'Most Companies',    color: '#d4d4d8' },
}

const categories = [
  {
    title: 'Treasure Chests',
    company: 'GH',
    note: 'Dug up from voyages, found on islands and shipwrecks. Sold to the Gold Hoarders tent at any outpost.',
    items: [
      { name: "Castaway's Chest", value: '60 – 130', img: '/sot/castaways-chest.png' },
      { name: "Seafarer's Chest", value: '140 – 260', img: '/sot/seafarers-chest.png' },
      { name: "Marauder's Chest", value: '280 – 520', img: '/sot/marauders-chest.png' },
      { name: "Captain's Chest", value: '560 – 1,100', img: '/sot/captains-chest.png' },
      { name: "Coral Castaway's Chest", value: '105 – 228', img: '/sot/coral-castaways-chest.png' },
      { name: "Coral Seafarer's Chest", value: '245 – 455', img: '/sot/coral-seafarers-chest.png' },
      { name: "Coral Marauder's Chest", value: '490 – 910', img: '/sot/coral-marauders-chest.png' },
      { name: "Coral Captain's Chest", value: '980 – 1,925', img: '/sot/coral-captains-chest.png' },
      { name: "Ashen Castaway's Chest", value: '140 – 260', img: '/sot/ashen-castaways-chest.png' },
      { name: "Ashen Seafarer's Chest", value: '280 – 520', img: '/sot/ashen-seafarers-chest.png' },
      { name: "Ashen Marauder's Chest", value: '560 – 1,100', img: '/sot/ashen-marauders-chest.png' },
      { name: "Ashen Captain's Chest", value: '1,100 – 2,100', img: '/sot/ashen-captains-chest.png' },
      { name: 'Chest of the Damned', value: '1,000 – 1,160', img: '/sot/chest-of-the-damned.png' },
      { name: "Skeleton Captain's Chest", value: '1,150 – 1,550', img: '/sot/skeleton-captains-chest.png' },
      { name: 'Stronghold Chest', value: '1,500 – 3,000', img: '/sot/stronghold-chest.png' },
      { name: 'Chest of Ancient Tributes', value: '3,400 – 3,900', img: '/sot/chest-of-ancient-tributes.png' },
      { name: 'Chest of a Thousand Grogs', value: '2,200 – 2,600', img: '/sot/chest-of-a-thousand-grogs.png' },
      { name: 'Chest of Sorrow', value: '3,000 – 3,500', img: '/sot/chest-of-sorrow.png' },
      { name: 'Chest of Rage', value: '3,000 – 3,500', img: '/sot/chest-of-rage.png' },
      { name: 'Chest of Everlasting Sorrow', value: '6,000 – 7,000', img: '/sot/chest-of-everlasting-sorrow.png' },
    ],
  },
  {
    title: 'Artefacts',
    company: 'GH',
    note: 'Small valuables found in barrels, caves and shipwrecks. Same pricing tiers as chests.',
    items: [
      { name: 'Ancient Goblet / Bronze Secret-Keeper / Mysterious Vessel', value: '60 – 130', img: '/sot/ancient-goblet.png' },
      { name: 'Silvered Cup / Elaborate Flagon / Decorative Coffer', value: '140 – 260', img: '/sot/silvered-cup.png' },
      { name: 'Gilded Chalice / Ornate Carafe / Golden Reliquary', value: '280 – 520', img: '/sot/gilded-chalice.png' },
      { name: 'Adorned Receptacle / Opulent Curio / Peculiar Relic', value: '560 – 1,100', img: '/sot/adorned-receptacle.png' },
      { name: 'Mysterious Coral Vessel', value: '105 – 228', img: '/sot/mysterious-coral-vessel.png' },
      { name: 'Silvered Coral Cup', value: '245 – 455', img: '/sot/silvered-coral-cup.png' },
      { name: 'Golden Coral Reliquary', value: '490 – 910', img: '/sot/golden-coral-reliquary.png' },
      { name: 'Peculiar Coral Relic', value: '980 – 1,925', img: '/sot/peculiar-coral-relic.png' },
      { name: 'Roaring Goblet', value: '140 – 260', img: '/sot/roaring-goblet.png' },
      { name: 'Brimstone Casket', value: '280 – 520', img: '/sot/brimstone-casket.png' },
      { name: "Devil's Remnant", value: '560 – 1,100', img: '/sot/devils-remnant.png' },
      { name: "Magma's Grail", value: '1,100 – 2,100', img: '/sot/magmas-grail.png' },
      { name: 'Artefacts of the Ashen Curse (Chalice / Keeper / Grail)', value: '140 – 260', img: '/sot/ashen-curse-artefacts.png' },
      { name: 'Vestige of Power', value: '1,500 – 1,750', img: '/sot/vestige-of-power.png' },
    ],
  },
  {
    title: "Hoarder's Reliquaries",
    company: 'GH',
    note: 'Guaranteed rewards from Gold Hoarders Raid Voyages.',
    items: [
      { name: "Hoarder's Reliquary", value: '5,000', img: '/sot/hoarders-reliquary.png' },
      { name: "Prosperous Hoarder's Reliquary", value: '10,000', img: '/sot/prosperous-hoarders-reliquary.png' },
      { name: "Glittering Hoarder's Reliquary", value: '15,000', img: '/sot/glittering-hoarders-reliquary.png' },
    ],
  },
  {
    title: 'Treasure Vault Keys',
    company: 'GH',
    note: 'Earned from Wayfinder voyages. Sell the key, or open the vault and keep what is inside.',
    items: [
      { name: 'Stone Vault Key', value: '1,200 – 1,500', img: '/sot/stone-vault-key.png' },
      { name: 'Silver Vault Key', value: '2,300 – 2,400', img: '/sot/silver-vault-key.png' },
      { name: 'Gold Vault Key', value: '3,600 – 3,750', img: '/sot/gold-vault-key.png' },
    ],
  },
  {
    title: 'Bounty Skulls',
    company: 'OOS',
    note: 'Dropped by skeleton captains and bounty targets. Sold to the Order of Souls hut.',
    items: [
      { name: 'Foul Bounty Skull', value: '90 – 180', img: '/sot/foul-bounty-skull.png' },
      { name: 'Disgraced Bounty Skull', value: '180 – 350', img: '/sot/disgraced-bounty-skull.png' },
      { name: 'Hateful Bounty Skull', value: '350 – 750', img: '/sot/hateful-bounty-skull.png' },
      { name: 'Villainous Bounty Skull', value: '750 – 1,450', img: '/sot/villainous-bounty-skull.png' },
      { name: 'Foul Coral Skull', value: '158 – 315', img: '/sot/foul-coral-skull.png' },
      { name: 'Disgraced Coral Skull', value: '315 – 613', img: '/sot/disgraced-coral-skull.png' },
      { name: 'Hateful Coral Skull', value: '613 – 1,313', img: '/sot/hateful-coral-skull.png' },
      { name: 'Villainous Coral Skull', value: '1,313 – 2,538', img: '/sot/villainous-coral-skull.png' },
      { name: 'Ashen Foul Skull', value: '180 – 350', img: '/sot/ashen-foul-skull.png' },
      { name: 'Ashen Disgraced Skull', value: '350 – 750', img: '/sot/ashen-disgraced-skull.png' },
      { name: 'Ashen Hateful Skull', value: '750 – 1,450', img: '/sot/ashen-hateful-skull.png' },
      { name: 'Ashen Villainous Skull', value: '1,450 – 2,800', img: '/sot/ashen-villainous-skull.png' },
      { name: "Skeleton Captain's Skull", value: '850 – 2,200', img: '/sot/skeleton-captains-skull.png' },
      { name: 'Stronghold Skull', value: '1,800 – 4,200', img: '/sot/stronghold-skull.png' },
      { name: "Gold Hoarder's Skull", value: '10,000', img: '/sot/gold-hoarders-skull.png' },
      { name: 'Ashen Winds Skull', value: '4,000 – 10,000', img: '/sot/ashen-winds-skull.png' },
      { name: 'Skull of the Damned', value: '1,050 – 1,250', img: '/sot/skull-of-the-damned.png' },
      { name: 'Captain Skull of the Damned', value: '1,700 – 2,950', img: '/sot/captain-skull-of-the-damned.png' },
    ],
  },
  {
    title: 'Eyes of Souls',
    company: 'OOS',
    note: 'Guaranteed rewards from Order of Souls Raid Voyages.',
    items: [
      { name: 'Eye of Souls', value: '5,000', img: '/sot/eye-of-souls.png' },
      { name: 'Veiled Eye of Souls', value: '10,000', img: '/sot/veiled-eye-of-souls.png' },
      { name: 'All-Seeing Eye of Souls', value: '15,000', img: '/sot/all-seeing-eye-of-souls.png' },
    ],
  },
  {
    title: 'Trade Good Crates',
    company: 'MA',
    note: 'Found on islands, forts and shipwrecks. Sold to the Merchant Alliance representative on the dock.',
    items: [
      { name: 'Crate of Fine Sugar', value: '100 – 200', img: '/sot/crate-of-fine-sugar.png' },
      { name: 'Crate of Cannonballs', value: '100 – 200', img: '/sot/crate-of-cannonballs.png' },
      { name: 'Crate of Rare Tea', value: '260 – 470', img: '/sot/crate-of-rare-tea.png' },
      { name: 'Crate of Exotic Silks', value: '500 – 1,000', img: '/sot/crate-of-exotic-silks.png' },
      { name: 'Crate of Exquisite Spices', value: '1,100 – 1,900', img: '/sot/crate-of-exquisite-spices.png' },
      { name: 'Crate of Volcanic Stone', value: '260 – 470', img: '/sot/crate-of-volcanic-stone.png' },
      { name: 'Crate of Fine Ore', value: '500 – 1,000', img: '/sot/crate-of-fine-ore.png' },
      { name: 'Crate of Extraordinary Minerals', value: '1,100 – 1,900', img: '/sot/crate-of-extraordinary-minerals.png' },
      { name: 'Crate of Precious Gemstones', value: '2,100 – 3,600', img: '/sot/crate-of-precious-gemstones.png' },
      { name: 'Crate of Ancient Bone Dust', value: '2,100 – 5,400', img: '/sot/crate-of-ancient-bone-dust.png' },
      { name: 'Cannonball Crate of the Damned', value: '2,100 – 5,400', img: '/sot/cannonball-crate-of-the-damned.png' },
      { name: 'Storage Crate of the Damned', value: '2,100 – 5,400', img: '/sot/storage-crate-of-the-damned.png' },
      { name: 'Crate of Immaculate Diamonds', value: '3,000 – 3,100', img: '/sot/crate-of-immaculate-diamonds.png' },
      { name: 'Ashes of the Damned', value: '1,150 – 1,400', img: '/sot/ashes-of-the-damned.png' },
      { name: 'Merchant Cabin Key', value: 'varies', img: '/sot/merchant-cabin-key.png' },
      { name: 'Coffer of Aged Grog', value: '260 – 470', img: '/sot/coffer-of-aged-grog.png' },
      { name: 'Coffer of Antiquated Coffee', value: '100 – 200', img: '/sot/coffer-of-antiquated-coffee.png' },
      { name: 'Coffer of Forgotten Jewels', value: '1,100 – 1,900', img: '/sot/coffer-of-forgotten-jewels.png' },
      { name: 'Coffer of Timeworn Minerals', value: '500 – 1,000', img: '/sot/coffer-of-timeworn-minerals.png' },
    ],
  },
  {
    title: 'Cargo Runs',
    company: 'MA',
    note: 'Delivered for Cargo Run voyages. Worth full price in perfect condition, as little as 100 – 200 if damaged.',
    items: [
      { name: 'Crate of Plants', value: 'up to 700', img: '/sot/crate-of-plants.png' },
      { name: 'Crate of Exotic Plants', value: 'up to 700', img: '/sot/crate-of-exotic-plants.png' },
      { name: 'Fruit Crate', value: 'up to 700', img: '/sot/fruit-crate.png' },
      { name: 'Crate of Wood', value: 'up to 700', img: '/sot/crate-of-wood.png' },
      { name: 'Crate of Luxurious Cloth', value: 'up to 700', img: '/sot/crate-of-luxurious-cloth.png' },
      { name: 'Crate of Elegant Cloth', value: 'up to 700', img: '/sot/crate-of-elegant-cloth.png' },
      { name: 'Crate of Rum Bottles', value: 'up to 700', img: '/sot/crate-of-rum-bottles.png' },
      { name: 'Crate of the Finest Rum', value: 'up to 700', img: '/sot/crate-of-the-finest-rum.png' },
      { name: "Crate of Devil's Plants", value: 'up to 1,400', img: '/sot/crate-of-devils-plants.png' },
      { name: 'Crate of Searing Plants', value: 'up to 1,400', img: '/sot/crate-of-searing-plants.png' },
      { name: "Crate of Devil's Cloth", value: 'up to 1,400', img: '/sot/crate-of-devils-cloth.png' },
      { name: 'Crate of Fire-woven Cloth', value: 'up to 1,400', img: '/sot/crate-of-fire-woven-cloth.png' },
      { name: "Crate of Devil's Rum Bottles", value: 'up to 1,400', img: '/sot/crate-of-devils-rum-bottles.png' },
      { name: 'Crate of Brimstone Rum', value: 'up to 1,400', img: '/sot/crate-of-brimstone-rum.png' },
      { name: 'Crate of Firebombs', value: 'up to 1,400', img: '/sot/crate-of-firebombs.png' },
    ],
  },
  {
    title: 'Merchant Manifests',
    company: 'MA',
    note: 'Guaranteed rewards from Merchant Alliance Raid Voyages.',
    items: [
      { name: 'Eminent Merchant Manifest', value: '5,000', img: '/sot/eminent-merchant-manifest.png' },
      { name: 'Esteemed Merchant Manifest', value: '7,500', img: '/sot/esteemed-merchant-manifest.png' },
      { name: 'Prosperous Merchant Manifest', value: '10,000', img: '/sot/prosperous-merchant-manifest.png' },
      { name: 'Revered Merchant Manifest', value: '15,000', img: '/sot/revered-merchant-manifest.png' },
    ],
  },
  {
    title: 'Captured Animals',
    company: 'MA',
    note: 'Caged and sold to the Merchant Alliance. Worth 10x when commissioned on a Merchant voyage.',
    items: [
      { name: 'White Feathered Chicken', value: '10 / 100', img: '/sot/chicken-white-feathered.png' },
      { name: 'Red Speckled Chicken', value: '30 / 300', img: '/sot/chicken-red-speckled.png' },
      { name: 'Black Plumed Chicken', value: '70 / 700', img: '/sot/chicken-black-plumed.png' },
      { name: 'Golden Chicken', value: '150 / 1,500', img: '/sot/chicken-golden.png' },
      { name: 'Pink Pig', value: '10 / 100', img: '/sot/pig-pink.png' },
      { name: 'Pink & Black Spotted Pig', value: '30 / 300', img: '/sot/pig-spotted.png' },
      { name: 'Black Coated Pig', value: '70 / 700', img: '/sot/pig-black-coated.png' },
      { name: 'Gold Striped Pig', value: '150 / 1,500', img: '/sot/pig-gold-striped.png' },
      { name: 'Red Striped Snake', value: '10 / 100', img: '/sot/snake-red-striped.png' },
      { name: 'Blue Dappled Snake', value: '30 / 300', img: '/sot/snake-blue-dappled.png' },
      { name: 'Black Scaled Snake', value: '70 / 700', img: '/sot/snake-black-scaled.png' },
      { name: 'Golden Snake', value: '150 / 1,500', img: '/sot/snake-golden.png' },
    ],
  },
  {
    title: 'Explosives',
    company: 'MA',
    note: 'Sold to the Merchant Alliance, worth far more when commissioned.',
    items: [
      { name: 'Gunpowder Barrel', value: '100 – 200 / 1,000', img: '/sot/gunpowder-barrel.png' },
      { name: 'Stronghold Gunpowder Barrel', value: '2,750 – 6,000', img: '/sot/stronghold-gunpowder-barrel.png' },
    ],
  },
  {
    title: 'Scrolls',
    company: 'MA',
    note: 'Guaranteed rewards from Merchant Alliance Raid Voyages.',
    items: [
      { name: 'Scrolls of Charted Waters', value: '5,000', img: '/sot/scrolls-of-charted-waters.png' },
      { name: 'Scrolls of Shrouded Waters', value: '10,000', img: '/sot/scrolls-of-shrouded-waters.png' },
      { name: 'Scrolls of Undiscovered Waters', value: '15,000', img: '/sot/scrolls-of-undiscovered-waters.png' },
    ],
  },
  {
    title: 'Fish',
    company: 'HC',
    note: "Sold to The Hunter's Call seaposts. Prices show raw / cooked, trophy fish are worth roughly 2.5x.",
    items: [
      { name: 'Ruby Splashtail', value: '75 / 115 (raw / cooked)', img: '/sot/fish-splashtail-ruby.png' },
      { name: 'Sunny Splashtail', value: '150 / 225 (raw / cooked)', img: '/sot/fish-splashtail-sunny.png' },
      { name: 'Indigo Splashtail', value: '225 / 340 (raw / cooked)', img: '/sot/fish-splashtail-indigo.png' },
      { name: 'Umber Splashtail', value: '375 / 565 (raw / cooked)', img: '/sot/fish-splashtail-umber.png' },
      { name: 'Seafoam Splashtail', value: '150 / 225 (raw / cooked)', img: '/sot/fish-splashtail-seafoam.png' },
      { name: 'Charcoal Pondie', value: '75 / 115 (raw / cooked)', img: '/sot/fish-pondie-charcoal.png' },
      { name: 'Orchid Pondie', value: '150 / 225 (raw / cooked)', img: '/sot/fish-pondie-orchid.png' },
      { name: 'Bronze Pondie', value: '225 / 340 (raw / cooked)', img: '/sot/fish-pondie-bronze.png' },
      { name: 'Bright Pondie', value: '750 / 1,125 (raw / cooked)', img: '/sot/fish-pondie-bright.png' },
      { name: 'Moonsky Pondie', value: '150 / 225 (raw / cooked)', img: '/sot/fish-pondie-moonsky.png' },
      { name: 'Stone Islehopper', value: '105 / 160 (raw / cooked)', img: '/sot/fish-islehopper-stone.png' },
      { name: 'Moss Islehopper', value: '105 / 160 (raw / cooked)', img: '/sot/fish-islehopper-moss.png' },
      { name: 'Honey Islehopper', value: '105 / 160 (raw / cooked)', img: '/sot/fish-islehopper-honey.png' },
      { name: 'Raven Islehopper', value: '1,050 / 1,575 (raw / cooked)', img: '/sot/fish-islehopper-raven.png' },
      { name: 'Amethyst Islehopper', value: '105 / 160 (raw / cooked)', img: '/sot/fish-islehopper-amethyst.png' },
      { name: 'Almond Ancientscale', value: '225 / 340 (raw / cooked)', img: '/sot/fish-ancientscale-almond.png' },
      { name: 'Sapphire Ancientscale', value: '300 / 450 (raw / cooked)', img: '/sot/fish-ancientscale-sapphire.png' },
      { name: 'Smoke Ancientscale', value: '375 / 565 (raw / cooked)', img: '/sot/fish-ancientscale-smoke.png' },
      { name: 'Bone Ancientscale', value: '3,000 / 4,500 (raw / cooked)', img: '/sot/fish-ancientscale-bone.png' },
      { name: 'Starshine Ancientscale', value: '300 / 450 (raw / cooked)', img: '/sot/fish-ancientscale-starshine.png' },
      { name: 'Olive Plentifin', value: '225 / 340 (raw / cooked)', img: '/sot/fish-plentifin-olive.png' },
      { name: 'Amber Plentifin', value: '300 / 450 (raw / cooked)', img: '/sot/fish-plentifin-amber.png' },
      { name: 'Cloudy Plentifin', value: '375 / 565 (raw / cooked)', img: '/sot/fish-plentifin-cloudy.png' },
      { name: 'Bonedust Plentifin', value: '3,000 / 4,500 (raw / cooked)', img: '/sot/fish-plentifin-bonedust.png' },
      { name: 'Watery Plentifin', value: '300 / 450 (raw / cooked)', img: '/sot/fish-plentifin-watery.png' },
      { name: 'Russet Wildsplash', value: '225 / 340 (raw / cooked)', img: '/sot/fish-wildsplash-russet.png' },
      { name: 'Sandy Wildsplash', value: '300 / 450 (raw / cooked)', img: '/sot/fish-wildsplash-sandy.png' },
      { name: 'Ocean Wildsplash', value: '375 / 565 (raw / cooked)', img: '/sot/fish-wildsplash-ocean.png' },
      { name: 'Muddy Wildsplash', value: '3,000 / 4,500 (raw / cooked)', img: '/sot/fish-wildsplash-muddy.png' },
      { name: 'Coral Wildsplash', value: '300 / 450 (raw / cooked)', img: '/sot/fish-wildsplash-coral.png' },
      { name: 'Ashen Devilfish', value: '225 / 340 (raw / cooked)', img: '/sot/fish-devilfish-ashen.png' },
      { name: 'Seashell Devilfish', value: '300 / 450 (raw / cooked)', img: '/sot/fish-devilfish-seashell.png' },
      { name: 'Lava Devilfish', value: '375 / 565 (raw / cooked)', img: '/sot/fish-devilfish-lava.png' },
      { name: 'Forsaken Devilfish', value: '3,000 / 4,500 (raw / cooked)', img: '/sot/fish-devilfish-forsaken.png' },
      { name: 'Firelight Devilfish', value: '300 / 450 (raw / cooked)', img: '/sot/fish-devilfish-firelight.png' },
      { name: 'Jade Battlegill', value: '375 / 565 (raw / cooked)', img: '/sot/fish-battlegill-jade.png' },
      { name: 'Sky Battlegill', value: '450 / 675 (raw / cooked)', img: '/sot/fish-battlegill-sky.png' },
      { name: 'Rum Battlegill', value: '525 / 790 (raw / cooked)', img: '/sot/fish-battlegill-rum.png' },
      { name: 'Sand Battlegill', value: '3,750 / 5,625 (raw / cooked)', img: '/sot/fish-battlegill-sand.png' },
      { name: 'Bittersweet Battlegill', value: '450 / 675 (raw / cooked)', img: '/sot/fish-battlegill-bittersweet.png' },
      { name: 'Rose Wrecker', value: '375 / 565 (raw / cooked)', img: '/sot/fish-wrecker-rose.png' },
      { name: 'Sun Wrecker', value: '450 / 675 (raw / cooked)', img: '/sot/fish-wrecker-sun.png' },
      { name: 'Blackcloud Wrecker', value: '525 / 790 (raw / cooked)', img: '/sot/fish-wrecker-blackcloud.png' },
      { name: 'Snow Wrecker', value: '3,750 / 5,625 (raw / cooked)', img: '/sot/fish-wrecker-snow.png' },
      { name: 'Moon Wrecker', value: '450 / 675 (raw / cooked)', img: '/sot/fish-wrecker-moon.png' },
      { name: 'Ancient Stormfish', value: '450 / 675 (raw / cooked)', img: '/sot/fish-stormfish-ancient.png' },
      { name: 'Shores Stormfish', value: '450 / 675 (raw / cooked)', img: '/sot/fish-stormfish-shores.png' },
      { name: 'Wild Stormfish', value: '450 / 675 (raw / cooked)', img: '/sot/fish-stormfish-wild.png' },
      { name: 'Shadow Stormfish', value: '4,500 / 6,750 (raw / cooked)', img: '/sot/fish-stormfish-shadow.png' },
      { name: 'Twilight Stormfish', value: '450 / 675 (raw / cooked)', img: '/sot/fish-stormfish-twilight.png' },
    ],
  },
  {
    title: 'Meat',
    company: 'HC',
    note: 'Raw meat cannot be sold. Cook it on a stove first.',
    items: [
      { name: 'Cooked Chicken / Pork / Snake / Shark', value: '45', img: '/sot/cooked-meat.png' },
      { name: 'Cooked Megalodon Meat', value: '450', img: '/sot/megalodon-meat.png' },
      { name: 'Cooked Kraken Meat', value: '450', img: '/sot/kraken-meat.png' },
    ],
  },
  {
    title: "Hunter's Call Goods",
    company: 'HC',
    note: "Miscellaneous goods sold to The Hunter's Call at any seapost.",
    items: [
      { name: 'Fish Bones', value: 'varies', img: '/sot/fish-bones.png' },
      { name: 'Old Boot', value: 'varies', img: '/sot/old-boot.png' },
      { name: 'Bait Crate', value: 'varies', img: '/sot/bait-crate.png' },
      { name: 'Irresistible Bait Pack', value: 'varies', img: '/sot/irresistible-bait-pack.png' },
      { name: 'Finest Fishing Hook Pack', value: 'varies', img: '/sot/finest-fishing-hook-pack.png' },
      { name: 'Hunting Spear Tip Pack', value: 'varies', img: '/sot/hunting-spear-tip-pack.png' },
      { name: 'Kraken Eye', value: 'varies', img: '/sot/kraken-eye.png' },
      { name: 'Monstrous Kraken Eye', value: 'varies', img: '/sot/monstrous-kraken-eye.png' },
      { name: 'Crate of Shark\'s Teeth', value: 'varies', img: '/sot/crate-of-sharks-teeth.png' },
      { name: 'Crate of Curious Fish Scales', value: 'varies', img: '/sot/crate-of-curious-fish-scales.png' },
      { name: 'Crate of Precious Pearls', value: 'varies', img: '/sot/crate-of-precious-pearls.png' },
      { name: 'Crate of Kraken Tentacles', value: 'varies', img: '/sot/crate-of-kraken-tentacles.png' },
      { name: 'Barnacled Dread Scale', value: 'varies', img: '/sot/barnacled-dread-scale.png' },
      { name: 'Barnacled Dread Tooth', value: 'varies', img: '/sot/barnacled-dread-tooth.png' },
      { name: 'Barnacled Dread Treasured Scale', value: 'varies', img: '/sot/barnacled-dread-treasured-scale.png' },
      { name: 'Barnacled Dread Treasured Tooth', value: 'varies', img: '/sot/barnacled-dread-treasured-tooth.png' },
    ],
  },
  {
    title: "Athena's Treasure",
    company: 'AF',
    note: 'From Legend voyages and the Fort of the Damned. Sold to the Mysterious Stranger in any tavern (or the Servant of the Flame).',
    items: [
      { name: 'Chest of Legends', value: '8,600 – 11,000', img: '/sot/chest-of-legends.png' },
      { name: 'Ashen Chest of Legends', value: '12,900 – 16,500 (1.5x regular)', img: '/sot/ashen-chest-of-legends.png' },
      { name: "Athena's Relic", value: 'varies', img: '/sot/athenas-relic.png' },
      { name: 'Chalice of Ancient Fortune', value: 'varies', img: '/sot/chalice-of-ancient-fortune.png' },
      { name: 'Legendary Fortune Keeper', value: 'varies', img: '/sot/legendary-fortune-keeper.png' },
      { name: 'Artifact of Legendary Hunger', value: 'varies', img: '/sot/artifact-of-legendary-hunger.png' },
      { name: 'Jar of Athena\'s Incense', value: 'varies', img: '/sot/jar-of-athenas-incense.png' },
      { name: 'Offering of Legendary Goods', value: 'varies', img: '/sot/offering-of-legendary-goods.png' },
      { name: 'Crate of Legendary Voyages', value: 'varies', img: '/sot/crate-of-legendary-voyages.png' },
      { name: 'Keg of Ancient Black Powder', value: 'varies', img: '/sot/keg-of-ancient-black-powder.png' },
      { name: 'Cognac of Fortune', value: 'varies', img: '/sot/cognac-of-fortune.png' },
      { name: 'Flora of Fortune', value: 'varies', img: '/sot/flora-of-fortune.png' },
      { name: 'Silks of Fortune', value: 'varies', img: '/sot/silks-of-fortune.png' },
      { name: 'Cognac From Distant Horizons', value: 'varies', img: '/sot/cognac-from-distant-horizons.png' },
      { name: 'Flora From Distant Horizons', value: 'varies', img: '/sot/flora-from-distant-horizons.png' },
      { name: 'Silks From Distant Horizons', value: 'varies', img: '/sot/silks-from-distant-horizons.png' },
    ],
  },
  {
    title: "Reaper's Treasure",
    company: 'RB',
    note: "Sold only to the Servant of the Flame at The Reaper's Hideout. Chests and bounties are marked on the map for all to see.",
    items: [
      { name: "Reaper's Chest", value: '25', currency: 'doubloon', img: '/sot/reapers-chest.png' },
      { name: "Reaper's Bounty", value: '10,000', img: '/sot/reapers-bounty.png' },
      { name: 'Humble Gift', value: '3,500 – 5,000', img: '/sot/humble-gift.png' },
      { name: 'Generous Gift', value: '8,000 – 10,000', img: '/sot/generous-gift.png' },
      { name: "Captain's Log", value: 'varies', img: '/sot/captains-log.png' },
      { name: "Reaper's Bones Emissary Flag", value: '5', currency: 'doubloon', img: '/sot/reapers-bones-emissary-flag.png' },
      { name: "Athena's Fortune Emissary Flag", value: '15', currency: 'doubloon', img: '/sot/athenas-fortune-emissary-flag.png' },
    ],
  },
  {
    title: "Smugglers' Treasure",
    company: 'SL',
    note: "Season 17 contraband from Smugglers' Run voyages, caches and shipwrecks. Refused by every other company, sold only at the six Smugglers' Hideouts. Big gold, but no reputation or emissary value.",
    items: [
      { name: 'Black Powder Barrel', value: '19,500', img: '/sot/black-powder-barrel.png' },
      { name: "Smugglers' Chronicle (Gilded Fox / Shadow Current / Wolf in Winter / Sapphire Steel)", value: '1,000', img: '/sot/smugglers-chronicle.png' },
      { name: 'Crate of Floral Fate Rum', value: '1,400 – 2,600', img: '/sot/crate-of-floral-fate-rum.png' },
      { name: 'Crate of Dark Demise Rum', value: '8,400 – 9,600', img: '/sot/crate-of-dark-demise-rum.png' },
      { name: 'Crate of Golden Greed Rum', value: '12,400 – 13,600', img: '/sot/crate-of-golden-greed-rum.png' },
      { name: 'Classic Painting', value: '1,000', img: '/sot/classic-painting.png' },
      { name: 'Refined Painting', value: '7,500', img: '/sot/refined-painting.png' },
      { name: 'Exquisite Painting', value: '10,000', img: '/sot/exquisite-painting.png' },
      { name: "Collector's Painting", value: '2,750 – 175,000 (heist target)', img: '/sot/collectors-painting.png' },
      { name: 'Bilge Rats Doubloon Crate', value: '200', currency: 'doubloon', img: '/sot/bilge-rats-doubloon-crate.png' },
      { name: 'Secret Shipment Crate', value: '25', currency: 'doubloon', img: '/sot/secret-shipment-crate.png' },
    ],
  },
  {
    title: 'Gems',
    company: 'ANY',
    note: "From cursed statues, Sirens and Siren Shrines. Sold to any company except Athena's Fortune for both gold and reputation.",
    items: [
      { name: 'Sapphire Mermaid Gem', value: '1,000', img: '/sot/sapphire-mermaid-gem.png' },
      { name: 'Emerald Mermaid Gem', value: '1,500', img: '/sot/emerald-mermaid-gem.png' },
      { name: 'Ruby Mermaid Gem', value: '2,000', img: '/sot/ruby-mermaid-gem.png' },
      { name: 'Sapphire Siren Gem', value: '1,000', img: '/sot/sapphire-siren-gem.png' },
      { name: 'Emerald Siren Gem', value: '1,500', img: '/sot/emerald-siren-gem.png' },
      { name: 'Ruby Siren Gem', value: '2,000', img: '/sot/ruby-siren-gem.png' },
    ],
  },
]

// Pull parenthetical notes like '(1.5x regular)' out of the value string
const allItems = categories.flatMap((cat) =>
  cat.items.map((item) => {
    const match = item.value.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
    return {
      ...item,
      company: cat.company,
      price: match ? match[1] : item.value,
      note: match ? match[2] : null,
    }
  }),
)

const search = ref('')
const activeCompany = ref('ALL')
const sortBy = ref('alpha')
const showFish = ref(false)

const sortOptions = {
  alpha: 'A – Z',
  high: 'Price: High to Low',
  low: 'Price: Low to High',
}

// Highest number in the value string, e.g. '1,400 – 2,600' -> 2600, '10 / 100' -> 100
const maxPrice = (item) => {
  const numbers = item.value.replace(/,/g, '').match(/\d+/g)
  return numbers ? Math.max(...numbers.map(Number)) : 0
}

const FISH_NAMES = new Set(
  ['Fish', 'Meat'].flatMap(
    (title) => categories.find((c) => c.title === title)?.items.map((i) => i.name) ?? [],
  ),
)

const filtered = computed(() => {
  const items = allItems.filter(
    (item) =>
      (showFish.value || !FISH_NAMES.has(item.name)) &&
      (activeCompany.value === 'ALL' || item.company === activeCompany.value) &&
      item.name.toLowerCase().includes(search.value.toLowerCase()),
  )
  if (sortBy.value === 'alpha') return items.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'high') return items.sort((a, b) => maxPrice(b) - maxPrice(a))
  return items.sort((a, b) => maxPrice(a) - maxPrice(b))
})
</script>

<template>
  <main class="sot">
    <header class="header">
      <RouterLink to="/" class="header__back">&larr; LethalLizard Studios</RouterLink>
    </header>

    <section class="hero">
      <h1 class="hero__title">SOT Treasure Archive</h1>
    </section>

    <section class="controls">
      <input
        v-model="search"
        type="search"
        class="controls__search"
        placeholder="Search treasure..."
        aria-label="Search treasure"
      />
      <div class="controls__filters" role="group" aria-label="Sort order">
        <button
          v-for="(label, key) in sortOptions"
          :key="key"
          class="chip"
          :class="{ 'chip--active': sortBy === key }"
          @click="sortBy = key"
        >
          {{ label }}
        </button>
        <button
          class="chip chip--toggle"
          :class="{ 'chip--active': showFish }"
          @click="showFish = !showFish"
        >
          🐟 Food / Fish
        </button>
      </div>
      <div class="controls__filters" role="group" aria-label="Filter by trading company">
        <button
          class="chip"
          :class="{ 'chip--active': activeCompany === 'ALL' }"
          @click="activeCompany = 'ALL'"
        >
          All
        </button>
        <button
          v-for="(co, key) in companies"
          :key="key"
          class="chip"
          :class="{ 'chip--active': activeCompany === key }"
          :style="{ '--chip-color': co.color }"
          @click="activeCompany = key"
        >
          <img v-if="co.icon" class="chip__icon" :src="co.icon" alt="" />
          {{ co.name }}
        </button>
      </div>
    </section>

    <section class="catalog">
      <ul class="items">
        <li v-for="item in filtered" :key="item.name">
          <img class="items__icon" :src="item.img" alt="" loading="lazy" />
          <span class="items__name">{{ item.name }}</span>
          <span v-if="item.note" class="items__note">{{ item.note }}</span>
          <span class="items__value" :class="{ 'items__value--doubloon': item.currency === 'doubloon' }">
            {{ item.price }}
            <img
              class="items__coin"
              :src="item.currency === 'doubloon' ? '/Doubloon.webp' : '/Gold.webp'"
              :alt="item.currency === 'doubloon' ? 'Doubloons' : 'Gold'"
            />
          </span>
          <span class="items__company" :style="{ color: companies[item.company].color }">
            <img
              v-if="companies[item.company].icon"
              class="items__company-icon"
              :src="companies[item.company].icon"
              alt=""
            />
            {{ companies[item.company].name }}
          </span>
        </li>
      </ul>

      <p v-if="filtered.length === 0" class="catalog__empty">
        Nothing in the hold matches that search.
      </p>
    </section>

    <footer class="site-footer">
      <p>
        Values and images sourced from the
        <a href="https://seaofthieves.fandom.com/wiki" target="_blank" rel="noopener">Sea of Thieves Wiki</a>.
        Fan guide, not affiliated with Rare or Microsoft.
      </p>
    </footer>
  </main>
</template>

<style scoped>
.sot {
  --gold: #ffd82b;
  --doubloon: #5e83a5;
  --tile-bg: #121414;
  --font-pirate: 'Pirata One', 'Georgia', serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'IM Fell English', 'Georgia', serif;
  font-size: 1.15rem;
  background-color: #0b0d0d;
}

/* ── Header ── */
.header {
  padding: 1rem clamp(1.5rem, 5vw, 4rem);
  border-bottom: 1px solid var(--border);
}

.header__back {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.header__back:hover {
  color: var(--text);
}

/* ── Hero ── */
.hero {
  text-align: center;
  padding: clamp(3rem, 7vw, 5rem) 1.5rem 1rem;
}

.hero__title {
  font-family: var(--font-pirate);
  font-size: clamp(2.75rem, 8vw, 5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.02em;
}

.hero__title span {
  color: var(--gold);
}

/* ── Controls ── */
.controls {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.controls__search {
  width: 100%;
  padding: 0.8rem 1.1rem;
  background: var(--tile-bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text);
  font-size: 1.15rem;
  font-family: inherit;
}

.controls__search:focus {
  outline: none;
  border-color: var(--gold);
}

.controls__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  --chip-color: var(--gold);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 2rem;
  color: var(--chip-color);
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0.7;
}

.chip__icon {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
}

.chip:hover {
  border-color: var(--chip-color);
  opacity: 1;
}

.chip--active {
  border-color: var(--chip-color);
  opacity: 1;
}

/* ── Catalog ── */
.catalog {
  flex: 1;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.items {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
  grid-auto-rows: 1fr;
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}

.items li {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  background: url('/sot/Event_Logo_Background.png') center / 100% 100% no-repeat;
}

.items__icon {
  width: 90%;
  aspect-ratio: 1;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.items__name {
  font-size: clamp(1.2rem, 1.6vw, 1.75rem);
  line-height: 1.2;
  flex: 1;
  display: flex;
  align-items: center;
}

.items__value {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: clamp(1.2rem, 1.6vw, 1.75rem);
  color: var(--gold);
  white-space: nowrap;
}

.items__value--doubloon {
  color: var(--doubloon);
}

.items__coin {
  width: 0.575em;
  height: 0.575em;
  object-fit: contain;
}

.items__note {
  font-size: clamp(0.85rem, 1vw, 1rem);
  font-style: italic;
  color: var(--text-muted);
  line-height: 1.2;
}

.items__company {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  letter-spacing: 0.05em;
}

.items__company-icon {
  width: 1.3em;
  height: 1.3em;
  object-fit: contain;
}

.catalog__empty {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem 0;
}

/* ── Footer ── */
.site-footer {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}

.site-footer a {
  color: var(--text);
  text-decoration: underline;
}
</style>
