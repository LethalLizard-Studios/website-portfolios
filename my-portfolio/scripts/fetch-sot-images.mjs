// Downloads item icons for the Sea of Thieves guide from the Fandom and wiki.gg
// MediaWiki APIs into public/sot/. Run: node scripts/fetch-sot-images.mjs
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve(import.meta.dirname, '../public/sot')
const SIZE = 250

const SOURCES = {
  fandom: 'https://seaofthieves.fandom.com/api.php',
  gg: 'https://seaofthieves.wiki.gg/api.php',
}

// slug -> candidate wiki page titles (tried in order, on both wikis)
const items = {
  // Chests
  'castaways-chest': ["Castaway's Chest"],
  'seafarers-chest': ["Seafarer's Chest"],
  'marauders-chest': ["Marauder's Chest"],
  'captains-chest': ["Captain's Chest"],
  'coral-castaways-chest': ["Coral Castaway's Chest", 'Coral Treasure Chests'],
  'coral-seafarers-chest': ["Coral Seafarer's Chest"],
  'coral-marauders-chest': ["Coral Marauder's Chest"],
  'coral-captains-chest': ["Coral Captain's Chest"],
  'ashen-castaways-chest': ["Ashen Castaway's Chest"],
  'ashen-seafarers-chest': ["Ashen Seafarer's Chest"],
  'ashen-marauders-chest': ["Ashen Marauder's Chest"],
  'ashen-captains-chest': ["Ashen Captain's Chest"],
  'chest-of-the-damned': ['Chest of the Damned'],
  'skeleton-captains-chest': ["Skeleton Captain's Chest"],
  'stronghold-chest': ['Stronghold Chest'],
  'chest-of-ancient-tributes': ['Chest of Ancient Tributes'],
  'chest-of-a-thousand-grogs': ['Chest of a Thousand Grogs'],
  'chest-of-sorrow': ['Chest of Sorrow'],
  'chest-of-rage': ['Chest of Rage'],
  'chest-of-everlasting-sorrow': ['Chest of Everlasting Sorrow'],
  // Artefacts (grouped rows use the first item as the icon)
  'ancient-goblet': ['Ancient Goblet'],
  'silvered-cup': ['Silvered Cup'],
  'gilded-chalice': ['Gilded Chalice'],
  'adorned-receptacle': ['Adorned Receptacle'],
  'mysterious-coral-vessel': ['Mysterious Coral Vessel'],
  'silvered-coral-cup': ['Silvered Coral Cup'],
  'golden-coral-reliquary': ['Golden Coral Reliquary'],
  'peculiar-coral-relic': ['Peculiar Coral Relic'],
  'roaring-goblet': ['Roaring Goblet'],
  'brimstone-casket': ['Brimstone Casket'],
  'devils-remnant': ["Devil's Remnant"],
  'magmas-grail': ["Magma's Grail"],
  'ashen-curse-artefacts': ['Chalice of the Ashen Curse'],
  // Vault keys
  'stone-vault-key': ['Stone Vault Key', 'Stone Treasure Vault Key', 'Treasure Vault Keys'],
  'silver-vault-key': ['Silver Vault Key', 'Silver Treasure Vault Key'],
  'gold-vault-key': ['Gold Vault Key', 'Gold Treasure Vault Key'],
  // Skulls
  'foul-bounty-skull': ['Foul Bounty Skull'],
  'disgraced-bounty-skull': ['Disgraced Bounty Skull'],
  'hateful-bounty-skull': ['Hateful Bounty Skull'],
  'villainous-bounty-skull': ['Villainous Bounty Skull'],
  'foul-coral-skull': ['Foul Coral Skull', 'Coral Bounty Skulls'],
  'disgraced-coral-skull': ['Disgraced Coral Skull'],
  'hateful-coral-skull': ['Hateful Coral Skull'],
  'villainous-coral-skull': ['Villainous Coral Skull'],
  'ashen-foul-skull': ['Ashen Foul Bounty Skull', 'Ashen Foul Skull'],
  'ashen-disgraced-skull': ['Ashen Disgraced Bounty Skull', 'Ashen Disgraced Skull'],
  'ashen-hateful-skull': ['Ashen Hateful Bounty Skull', 'Ashen Hateful Skull'],
  'ashen-villainous-skull': ['Ashen Villainous Bounty Skull', 'Ashen Villainous Skull'],
  'skeleton-captains-skull': ["Skeleton Captain's Skull"],
  'stronghold-skull': ['Stronghold Skull'],
  'gold-hoarders-skull': ["Gold Hoarder's Skull", "Gold Hoarders' Skull"],
  'ashen-winds-skull': ['Ashen Winds Skull'],
  'skull-of-the-damned': ['Skull of the Damned'],
  'captain-skull-of-the-damned': ['Captain Skull of the Damned'],
  // Trade goods
  'crate-of-fine-sugar': ['Crate of Fine Sugar'],
  'crate-of-rare-tea': ['Crate of Rare Tea'],
  'crate-of-exotic-silks': ['Crate of Exotic Silks'],
  'crate-of-exquisite-spices': ['Crate of Exquisite Spices'],
  'crate-of-volcanic-stone': ['Crate of Volcanic Stone'],
  'crate-of-fine-ore': ['Crate of Fine Ore'],
  'crate-of-extraordinary-minerals': ['Crate of Extraordinary Minerals'],
  'crate-of-precious-gemstones': ['Crate of Precious Gemstones'],
  'crate-of-ancient-bone-dust': ['Crate of Ancient Bone Dust'],
  'ashes-of-the-damned': ['Ashes of the Damned'],
  // Cargo runs
  'crate-of-plants': ['Crate of Plants'],
  'crate-of-luxurious-cloth': ['Crate of Luxurious Cloth'],
  'crate-of-rum-bottles': ['Crate of Rum Bottles'],
  'crate-of-devils-plants': ["Crate of Devil's Plants"],
  'crate-of-devils-cloth': ["Crate of Devil's Cloth"],
  'crate-of-devils-rum-bottles': ["Crate of Devil's Rum Bottles"],
  // Animals
  'chicken-white-feathered': ['White Feathered Chicken', 'Chicken'],
  'chicken-red-speckled': ['Red Speckled Chicken', 'Chicken'],
  'chicken-black-plumed': ['Black Plumed Chicken', 'Chicken'],
  'chicken-golden': ['Golden Chicken', 'Chicken'],
  'pig-pink': ['Pink Pig', 'Pig'],
  'pig-spotted': ['Pink and Black Spotted Pig', 'Pig'],
  'pig-black-coated': ['Black Coated Pig', 'Pig'],
  'pig-gold-striped': ['Gold Striped Pig', 'Pig'],
  'snake-red-striped': ['Red Striped Snake', 'Snake'],
  'snake-blue-dappled': ['Blue Dappled Snake', 'Snake'],
  'snake-black-scaled': ['Black Scaled Snake', 'Snake'],
  'snake-golden': ['Golden Snake', 'Snake'],
  // Explosives
  'gunpowder-barrel': ['Gunpowder Barrel'],
  'stronghold-gunpowder-barrel': ['Stronghold Gunpowder Barrel'],
  // Raid voyage rewards & misc
  'vestige-of-power': ['Vestige of Power'],
  'hoarders-reliquary': ["Hoarder's Reliquary"],
  'prosperous-hoarders-reliquary': ["Prosperous Hoarder's Reliquary"],
  'glittering-hoarders-reliquary': ["Glittering Hoarder's Reliquary"],
  'eye-of-souls': ['Eye of Souls'],
  'veiled-eye-of-souls': ['Veiled Eye of Souls'],
  'all-seeing-eye-of-souls': ['All-Seeing Eye of Souls'],
  'crate-of-immaculate-diamonds': ['Crate of Immaculate Diamonds'],
  'scrolls-of-charted-waters': ['Scrolls of Charted Waters'],
  'scrolls-of-shrouded-waters': ['Scrolls of Shrouded Waters'],
  'scrolls-of-undiscovered-waters': ['Scrolls of Undiscovered Waters'],
  // Fish
  splashtails: ['Splashtail', 'Splashtails'],
  pondies: ['Pondie', 'Pondies'],
  islehoppers: ['Islehopper', 'Islehoppers'],
  ancientscales: ['Ancientscale', 'Ancientscales'],
  plentifins: ['Plentifin', 'Plentifins'],
  wildsplashes: ['Wildsplash', 'Wildsplashes'],
  devilfish: ['Devilfish'],
  battlegills: ['Battlegill', 'Battlegills'],
  wreckers: ['Wrecker', 'Wreckers'],
  stormfish: ['Stormfish'],
  // Meat
  'cooked-meat': ['Chicken Meat', 'Meat'],
  'megalodon-meat': ['Megalodon Meat', 'Meat'],
  'kraken-meat': ['Kraken Meat', 'Meat'],
  // Athena
  'chest-of-legends': ['Chest of Legends'],
  'ashen-chest-of-legends': ['Ashen Chest of Legends'],
  // Reapers
  'reapers-chest': ["Reaper's Chest"],
  'reapers-bounty': ["Reaper's Bounty"],
  // Smugglers (wiki.gg only content, but candidates run on both)
  'black-powder-barrel': ['Black Powder Barrel'],
  'smugglers-chronicle': ['Smugglers Chronicles', "Smugglers' Chronicles"],
  'crate-of-floral-fate-rum': ['Crate of Floral Fate Rum'],
  'crate-of-dark-demise-rum': ['Crate of Dark Demise Rum'],
  'crate-of-golden-greed-rum': ['Crate of Golden Greed Rum'],
  'classic-painting': ['Classic Painting'],
  'refined-painting': ['Refined Painting'],
  'exquisite-painting': ['Exquisite Painting'],
  'collectors-painting': ["Collector's Painting"],
  'bilge-rats-doubloon-crate': ['Bilge Rats Doubloon Crate'],
  'secret-shipment-crate': ['Secret Shipment Crate'],
  // Gems
  'sapphire-mermaid-gem': ['Sapphire Mermaid Gem', 'Mermaid Gems'],
  'emerald-mermaid-gem': ['Emerald Mermaid Gem', 'Mermaid Gems'],
  'ruby-mermaid-gem': ['Ruby Mermaid Gem', 'Mermaid Gems'],
  'sapphire-siren-gem': ['Sapphire Siren Gem', 'Siren Gems'],
  'emerald-siren-gem': ['Emerald Siren Gem', 'Siren Gems'],
  'ruby-siren-gem': ['Ruby Siren Gem', 'Siren Gems'],
}

