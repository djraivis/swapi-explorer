import type { JSX } from "react";
import type { SwapiCategory } from "@/lib/types";

import styles from "./CategoryIllustration.module.css";

type CategoryIllustrationProps = {
    category: SwapiCategory;
};

function PeopleIllustration() {
    return (
        <svg viewBox="0 0 240 180" className={styles.art} aria-hidden="true">
            <circle cx="96" cy="74" r="22" className={styles.outline} />
            <circle cx="144" cy="82" r="18" className={styles.outline} />
            <path d="M66 132C73 109 86 96 103 96C120 96 133 109 139 132" className={styles.fillSoft} />
            <path d="M121 132C126 114 137 103 150 103C162 103 171 113 176 132" className={styles.outline} />
            <path d="M80 113C90 107 101 104 113 104" className={styles.accentStroke} />
            <circle cx="175" cy="56" r="5" className={styles.dot} />
        </svg>
    );
}

function PlanetsIllustration() {
    return (
        <svg viewBox="0 0 240 180" className={styles.art} aria-hidden="true">
            <circle cx="118" cy="92" r="39" className={styles.fillStrong} />
            <path d="M52 97C83 74 151 68 191 95C162 122 89 128 52 97Z" className={styles.outline} />
            <path d="M88 70C98 62 110 58 124 57" className={styles.accentStroke} />
            <circle cx="174" cy="53" r="7" className={styles.dot} />
            <circle cx="66" cy="51" r="5" className={styles.dotSoft} />
        </svg>
    );
}

function FilmsIllustration() {
    return (
        <svg viewBox="0 0 240 180" className={styles.art} aria-hidden="true">
            <rect x="62" y="58" width="116" height="76" rx="16" className={styles.outline} />
            <path d="M62 78H178" className={styles.outline} />
            <path d="M84 58L73 78" className={styles.outline} />
            <path d="M111 58L100 78" className={styles.outline} />
            <path d="M138 58L127 78" className={styles.outline} />
            <path d="M165 58L154 78" className={styles.outline} />
            <path d="M88 103L108 92V114L88 103Z" className={styles.fillSoft} />
            <path d="M122 94H154" className={styles.accentStroke} />
            <path d="M122 112H146" className={styles.accentStroke} />
        </svg>
    );
}

function SpeciesIllustration() {
    return (
        <svg viewBox="0 0 240 180" className={styles.art} aria-hidden="true">
            <path d="M120 46C150 46 171 69 171 98C171 126 150 145 120 145C90 145 69 126 69 98C69 69 90 46 120 46Z" className={styles.outline} />
            <path d="M98 97C104 91 112 88 120 88C128 88 136 91 142 97" className={styles.accentStroke} />
            <circle cx="102" cy="82" r="5" className={styles.dot} />
            <circle cx="138" cy="82" r="5" className={styles.dot} />
            <path d="M91 58L78 39" className={styles.outline} />
            <path d="M149 58L162 39" className={styles.outline} />
            <circle cx="78" cy="37" r="5" className={styles.dotSoft} />
            <circle cx="162" cy="37" r="5" className={styles.dotSoft} />
        </svg>
    );
}

function StarshipsIllustration() {
    return (
        <svg viewBox="0 0 240 180" className={styles.art} aria-hidden="true">
            <path d="M58 104L136 70L185 84L138 98L96 124H75L94 101L58 104Z" className={styles.fillStrong} />
            <path d="M58 104L136 70L185 84L138 98L96 124H75L94 101L58 104Z" className={styles.outline} />
            <path d="M111 90L141 83" className={styles.accentStroke} />
            <path d="M145 79L159 89" className={styles.outline} />
            <path d="M93 101L137 97" className={styles.outline} />
            <path d="M49 90L67 81" className={styles.accentStroke} />
            <path d="M45 106L63 103" className={styles.accentStroke} />
            <circle cx="171" cy="81" r="4" className={styles.dot} />
        </svg>
    );
}

function VehiclesIllustration() {
    return (
        <svg viewBox="0 0 240 180" className={styles.art} aria-hidden="true">
            <path d="M57 109H177L160 82H96L82 93H57V109Z" className={styles.outline} />
            <path d="M88 125C88 133 81 140 73 140C65 140 58 133 58 125C58 117 65 110 73 110C81 110 88 117 88 125Z" className={styles.fillSoft} />
            <path d="M176 125C176 133 169 140 161 140C153 140 146 133 146 125C146 117 153 110 161 110C169 110 176 117 176 125Z" className={styles.fillSoft} />
            <path d="M88 125C88 133 81 140 73 140C65 140 58 133 58 125C58 117 65 110 73 110C81 110 88 117 88 125Z" className={styles.outline} />
            <path d="M176 125C176 133 169 140 161 140C153 140 146 133 146 125C146 117 153 110 161 110C169 110 176 117 176 125Z" className={styles.outline} />
            <path d="M112 82V63" className={styles.accentStroke} />
            <path d="M131 82V63" className={styles.accentStroke} />
        </svg>
    );
}

const illustrations: Record<SwapiCategory, () => JSX.Element> = {
    people: PeopleIllustration,
    planets: PlanetsIllustration,
    films: FilmsIllustration,
    species: SpeciesIllustration,
    starships: StarshipsIllustration,
    vehicles: VehiclesIllustration,
};

export function CategoryIllustration({ category }: CategoryIllustrationProps) {
    const Illustration = illustrations[category];

    return (
        <div className={styles.frame} aria-hidden="true">
            <Illustration />
        </div>
    );
}