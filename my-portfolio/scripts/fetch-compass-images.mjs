// Replaces loot images with renders from compass-assets.com (besides fish).
// Reads scripts/compass-files.json (id/filename pairs scraped from
// https://compass-assets.com/view/renders/loot) and downloads each mapped
// item's thumbnail over the existing public/sot/<slug>.png.
// Note: only 220px thumbs are public; full files require a Drive login.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve(import.meta.dirname, '../public/sot')
const THUMB_BASE = 'https://compass-assets-prod.sotcompass.workers.dev/file/thumbs'

// our slug -> compass render filename
const mapping = {
  'castaways-chest': 'LOOT_Castaway_01.png',
  'seafarers-chest': 'LOOT_Seafarer_Chest.png',
  'marauders-chest': 'LOOT_Marauders_Chest.png',
  'captains-chest': 'LOOT_Captains_Chest_01.png',
  'coral-castaways-chest': 'LOOT_Coral_Treasure_Chest_01.png',
  'coral-seafarers-chest': 'LOOT_Coral_Seafarers_Chest_01.png',
  'coral-marauders-chest': 'LOOT_Coral_Marauders_Chest_01.png',
  'coral-captains-chest': 'LOOT_Coral_Captains_Chest_01.png',
  'ashen-castaways-chest': 'LOOT_Ashen_Chest_01.png',
  'ashen-seafarers-chest': 'LOOT_Ashen_Seafarers_Chest.png',
  'ashen-marauders-chest': 'LOOT_Ashen_Marauders_Chest.png',
  'ashen-captains-chest': 'LOOT_Ashen_Captains_Chest_01.png',
  'chest-of-the-damned': 'LOOT_Chest_of_the_Damned.png',
  'skeleton-captains-chest': 'LOOT_Skeleton_Captains_Chest.png',
  'stronghold-chest': 'LOOT_Stronghold_Chest_02.png',
  'chest-of-a-thousand-grogs': 'LOOT_Chest_of_a_Thousand_Grogs_01.png',
  'chest-of-sorrow': 'LOOT_Chest_of_Sorrows.png',
  'chest-of-rage': 'LOOT_Chest_of_Rage_01.png',
  'silvered-cup': 'LOOT_Elaborate_Flagon.png',
  'gilded-chalice': 'LOOT_Golden_Reliquary.png',
  'adorned-receptacle': 'LOOT_Opulent_Curio.png',
  'mysterious-coral-vessel': 'LOOT_Mysterious_Coral_Vessel.png',
  'silvered-coral-cup': 'LOOT_Silvered_Coral_Cup.png',
  'golden-coral-reliquary': 'LOOT_Golden_Coral_Reliquary.png',
  'peculiar-coral-relic': 'LOOT_Peculiar_Coral_Relic.png',
  'brimstone-casket': 'LOOT_Brimstone_Casket.png',
  'devils-remnant': 'LOOT_Devils_Remnant.png',
  'magmas-grail': 'LOOT_Magmas_Grail.png',
  'foul-bounty-skull': 'LOOT_Foul_Skull.png',
  'disgraced-bounty-skull': 'LOOT_Disgraced_Skull_01.png',
  'hateful-bounty-skull': 'LOOT_Hateful_Skull_01.png',
  'villainous-bounty-skull': 'LOOT_Villainous_Skull_01.png',
  'foul-coral-skull': 'LOOT_Coral_Skull_Foul_01.png',
  'disgraced-coral-skull': 'LOOT_Coral_Skull_Disgraced_01.png',
  'hateful-coral-skull': 'LOOT_Coral_Skull_Hateful_01.png',
  'villainous-coral-skull': 'LOOT_Coral_Skull_Villainous_01.png',
  'ashen-hateful-skull': 'LOOT_Ashen_Hateful_Skull_01.png',
  'ashen-villainous-skull': 'LOOT_Ashen_Villainous_Skull_01.png',
  'stronghold-skull': 'LOOT_Stronghold_Skull.png',
  'ashen-winds-skull': 'LOOT_Ashen_Winds_Skull_01.png',
  'skull-of-the-damned': 'LOOT_Skull_of_the_Damned.png',
  'captain-skull-of-the-damned': 'LOOT_Captain_Skull_of_the_Damned.png',
  'crate-of-fine-sugar': 'LOOT_Sugar.png',
  'crate-of-rare-tea': 'LOOT_Rare_Tea.png',
  'crate-of-exotic-silks': 'LOOT_Exotic_Silks.png',
  'crate-of-exquisite-spices': 'LOOT_Exquisite_Spices.png',
  'crate-of-extraordinary-minerals': 'LOOT_Extraordinary_Minerals.png',
  'crate-of-precious-gemstones': 'LOOT_Precious_Gemstones.png',
  'crate-of-ancient-bone-dust': 'LOOT_Bone_Dust.png',
  'ashes-of-the-damned': 'LOOT_Ashes_of_the_Damned.png',
  'crate-of-devils-plants': 'LOOT_Crate_of_Searing_Plants.png',
  'crate-of-devils-cloth': 'LOOT_Crate_of_Fire-woven_Cloth.png',
  'crate-of-devils-rum-bottles': 'LOOT_Crate_of_Brimstone_Rum.png',
  'gunpowder-barrel': 'Gunpowder_Barrel.png',
  'stronghold-gunpowder-barrel': 'LOOT_Stronghold_Gunpowder_Barrel.png',
  'chest-of-legends': 'LOOT_Chest_of_Legends_01.png',
  'sapphire-mermaid-gem': 'LOOT_Mermaid_Gem_Blue.png',
  'emerald-mermaid-gem': 'LOOT_Mermaid_Gem_Green.png',
  'ruby-mermaid-gem': 'LOOT_Mermaid_Gem_Red.png',
  'sapphire-siren-gem': 'LOOT_Siren_Gem_Sapphire.png',
  'emerald-siren-gem': 'LOOT_Siren_Gem_Emerald.png',
  'ruby-siren-gem': 'LOOT_Siren_Gem_Ruby.png',
}

const files = JSON.parse(
  (await readFile(path.resolve(import.meta.dirname, 'compass-files.json'), 'utf8')).replace(/^﻿/, ''),
)
const byFilename = new Map(files.map((f) => [f.filename, f.id]))

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36',
}

let ok = 0
const missing = []
for (const [slug, filename] of Object.entries(mapping)) {
  const id = byFilename.get(filename)
  if (!id) {
    missing.push(`${slug} (no compass entry for ${filename})`)
    continue
  }
  const res = await fetch(`${THUMB_BASE}/${id}.webp`, { headers })
  if (!res.ok) {
    missing.push(`${slug} (HTTP ${res.status})`)
    continue
  }
  await writeFile(path.join(OUT_DIR, `${slug}.png`), Buffer.from(await res.arrayBuffer()))
  ok++
  console.log(`OK    ${slug}  <-  ${filename}`)
}

console.log(`\nReplaced ${ok}, failed ${missing.length}`)
if (missing.length) console.log('Failed:', missing.join(', '))
