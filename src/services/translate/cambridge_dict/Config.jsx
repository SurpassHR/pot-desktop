import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';

export function Config(props) {
    const { updateServiceList, onClose } = props;
    const { t } = useTranslation();

    return (
        <>
            <div>{t('services.no_need')}</div>
            <div>
                <Button
                    fullWidth
                    color='primary'
                    onPress={() => {
                        updateServiceList('cambridge_dict');
                        onClose();
                    }}
                >
                    {t('common.save')}
                </Button>
            </div>
        </>
    );
}

export function renderExplanations(explanations, appFontSize) {
    let actualIndex = 0;

    function procExampleZh(explanation) {
        let rendered = [];
        if (explanation.meaning !== null) {
            if (actualIndex++ !== 0) {
                rendered.push(
                    <hr style={{ border: "1px solid grey", opacity: "40%" }} />
                )
            }
            rendered.push(
                <>
                    <span
                        className={`font-bold text-[${appFontSize}px] select-text`}
                        key={nanoid()}
                    >
                        {explanation.meaning + ' '}
                    </span>
                    <span
                        className={`italic text-[${appFontSize}px] select-text`}
                        key={nanoid()}
                    >
                        {explanation.trait + '.'}
                    </span>
                    <br />
                    <span
                        className={`font-bold text-[${appFontSize - 2}px] select-text`}
                        key={nanoid()}
                    >
                        {explanation.explain + ' '}
                    </span>
                    <br />
                    <span
                        className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                        key={nanoid()}
                    >
                        {explanation.exampleZh} {explanation.exampleEn}
                    </span>
                </>
            );
        } else {
            rendered.push(
                <span
                    className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                    key={nanoid()}
                >
                    {explanation.exampleZh} {explanation.exampleEn}
                </span>
            );
        }
        return rendered;
    }

    {/* in some cases there will be only a eng example */ }
    function procExampleEn(explanation) {
        let rendered = [];
        if (explanation.meaning !== null) {
            if (actualIndex++ !== 0) {
                rendered.push(
                    <hr style={{ border: "1px solid grey", opacity: "40%" }} />
                )
            }
            rendered.push(
                <>
                    <span
                        className={`font-bold text-[${appFontSize}px] select-text`}
                        key={nanoid()}
                    >
                        {explanation.meaning + ' '}
                    </span>
                    <span
                        className={`italic text-[${appFontSize}px] select-text`}
                        key={nanoid()}
                    >
                        {explanation.trait + '.'}
                    </span>
                    <br />
                    <span
                        className={`font-bold text-[${appFontSize - 2}px] select-text`}
                        key={nanoid()}
                    >
                        {explanation.explain + ' '}
                    </span>
                    <br />
                    <span
                        className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                        key={nanoid()}
                    >
                        {explanation.exampleEn}
                    </span>
                </>
            );
        } else {
            rendered.push(
                <span
                    className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                    key={nanoid()}
                >
                    {explanation.exampleEn}
                </span>
            );
        }
        return rendered;
    }

    {/* in some cases there will be only a meaning */ }
    function procMeaning(explanation) {
        return (
            <>
                <hr style={{ border: "1px solid grey", opacity: "40%" }} />
                <span
                    className={`font-bold text-[${appFontSize}px] select-text`}
                    key={nanoid()}
                >
                    {explanation.meaning + ' '}
                </span>
                <span
                    className={`italic text-[${appFontSize}px] select-text`}
                    key={nanoid()}
                >
                    {explanation.trait + '.'}
                </span>
                <br />
                <span
                    className={`font-bold text-[${appFontSize - 2}px] select-text`}
                    key={nanoid()}
                >
                    {explanation.explain + ' '}
                </span>
            </>
        )
    }

    return explanations.map((explanation) => (
        <div key={nanoid()}>
            {explanation.exampleZh && procExampleZh(explanation)}
            {(!explanation.exampleZh && explanation.exampleEn) && procExampleEn(explanation)}
            {(!explanation.exampleZh && !explanation.exampleEn && explanation.meaning) && procMeaning(explanation)}
        </div>
    ));
}
