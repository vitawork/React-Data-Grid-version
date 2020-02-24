import React from 'react';
import { Editor, EditorProps } from '../types';
declare type Props = Pick<EditorProps<string>, 'value' | 'column' | 'onBlur'>;
export default class SimpleTextEditor extends React.Component<Props> implements Editor<{
    [key: string]: string;
}> {
    private readonly input;
    getInputNode(): HTMLInputElement | null;
    getValue(): {
        [x: string]: string;
    };
    render(): JSX.Element;
}
export {};
