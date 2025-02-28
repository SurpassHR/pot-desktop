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
    return explanations.map((explanation) => (
        <div key={nanoid()}>
            {explanation.explainsZh &&
                explanation.explainsZh.map((explain, index) => {
                    let rendered = [];
                    if (explanation.meaning != null) {
                        if (actualIndex++ != 0) {
                            rendered.push(
                                <hr style={{border: "1px solid grey", opacity: "40%"}} />
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
                                    className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                                    key={nanoid()}
                                >
                                    {explain} {explanation.explainsEn}
                                </span>
                            </>
                        );
                    } else {
                        rendered.push(
                            <span
                                className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                                key={nanoid()}
                            >
                                {explain} {explanation.explainsEn}
                            </span>
                        );
                    }
                    return rendered;
                })}
        </div>
    ));
}
