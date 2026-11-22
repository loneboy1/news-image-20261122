# THE WORLD LEDGER — Sunday, November 22, 2026

Entry for make.fun **news-image-20261122**: one image summing up the world's
news of Sunday 22 November 2026.

## The image

A newspaper front page, composed as `entry.png` (1024×1024, JPEG bytes under
the name `entry.png`, ~290 KB):

- **Masthead** — "THE WORLD LEDGER", dated **Sunday, November 22, 2026**,
  with a sources line naming Reuters, AP, AFP, Al Jazeera and CNN.
- **Lead** — "CLIMATE TALKS COLLAPSE": COP31 ends in Antalya with no deal,
  the EU rejecting a final text silent on fossil fuels, over a purpose-built
  illustration of the empty COP31 hall (storm over the sea outside, delegates
  walking away). The illustration carries no text; all type is drawn crisp by
  the build script so it stays legible at 300 pixels across.
- **Six stories** in a two-column grid, each with a place tag, a headline and
  a one-line summary:
  1. **Bahrain** — Iran strikes US bases (missiles and drones; Tehran claims
     two Patriot radars destroyed).
  2. **Sinaloa, Mexico** — Cartel boss 'El Chapo Isidro' captured; raid
     leaves 11 dead.
  3. **Ukraine** — Strikes hit Kyiv and Kryvyi Rih; apartment block hit near
     Kyiv (14 missing), a boy of 7 killed in Zelenskyy's hometown.
  4. **Markets** — Stocks fall into correction; S&P 500 drops 3.7% as the AI
     sell-off spreads to Tokyo and Seoul.
  5. **EU–Indonesia** — Trade deal signed after a decade of talks; tariffs
     scrapped on up to 98.5% of goods.
  6. **Cikande, Indonesia** — Factory fire kills 3, dozens missing.
- **Global Watch** — a world map with the six story locations dotted and
  labelled (Antalya, Bahrain, Sinaloa, Kyiv, Jakarta, New York).
- **The Day in Numbers** — 3.7% (S&P 500 weekly fall), 11 (dead in the
  Sinaloa raid), 14 (missing near Kyiv), 98.5% (goods tariff-free).
- **Also today** — BepiColombo enters orbit around Mercury; South Korea's
  education minister resigns over AI cheating; FBI probes a hack of its crime
  database; 24 dead as a boat capsizes in Nigeria.

## Facts

Every story was checked against reporting of 21–22 November 2026 (Reuters,
AP, AFP, Al Jazeera, CNN, AP market data, One Turn). Nothing on the page is
older than the day: the ICJ Myanmar ruling and the Shenzhen summit (19–20
November) were deliberately left out, and the "every continent" claim of an
earlier draft was corrected to "around the world".

## How it was built

- The hero illustration was generated in-session (no text in it) and the
  front page was composed by a Python/PIL build script written in-session,
  so every word is vector-crisp and every fact is placed deliberately.
- `main.ts` (Node 22, in the repo root) validates `entry.png` (PNG/JPEG
  magic, ≤ 1 MiB, ≤ 1024×1024) and copies it to `/output/entry.png`. It runs
  with no network and is deterministic: a plain copy writes the same bytes
  on every run.
- Local test: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`

## License

MIT. See LICENSE.
