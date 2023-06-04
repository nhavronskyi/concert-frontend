import React from "react";
import {BLOCK_TYPES, INLINE_STYLES} from "./TextEditor";

interface DescriptionProps {
    description: string;
}

const DescriptionConverter: React.FC<DescriptionProps> = ({description}) => {

    const renderHTML = () => {
        const draftContent = description || '{"blocks":[{"key":"3asu2","text":"loading...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

        interface Block {
            key: string;
            text: string;
            type: string;
            depth: number;
            inlineStyleRanges: { offset: number; length: number; style: string }[];
            entityRanges: any[];
            data: any;
        }

        const contentObject = JSON.parse(draftContent);
        let html = '';
        let orderedListCount = 0; // Track the current number for ordered lists
        contentObject.blocks.forEach((block: Block) => {
            const {text, type, inlineStyleRanges} = block;

            let tag: string;

            const blockType = BLOCK_TYPES.find((bt) => bt.style === type);
            if (blockType) {
                if (type === 'ordered-list-item') {
                    tag = 'ol';
                    orderedListCount++; // Increment the list item number
                } else if (type === 'unordered-list-item') {
                    tag = 'ul';
                } else {
                    tag = blockType.label;
                }
            } else {
                tag = 'p';
            }

            let style = '';

            if (inlineStyleRanges.length > 0) {
                inlineStyleRanges.forEach((inlineStyleRange) => {
                    const {style: inlineStyle} = inlineStyleRange;
                    const inlineStyleObject = INLINE_STYLES.find((is) => is.style === inlineStyle);
                    if (inlineStyleObject) {
                        style += `${inlineStyleObject.label.toLowerCase()} `;
                    }
                });
            }

            if (tag === 'ul') {
                html += `<${tag} style="${style}"><li>${text}</li></${tag}>\n`;
            } else if (tag === 'ol') {
                html += `<${tag} style="${style}">${orderedListCount + '.'} ${text}</${tag}>\n`;
            } else {
                html += `<${tag} style="${style}">${text}</${tag}>\n`;
            }
        });

        return {__html: html};
    };

    return <div dangerouslySetInnerHTML={renderHTML()}/>;
};

export default DescriptionConverter;