// Fish variant images live on wiki.gg as File:Fish {Species} {Variant}.png
const fishVariants = {
  Splashtail: ['Ruby', 'Sunny', 'Indigo', 'Umber', 'Seafoam'],
  Pondie: ['Charcoal', 'Orchid', 'Bronze', 'Bright', 'Moonsky'],
  Islehopper: ['Stone', 'Moss', 'Honey', 'Raven', 'Amethyst'],
  Ancientscale: ['Almond', 'Sapphire', 'Smoke', 'Bone', 'Starshine'],
  Plentifin: ['Olive', 'Amber', 'Cloudy', 'Bonedust', 'Watery'],
  Wildsplash: ['Russet', 'Sandy', 'Ocean', 'Muddy', 'Coral'],
  Devilfish: ['Ashen', 'Seashell', 'Lava', 'Forsaken', 'Firelight'],
  Battlegill: ['Jade', 'Sky', 'Rum', 'Sand', 'Bittersweet'],
  Wrecker: ['Rose', 'Sun', 'Blackcloud', 'Snow', 'Moon'],
  Stormfish: ['Ancient', 'Shores', 'Wild', 'Shadow', 'Twilight'],
}
for (const [species, variants] of Object.entries(fishVariants)) {
  for (const variant of variants) {
    items[`fish-${species.toLowerCase()}-${variant.toLowerCase()}`] = [
      `Fish ${species} ${variant}`,
      `${variant} ${species}`,
    ]
  }
}

