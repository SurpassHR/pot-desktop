import { fetch } from '@tauri-apps/api/http';
import { Language } from './info';

class Pronunciation {
    constructor(region, symbol, voice) {
        this.region = region;
        this.symbol = symbol;
        this.voice = voice;
    }
}

class Explanation {
    constructor(trait, meaning, explain, exampleZh, exampleEn) {
        this.trait = trait;
        this.meaning = meaning;
        this.explain = explain;
        this.exampleZh = exampleZh;
        this.exampleEn = exampleEn;
    }
}

class WordTranslateResult {
    constructor(pronunciations, explanations) {
        this.pronunciations = pronunciations;
        this.explanations = explanations;
    }
}

function tryDetectLanguage(text) {
    if (/^[A-Za-z]/.test(text)) {
        return Language.en;
    }
    return null;
}

// 翻译服务商：https://dictionary.cambridge.org/
export async function translate(text, from, to) {
    if (Language.auto === from) {
        from = tryDetectLanguage(text) ?? from;
    }
    // only supports English word translation
    if (from !== Language.en || to === undefined || to === from || text.split(' ').length > 1) {
        return '';
    }

    const url = `https://dictionary.cambridge.org/search/direct/?datasetsearch=${from}-${to}&q=${text}`;
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html;charset=UTF-8',
        },
        responseType: 2,
    });

    if (!res.ok) {
        throw new Error(`Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`);
    }
    const doc = new DOMParser().parseFromString(res.data, 'text/html');
    const entryNodes = doc.querySelectorAll('.pr.entry-body__el');
    if (entryNodes.length === 0) {
        throw new Error(`Words not yet included: ${text}`);
    }

    const resultMap = [...entryNodes].reduce((dict, entryNode) => {
        const wordTranslateResult = dict['result'] || new WordTranslateResult([], []);

        if (wordTranslateResult.pronunciations.length === 0) {
            const pronunciationNodes = entryNode.querySelectorAll('.dpron-i');
            const pronunciations = [...pronunciationNodes].map((pronunciationNode) => {
                const region = pronunciationNode.querySelector('.region').innerText;
                const symbol = pronunciationNode.querySelector('.pron').innerText;
                let voice = pronunciationNode.querySelector('.daud source').src;
                voice = voice.replace(/^https?:\/\/[^/]+/, 'https://dictionary.cambridge.org');
                voice = voice.replace(/^tauri:\/\/[^/]+/, 'https://dictionary.cambridge.org');
                return new Pronunciation(region, symbol, voice);
            });
            wordTranslateResult.pronunciations.push(...pronunciations);
        }

        const wordPos = entryNode.querySelector('.posgram')?.innerText;
        const defBlockNodes = entryNode.querySelectorAll('.sense-body.dsense_b .def-block.ddef_block');
        const explanations = [...defBlockNodes].map((defBlockNode) => {
            // extract part of speech, word meanings, chn and eng example sentences.
            const trait =
                wordPos ?? defBlockNode.querySelector('.ddef_h .def.ddef_d.db').innerText.replace(/\s+/g, ' ').trim();
            const wordMeaning = defBlockNode.querySelector('span.trans.dtrans.dtrans-se.break-cj:not(.hdb)')?.innerText?.replaceAll(';', ' ')?.replaceAll('，', ' ');
            const wordExplain = defBlockNode.querySelector('div.def.ddef_d.db')?.innerText?.replaceAll(';', ' ')?.replaceAll('，', ' ');
            const exampleZh = defBlockNode.querySelector('span.trans.dtrans.dtrans-se.hdb.break-cj')?.innerText?.split(';');
            const exampleEn = defBlockNode.querySelector('span.eg.deg')?.innerText?.split(';');
            return new Explanation(trait, wordMeaning, wordExplain, exampleZh, exampleEn);
        });
        wordTranslateResult.explanations.push(...explanations);

        dict['result'] = wordTranslateResult;
        return dict;
    }, {});
    for (let i of resultMap.result.pronunciations) {
        const res = await fetch(i.voice, { responseType: 3 });
        if (res.ok) {
            i.voice = res.data;
        }
    }
    return resultMap.result;
}

export * from './Config';
export * from './info';
