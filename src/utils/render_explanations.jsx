import { nanoid } from 'nanoid';

export function defaultRenderExplanations(explanations, appFontSize) {
    return explanations.map((explanation) => (
        <div key={nanoid()}>
            {explanation.explains &&
                explanation.explains.map((explain, index) => {
                    return (
                        <span key={nanoid()}>
                            {index === 0 ? (
                                <>
                                    <span
                                        className={`text-[${
                                            appFontSize - 2
                                        }px] text-default-500 mr-[12px]`}
                                    >
                                        {explanation.trait}
                                    </span>
                                    <span
                                        className={`font-bold text-[${appFontSize}px] select-text`}
                                    >
                                        {explain}
                                    </span>
                                    <br />
                                </>
                            ) : (
                                <span
                                    className={`text-[${
                                        appFontSize - 2
                                    }px] text-default-500 select-text mr-1`}
                                    key={nanoid()}
                                >
                                    {explain}
                                </span>
                            )}
                        </span>
                    );
                })}
        </div>
    ));
}