const apostropheVariants = (title) => {
  const variants = [title]
  if (title.includes("'")) variants.push(title.replaceAll("'", '’'))
  return variants
}

async function api(base, params) {
  const url = `${base}?${new URLSearchParams({ format: 'json', redirects: '1', ...params })}`
  const res = await fetch(url, { headers: { 'User-Agent': 'sot-guide-builder/1.0' } })
  if (!res.ok) return null
  return res.json()
}

async function pageImage(base, title) {
  const data = await api(base, {
    action: 'query',
    prop: 'pageimages',
    piprop: 'thumbnail',
    pithumbsize: String(SIZE),
    titles: title,
  })
  const pages = data?.query?.pages
  if (!pages) return null
  const page = Object.values(pages)[0]
  return page?.thumbnail?.source ?? null
}

async function fileImage(base, title) {
  const data = await api(base, {
    action: 'query',
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: String(SIZE),
    titles: `File:${title}.png`,
  })
  const pages = data?.query?.pages
  if (!pages) return null
  const page = Object.values(pages)[0]
  const info = page?.imageinfo?.[0]
  return info?.thumburl ?? info?.url ?? null
}

async function findImage(candidates) {
  // wiki.gg first: its item renders are the consistent transparent style
  for (const base of [SOURCES.gg, SOURCES.fandom]) {
    for (const candidate of candidates.flatMap(apostropheVariants)) {
      for (const lookup of [pageImage, fileImage]) {
        try {
          const url = await lookup(base, candidate)
          if (url) return url
        } catch {
          /* try next */
        }
      }
    }
  }
  return null
}

await mkdir(OUT_DIR, { recursive: true })
const report = { ok: [], missing: [] }

for (const [slug, candidates] of Object.entries(items)) {
  if (existsSync(path.join(OUT_DIR, `${slug}.png`))) {
    report.ok.push(slug)
    continue
  }
  const url = await findImage(candidates)
  if (!url) {
    report.missing.push(slug)
    console.log(`MISS  ${slug}`)
    continue
  }
  const res = await fetch(url, { headers: { 'User-Agent': 'sot-guide-builder/1.0' } })
  if (!res.ok) {
    report.missing.push(slug)
    console.log(`FAIL  ${slug} (${res.status})`)
    continue
  }
  await writeFile(path.join(OUT_DIR, `${slug}.png`), Buffer.from(await res.arrayBuffer()))
  report.ok.push(slug)
  console.log(`OK    ${slug}`)
}

console.log(`\nDownloaded ${report.ok.length}, missing ${report.missing.length}`)
if (report.missing.length) console.log('Missing:', report.missing.join(', '))
