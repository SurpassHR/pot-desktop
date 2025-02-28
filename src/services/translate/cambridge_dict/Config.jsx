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
    return explanations.map((explanation) => (
        <div key={nanoid()}>
            {explanation.explainsZh &&
                explanation.explainsZh.map((explain, index) => {
                    if (explanation.meaning != null) {
                        return (
                            <>
                                <span
                                    className={`font-bold text-[${appFontSize}px] select-text`}
                                    key={nanoid()}
                                >
                                    {explanation.meaning}
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
                        return (
                            <span
                                className={`text-[${appFontSize - 2}px] text-default-500 select-text mr-1`}
                                key={nanoid()}
                            >
                                {explain} {explanation.explainsEn}
                            </span>
                        );
                    }
                })}
        </div>
    ));
}
