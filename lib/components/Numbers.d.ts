import React from 'react';
import { AnimatedValue, ForwardedProps } from 'react-spring';
import { MODE } from '../helpers/constants';
interface MinuteProps {
    anim: {
        opacity: AnimatedValue<ForwardedProps<{
            opacity: number;
        }>>;
        translate: AnimatedValue<ForwardedProps<{
            translate: number;
        }>>;
        translateInner: AnimatedValue<ForwardedProps<{
            translate: number;
        }>>;
    };
}
interface HourProps extends MinuteProps {
    mode: MODE;
    hour24Mode: boolean;
}
declare function hours({ anim, mode, hour24Mode }: HourProps): JSX.Element;
export declare const HourNumbers: React.MemoExoticComponent<typeof hours>;
declare function minutes({ anim }: MinuteProps): JSX.Element;
export declare const MinuteNumbers: React.MemoExoticComponent<typeof minutes>;
export {};
